from django.views.decorators.csrf import requires_csrf_token
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
import datetime


# Exceptions
from rest_framework.exceptions import NotFound, PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

# Importing Permissions
from teachers.permissions import IsTeacher, IsManager
from rest_framework import permissions

# Models
from .models import ClassRoom, LeaveRequest, ManualResult, ResultRow, Student, Teacher, Notes, Assignment, GradedAssignment, RankingDocument
from .models import Semester, ClassroomPage, Subject, StudentResponse, Document, SubjectEntry, TimeTable
# Serializers
from .serializers import ClassRoomSerializer, DocumentResultSerializer, LeaveRequestSerializer, ResultRowSerializer, StudentSerializer, SemesterSerializer, SubjectSerializer, TeacherSerializer
from .serializers import NotesSerializer, ClassroomPageSerializer, AssignmentSerializer, QuestionSerializer, DocumentSerializer, TeacherProfileSerializer
from .serializers import ExamSerializer, SubjectEntrySerializer, RankingDocumentSerializer

from main.serializers import UserProfileSerializer
from main.models import UserProfile

from django.shortcuts import get_object_or_404
import pdb

from .models import Exam


# Common function
def get_classroom(request):

    try:
        return request.user.teacher.classroom

    except Exception as e:

        raise NotFound("Classroom not found")


def getDateFromStr(workDateStr):

    todayDate = datetime.datetime.today().date()
    if(workDateStr == None):
        return todayDate

    try:

        dateObj = datetime.datetime.strptime(workDateStr, "%Y-%m-%d").date()

        return dateObj

    except Exception as e:
        return todayDate


class TeacherClassroom(generics.GenericAPIView):

    """
        Teacher Classroom

        GET - Getting the classroom {"classroom":"classroom_info","students":"students info"}


    """
    # Checking if the user is teacher
    permission_classes = [
        permissions.IsAuthenticated,
        IsTeacher
    ]

    serializer_class = ClassRoomSerializer

    def get(self, request):

        # Getting the classroom
        classroom = self.get_classroom(request)

        if classroom == None:
            raise NotFound("Manager did'nt created a class for you",
                           code=status.HTTP_404_NOT_FOUND)

        serialized_classroom = self.get_serializer(classroom).data

        return Response(serialized_classroom)

    def get_classroom(self, request):

        try:
            user = request.user
            # users teacher profile
            teacher = user.teacher
            # teachers classroom
            classroom = teacher.classroom

            return classroom

        except Exception as e:
            raise NotFound("The classroom not found")

# Used to fetch global students list


class GlobalStudentsAPI(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
        IsTeacher | IsManager
    ]

    serializer_class = UserProfileSerializer

    def get(self, request):

        globalStudents = self.get_queryset(request)

        if globalStudents == None:
            raise NotFound("The manager didn't created a class for you")

        serialized_data = self.get_serializer(globalStudents, many=True)

        return Response(serialized_data.data)

    def get_queryset(self, request):
        try:
            # Getting users list of students in classroom
            classroom_students_user_lst = set(
                [student.user for student in request.user.teacher.classroom.students.all()])

        except ObjectDoesNotExist as e:

            return None

        global_students_usr_lst = UserProfile.objects.filter(is_student=True)
        # The students which are not added to class
        global_students_usr_lst = set(global_students_usr_lst).difference(
            classroom_students_user_lst)

        return global_students_usr_lst


class SemesterAPI(viewsets.ModelViewSet):

    """
    Semester API
    GET - Getting all semesters 
    GET pk - Getting one semester
    POST pk- Creating a semester
    PATCH,PUT pk - Updating the semester
    """

    serializer_class = SemesterSerializer

    def get_queryset(self):

        classroom = get_classroom(self.request)
        semesters = Semester.objects.filter(classroom=classroom)

        return semesters

    def list(self, request, *args, **kwargs):

        # pdb.set_trace()
        semesters = self.get_queryset()
        semesters_data = SemesterSerializer(semesters, many=True).data

        return Response(semesters_data)
    # POst request
    # creating Semester object (teacher and classroom are default set)

    def create(self, request):

        data = request.data
        semester_form = SemesterSerializer(data=data)

        if semester_form.is_valid():

            classroom = self.get_classroom(request)
            semester = semester_form.save(teacher=request.user.teacher,
                                          classroom=classroom)

            return Response(semester_form.data)
        else:
            return Response(semester_form.errors)

    # Put request
    # Just changing the name of Semester
    def update(self, request, pk, *args, **kwargs):

        # Getting data
        data = request.data
        instance = get_object_or_404(Semester, pk=pk)

        # Update line
        semester_form = SemesterSerializer(instance, data=data)

        if semester_form.is_valid():

            classroom = self.get_classroom(request)
            # Setting classroom and teacher to current
            if(instance.teacher == request.user.teacher):

                semester = semester_form.save(teacher=request.user.teacher,
                                              classroom=classroom)

                return Response(semester_form.data)

            else:
                return Response("You do not have any permission to do this", status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Returning form errors
            return Response(semester_form.errors)

    def get_classroom(self, request):

        try:
            return request.user.teacher.classroom

        except Exception as e:
            raise NotFound("The class does not exists")


class SubjectAPI(viewsets.ModelViewSet):

    """
    # Subject API
    # Getting Subject GET pk
    # Create Subject POST
    Update Subject PATCH pk
    PARTIAL UPDATE PUT pk

    """

    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get_queryset(self, *args, **kwargs):
        # Filtering Subjects by CLASSROOM
        classroom = self.get_classroom(request=self.request)
        return Subject.objects.filter(semester__classroom=classroom)

    def list(self, request):

        subjects = self.get_queryset()
        subjects_data = SubjectSerializer(subjects, many=True).data

        return Response(subjects_data)

    def create(self, request):

        classroom = self.get_classroom(request)
        # Getting post data
        subject_form = SubjectSerializer(data=request.data)

        # if data is valid
        if subject_form.is_valid():

            # Getting validated data
            validated_data = subject_form.validated_data

            # Checking if the Subject,semester is of classroom of teacher
            if validated_data["semester"].classroom == classroom:

                # Saving obj
                subject = subject_form.save()
                # Creating a connection between between teacher and classroom using subject

                # returning data
                return Response(subject_form.data, status=status.HTTP_201_CREATED)

            else:
                # Can't create subject with someone else's semester
                raise PermissionDenied(
                    "The semester does not belongs to your classroom")

        else:

            # Returning form errors
            return Response(subject_form.errors)

    def update(self, request, pk, *args, **kwargs):

        # Setting default partial value if it is not present
        kwargs.setdefault("partial", False)

        classroom = self.get_classroom(request)
        instance = get_object_or_404(Subject, pk=pk)

        # Main update line
        subject_form = SubjectSerializer(
            instance=instance, data=request.data, partial=kwargs['partial'])

        if subject_form.is_valid():
            validated_data = subject_form.validated_data

            if validated_data["semester"].classroom == classroom:

                subject = subject_form.save()
                return Response(subject_form.data)

            else:

                raise PermissionDenied(
                    "The semester does not belongs to your classroom")
        else:
            return Response(subject_form.errors)

    def get_classroom(self, request):

        try:
            return request.user.teacher.classroom

        except Exception as e:

            raise NotFound("Classroom not found")


# //Getting all Teachers id name api

class TeachersList(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get(self, request):

        teachers = TeacherSerializer(Teacher.objects.all(), many=True).data
        return Response(teachers)


# Creating Notes
class NotesAPI(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
        IsTeacher
    ]

    serializer_class = NotesSerializer

    def create(self, request):

        notes_form = NotesSerializer(data=request.data)

        if notes_form.is_valid():

            validated_data = notes_form.validated_data
            current_teacher = self.request.user.teacher

            if validated_data["subject"].subject_teacher == current_teacher:

                notes_obj = notes_form.save(
                    created_by=self.request.user.teacher)

            else:

                return Response("You do not have access to this--", status=status.HTTP_401_UNAUTHORIZED)

            return Response(NotesSerializer(notes_obj).data, status=status.HTTP_201_CREATED)

        else:

            return Response({"errors": notes_form.errors}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.get_queryset()
        notes_data = NotesSerializer(queryset, many=True)

        return Response(notes_data.data)

    def get_queryset(self):

        classroom = get_classroom(self.request)
        currentTeacher = self.request.user.teacher

        subject_pk = self.request.query_params.get("subject_pk", None)

        workDateStr = self.request.query_params.get("workdate", "")
        workDateObj = getDateFromStr(workDateStr)

        # All subject notes
        if(subject_pk):

            subject = get_object_or_404(Subject, pk=subject_pk)

            hasPermissionToGetNotes = ((subject.semester.classroom == classroom) or (
                subject.subject_teacher == currentTeacher))

            if(hasPermissionToGetNotes):
                subject_notes = Notes.objects.filter(
                    subject=subject, created_at__date=workDateObj)
                return subject_notes

        else:

            # All Techer notes
            teacher_notes = Notes.objects.filter(
                created_by=currentTeacher, created_at__date=workDateObj)
            return teacher_notes


# Information about other classrooms teacher is selected to
class SecondaryClassroom(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get(self, request):

        currentTeacher = request.user.teacher

        subjects = currentTeacher.subjects.all()

        otherClassrooms = []

        for subject in subjects:

            isSubjectOfMyClass = subject.semester.classroom.class_teacher == currentTeacher
            if(isSubjectOfMyClass):
                continue

            subjectClassroom = subject.semester.classroom
            otherClassrooms.append(subjectClassroom)

        otherClassrooms = list(set(otherClassrooms))

        data = []

        for otherClassroom in otherClassrooms:

            otherClassroomData = {
                "classroomInfo": ClassRoomSerializer(otherClassroom).data
            }

            otherClassroomSemesters = []

            for semester in otherClassroom.semesters.all():

                semesterData = {"pk": semester.pk, "name": semester.name}

                # Getting only subjects which are assigned to currentTeacher
                subjects = semester.subjects.filter(
                    subject_teacher=currentTeacher)

                semesterData["subjects"] = SubjectSerializer(
                    subjects, many=True).data

                otherClassroomSemesters.append(semesterData)

            otherClassroomData['semesters'] = otherClassroomSemesters
            data.append(otherClassroomData)

        return Response(data)


# Assingnment Views

"""
Can create Assignment only if the the -

Current Teacher == Subject Teacher .

Getting list of Notes - 

All assignments filtered by Current Subject

"""


class AssignmentAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    # permission_classes=[permissions.IsAuthenticated,IsTeacher]

    def get_queryset(self):

        subject_pk = self.request.query_params.get("subject_pk", None)
        workDateStr = self.request.query_params.get("workdate", "")
        workDateObj = getDateFromStr(workDateStr)

        currentTeacher = self.request.user.teacher

        # BY teacher
        if(subject_pk == None):
            return Assignment.objects.filter(teacher=currentTeacher, created_at__date=workDateObj)

        subject = get_object_or_404(Subject, pk=subject_pk)
        currentClassroom = get_classroom(self.request)
        hasPermissionToGetAssignments = subject.subject_teacher == currentTeacher or subject.semester.classroom == currentClassroom

        if(hasPermissionToGetAssignments):
            # pdb.set_trace()
            queryset = Assignment.objects.filter(
                subject=subject, created_at__date=workDateObj)
            return queryset

    def list(self, request, *args, **kwargs):

        subject_pk = self.request.query_params.get("subject_pk", None)
        subject = get_object_or_404(Subject, pk=subject_pk)

        currentTeacher = request.user.teacher
        total_students = len(subject.semester.classroom.students.all())

        if(currentTeacher == subject.subject_teacher):

            # assignments = Assignment.objects.filter(subject=subject)
            assignments = self.get_queryset()
            print(assignments)
            assignments_data = []

            for assignment in assignments:

                assignment_data = {"title": assignment.title}
                assignment_data["total_students"] = total_students
                assignment_data["no_of_students_submitted"] = len(
                    assignment.graded_assignments.all())

                assignment_data["created_at"] = assignment.created_at
                assignment_data["deadline"] = assignment.deadline
                assignments_data.append(assignment_data)

            return Response(assignments_data)

        return Response([])

    def create(self, request, *args, **kwargs):

        assignmentForm = AssignmentSerializer(
            data=request.data, context={"request": request})

        if(assignmentForm.is_valid()):

            hasPerimissionToCreate = assignmentForm.validated_data[
                "subject"].subject_teacher == request.user.teacher

            if(hasPerimissionToCreate):
                try:

                    assignmentObj, isCreated, errors = assignmentForm.save()
                    return Response({"data": AssignmentSerializer(assignmentObj).data, "errors": errors, "isCreated": isCreated})

                except Exception as e:
                    print(e)
                    errors = assignmentForm.validation_errors

                    return Response({"qFormErrors": errors, "error": True}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response("You do not have permission to create the assignment", status=status.HTTP_401_UNAUTHORIZED)

        else:

            # Returning if the assignment form has errors
            errors = assignmentForm.errors

            # Object to be returned to js
            errs = {}
            for errName, errMsgs in errors.items():
                errs[errName] = "\n".join(errMsgs)

            return Response({"error": True, "assignmentErrors": errs},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response("No created")


# To add students to class
class ClassroomStudentsAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = StudentSerializer

    def create(self, request):

        formData = request.data
        classroom = get_classroom(request)
        classroom_id = classroom.pk

        formData['name'] = formData.get(
            'firstname', '')+' '+formData.get("lastname", '')
        formData['classroom'] = classroom_id

        studentForm = StudentSerializer(data=formData)

        if(studentForm.is_valid()):

            stdData = studentForm.validated_data

            # Custom validation
            student_ids_list = [
                student.student_id for student in Student.objects.all()]

            classroom_students = classroom.students.all()
            classroom_rollNo_lst = [
                student.roll_no for student in classroom_students]

            if(stdData["user"].is_student == True):

                if stdData['student_id'] in student_ids_list:

                    return Response({"errors": {'student_id': "Student ID already exists"}}, status=status.HTTP_400_BAD_REQUEST)

                if stdData['roll_no'] in classroom_rollNo_lst:
                    return Response({"errors": {'roll_no': "Roll No already exists"}}, status=status.HTTP_400_BAD_REQUEST)

                createdStdObj = studentForm.save()

                return Response(StudentSerializer(createdStdObj).data, status=status.HTTP_201_CREATED)

        else:
            return Response({"errors": studentForm.errors}, status=status.HTTP_400_BAD_REQUEST)


class DocumentAPI(viewsets.ModelViewSet):

    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get_queryset(self):

        subject_pk = self.request.query_params.get("subject_pk", None)

        workDateStr = self.request.query_params.get("workdate", "")
        workDateObj = getDateFromStr(workDateStr)

        currentTeacher = self.request.user.teacher

        if(subject_pk == None):
            # documents shared by teacher
            documents = Document.objects.filter(created_by=currentTeacher)
            return documents

        # # Documents by subject

        subject = get_object_or_404(Subject, pk=subject_pk)
        currentClassroom = get_classroom(self.request)
        hasPermissionToGetDocuments = subject.subject_teacher == currentTeacher or subject.semester.classroom == currentClassroom

        if(hasPermissionToGetDocuments):
            documents = Document.objects.filter(
                subject__pk=subject_pk, created_at__date=workDateObj)
            return documents

    def create(self, request):

        teacher = request.user.teacher

        formData = request.data.copy()
        formData['created_by'] = teacher.pk

        documentForm = DocumentSerializer(data=formData)

        if(documentForm.is_valid()):

            validated_data = documentForm.validated_data
            subject_teacher = validated_data["subject"].subject_teacher

            if(subject_teacher == teacher):
                createdDocument = documentForm.save()
                createdDocumentJson = DocumentSerializer(createdDocument).data

                return Response(createdDocumentJson, status=status.HTTP_201_CREATED)

            else:
                return Response("You do not have permission to create document for this subject", status=status.HTTP_401_UNAUTHORIZED)

        else:

            return Response({"errors": documentForm.errors}, status=status.HTTP_400_BAD_REQUEST)


class TeacherProfile(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = TeacherProfileSerializer

    def patch(self, request):

        data = request.data

        teacher = request.user

        teacherUpdateForm = TeacherProfileSerializer(
            instance=teacher, data=data, partial=True)

        isValidForm = teacherUpdateForm.is_valid()

        if(isValidForm):
            updatedTeacherObj = teacherUpdateForm.save()

            return Response(TeacherProfileSerializer(updatedTeacherObj).data)

        else:
            return Response({"errors": teacherUpdateForm.errors}, status=status.HTTP_400_BAD_REQUEST)


class ExamsAPI(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = ExamSerializer

    def get_queryset(self):

        currentTeacher = self.request.user.teacher
        exams_list = Exam.objects.filter(teacher=currentTeacher)

        return exams_list

    def list(self, request):

        subject_pk = self.request.query_params.get("subject_pk", None)
        currentTeacher = self.request.user.teacher
        classroom = get_classroom(self.request)

        if(subject_pk == None):

            # Getting all exam list created by teacher for his classroom
            classroom_exams = self.get_queryset().filter(classroom=classroom)
            classroom_exams_json = ExamSerializer(
                classroom_exams, many=True).data

            return Response(classroom_exams_json)

        subject = get_object_or_404(Subject, pk=subject_pk)
        hasSubjectReadPermissions = (subject.subject_teacher == currentTeacher
                                     or subject.semester.classroom == classroom)

        if(hasSubjectReadPermissions):
            subject_exams = subject.exams.all()
            subject_exams_json = ExamSerializer(subject_exams, many=True).data

            return Response(subject_exams_json)

        else:

            return Response("You do not have permission of subject", status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):

        data = request.data
        examForm = ExamSerializer(data=data)

        if(examForm.is_valid()):

            logged_in_teacher = request.user.teacher
            examSubject = examForm.validated_data["subject"].subject_teacher

            if(logged_in_teacher == examSubject):

                examObj = examForm.save(teacher=logged_in_teacher)
                # pdb.set_trace(
                # )
                examObjJson = ExamSerializer(examObj).data
                return Response(examObjJson, status=status.HTTP_201_CREATED)

            else:

                return Response("You are not allowed to create exam for this subject :(", status=status.HTTP_401_UNAUTHORIZED)

            return Response('aLL THINGS ALL VALID')

        else:

            return Response({"errors": examForm.errors}, status=status.HTTP_400_BAD_REQUEST)


class SubjectEntryAPI(viewsets.ModelViewSet):

    serializer_class = SubjectEntrySerializer

    def get_queryset(self):

        classroom = get_classroom(self.request)
        timetable, created = TimeTable.objects.get_or_create(
            classroom=classroom)
        subject_entries = timetable.subject_entries.all()

        return subject_entries

    def create(self, request):
        data = request.data

        current_classroom = get_classroom(self.request)
        subject_entry_form = SubjectEntrySerializer(data=data)

        if(subject_entry_form.is_valid()):

            validated_data = subject_entry_form.validated_data

            hasPermission = validated_data['subject'].semester.classroom == current_classroom

            if(hasPermission):

                timetable_obj, created = TimeTable.objects.get_or_create(
                    classroom=current_classroom)
                subject_entry = subject_entry_form.save(
                    timetable=timetable_obj)

                subject_entry_json = SubjectEntrySerializer(subject_entry).data

                return Response(subject_entry_json, status=status.HTTP_201_CREATED)

            else:
                return Response("You do not have permission ", status=status.HTTP_401_UNAUTHORIZED)

        else:

            return Response({"errors": subject_entry_form.errors}, status=status.HTTP_400_BAD_REQUEST)


class MyTimeTable(APIView):

    serializer_class = SubjectEntrySerializer

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get_queryset(self):

        classroom = get_classroom(self.request)
        currentTeacher = self.request.user.teacher

        # Getting all subject entries which are assigned to Teacher
        my_subject_entries = SubjectEntry.objects.filter(
            subject__subject_teacher=currentTeacher).order_by("start_time")

        return my_subject_entries

    def get(self, request):

        my_subject_entries = self.get_queryset()
        return Response(SubjectEntrySerializer(my_subject_entries, many=True).data)


class HolisticRankingAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = RankingDocumentSerializer

    ordering = ('-pk',)

    def get_queryset(self):

        return RankingDocument.objects.all()

    def create(self, request, *args, **kwargs):
        return Response("Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, pk=None, *args, **kwargs):
        # pk is for retrieving the student

        if(pk == None):
            return Response("Nothing to show", status=status.HTTP_400_BAD_REQUEST)

        student = get_object_or_404(Student, pk=pk)
        classroom = get_classroom(request)

        if(student.classroom == classroom):

            ranking_documents = student.ranking_documents.all().order_by('-id')
            documents_data = RankingDocumentSerializer(
                ranking_documents, many=True).data

            return Response(documents_data)

        else:
            return Response("You do not have permission to check ranking of this student", status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None, *args, **kwargs):

        if(pk == None):
            return Response("Nothing to update", status=status.HTTP_400_BAD_REQUEST)

        ranking_document = get_object_or_404(RankingDocument, pk=pk)
        classroom = get_classroom(request)

        if(ranking_document.student.classroom == classroom):
            update_info = request.data

            approved = update_info.get("approved", False)
            rejected = update_info.get("rejected", False)

            if(approved):
                ranking_document.approved = True
                ranking_document.pending = False
                ranking_document.save()

            elif (rejected):
                ranking_document.approved = False
                ranking_document.pending = False
                ranking_document.save()

            ranking_document_data = RankingDocumentSerializer(
                ranking_document).data
            return Response(ranking_document_data, status=status.HTTP_200_OK)

        else:
            return Response("You do not have any permission to approve the document", status=status.HTTP_401_UNAUTHORIZED)


class DashboardDataAPI(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get(self, request):
        classroom = get_classroom(request=request)

        recent_assignments = Assignment.objects.filter(
            subject__semester__classroom=classroom)

        recent_assignments_data = []
        total_students = len(classroom.students.all())

        for assignment in recent_assignments:
            assignment_data = {"total_students": total_students,
                               "title": assignment.title,
                               }
            assignment_data["no_of_students_submitted"] = len(
                assignment.graded_assignments.all())

            assignment_data["created_at"] = assignment.created_at
            assignment_data["deadline"] = assignment.deadline

            recent_assignments_data.append(assignment_data)

        # Leave Requests Info
        leave_requests_info = {}
        leave_requests = LeaveRequest.objects.filter(
            student__classroom=classroom)

        completed_requests = len(leave_requests.filter(is_pending=False))
        pending_requests = len(leave_requests.filter(is_pending=True))

        leave_requests_info['completed_requests'] = completed_requests
        leave_requests_info['pending_requests'] = pending_requests

        # Exams iNFO
        upcoming_exams = Exam.objects.filter(classroom=classroom).reverse()[:3]
        upcoming_exams_data = ExamSerializer(upcoming_exams, many=True).data

        return Response({"leave_requests": leave_requests_info,
                         "recent_assignments": recent_assignments_data,
                         "upcoming_exams": upcoming_exams_data})


class DocumentResultUploadAPI(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def post(self, request, *args, **kwargs):
        data = request.data
        document_result_form = DocumentResultSerializer(data=data)
        currentTeacher = request.user.teacher

        if(document_result_form.is_valid()):

            exam = document_result_form.validated_data["exam"]
            exam_created_by = exam.subject.subject_teacher

            hasAccessToUploadResult = exam_created_by == currentTeacher

            if(hasAccessToUploadResult):
                created_result = document_result_form.save()
                return Response("Result successfully uploaded", status=status.HTTP_201_CREATED)
            else:
                return Response("You can't upload the results for this exam", status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response({"errors": document_result_form.errors}, status=status.HTTP_400_BAD_REQUEST)


class LeaveRequestsAPI(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = LeaveRequestSerializer

    def get_queryset(self, request):
        classroom = request.user.teacher.classroom
        classroom_leave_requests = LeaveRequest.objects.filter(
            student__classroom=classroom)

        return classroom_leave_requests

    def list(self, request, *args, **kwargs):

        leave_requests_list = self.get_queryset(request)

        pending_leave_requests = leave_requests_list.filter(is_pending=True)

        pending_requests_data = LeaveRequestSerializer(
            pending_leave_requests, many=True).data

        no_completed_requests = len(
            LeaveRequest.objects.filter(is_pending=False))
        no_pending_requests = len(
            LeaveRequest.objects.filter(is_pending=True))

        return Response({"pending_requests_list": pending_requests_data, "leave_requests_info": {
            'no_of_completed_requests': no_completed_requests,
            'no_of_pending_requests': no_pending_requests
        }})

    def partial_update(self, request, pk, *args, **kwargs):
        data = request.data
        leave_request = get_object_or_404(LeaveRequest, pk=pk)

        currentClassroom = get_classroom(request)
        is_request_of_my_class = leave_request.student.classroom == currentClassroom

        if(is_request_of_my_class):

            accepted = data.get("accepted", False)
            rejected = data.get("rejected", False)

            if(accepted):

                leave_request.is_pending = False
                leave_request.accepted = True
                leave_request.save()

                return Response("Accepted ", status=status.HTTP_200_OK)
            elif rejected:

                leave_request.is_pending = False
                leave_request.accepted = False
                leave_request.save()

                return Response("Rejected ", status=status.HTTP_200_OK)

        else:

            return Response("Not allowed to approve or reject the leave request", status=status.HTTP_401_UNAUTHORIZED)

        return Response("Nothing to done", status=status.HTTP_200_OK)


# returning student graph x,y points  like - [month,no_of_documents]
class HolisticRankingGraphAPI(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def retrieve(self, request, pk=None, *args, **kwargs):
        if(pk == None):
            return Response("Nothing to show", status=status.HTTP_404_NOT_FOUND)

        student = get_object_or_404(Student, pk=pk)
        currentClassroom = get_classroom(request)

        isStudentOfMyClass = student.classroom == currentClassroom

        if(isStudentOfMyClass):
            graphData = {}
            ranking_documents = student.ranking_documents.filter(
                approved=True).order_by("created_date")

            document_counter = 0
            for ranking_document in ranking_documents:
                document_counter += 1
                ranking_document_month = ranking_document.created_at.strftime(
                    "%B")
                graphData[ranking_document_month] = document_counter

            return Response(graphData)

    def create(self, request, *args, **kwargs):
        return Response("Not allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def list(self, request, *args, **kwargs):
        return Response("Not allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        return Response("Not allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        return Response("Not allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)


# Manual Result API
class ManualResultsAPI(APIView):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def post(self, request, *args, **kwargs):
        data = request.data
        exam_id = data.get('exam', None)
        max_marks = data.get("max_marks", 100)

        if exam_id != None:
            exam = get_object_or_404(Exam, pk=exam_id)
            currentTeacher = request.user.teacher
            currentClassroom = currentTeacher.classroom
            hasAccess = exam.teacher == currentTeacher

            if(hasAccess):

                manual_result, created = ManualResult.objects.get_or_create(exam=exam, defaults={
                    'max_marks': max_marks
                })

                result_rows = data.get("result_rows", [])

                messages = {

                }

                for idx, row in enumerate(result_rows):
                    index = row.get("idx", None)
                    if(index == None):
                        index = idx

                    result_row_form = ResultRowSerializer(data=row)
                    is_valid_data = result_row_form.is_valid()

                    if(is_valid_data):

                        student = result_row_form.validated_data["student"]
                        student_classroom = student.classroom

                        # IF aLready have entered the results of the student
                        result_row_exists = ResultRow.objects.filter(
                            student=student).exists()

                        if(result_row_exists):

                            messages[str(index)] = {'status': "error",
                                                    "msg": 'Result row exists already of this student'
                                                    }
                        else:

                            if(student_classroom == currentClassroom):
                                created_row = result_row_form.save(
                                    result=manual_result)
                                messages[str(index)] = {
                                    'status': "success",
                                    'msg': "Successfully Created"
                                }
                            else:
                                messages[str(index)] = {
                                    'status': "error",
                                    "msg": 'Student is of another classroom'
                                }

                    else:
                        messages[str(index)] = {
                            'status': "errors",
                            "errors": result_row_form.errors
                        }

                return Response({"messages": messages})

            else:
                return Response("No Access to this exam", status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response("Please select exam", status=status.HTTP_400_BAD_REQUEST)
