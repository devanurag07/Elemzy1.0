from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView



# Exceptions
from rest_framework.exceptions import NotFound, PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

# Importing Permissions
from teachers.permissions import IsTeacher, IsManager
from rest_framework import permissions

# Models
from .models import ClassRoom, Student, Teacher, Notes, Assignment
from .models import Semester, ClassroomPage, Subject, StudentResponse,Document
# Serializers
from .serializers import ClassRoomSerializer, StudentSerializer, SemesterSerializer, SubjectSerializer, TeacherSerializer
from .serializers import NotesSerializer, ClassroomPageSerializer, AssignmentSerializer, QuestionSerializer,DocumentSerializer


from main.serializers import UserProfileSerializer
from main.models import UserProfile

from django.shortcuts import get_object_or_404
import pdb
# Getting the teacher's classroom


# Common function
def get_classroom(request):

    try:
        return request.user.teacher.classroom

    except Exception as e:

        raise NotFound("Classroom not found")


class TeacherClassroom(generics.GenericAPIView):

    """
        Teacher Classroom

        GET - Getting the classroom {"classroom":"classroom_info","students":"students info"}
        PUT - adding and removing students from classroom
        {
            "type":"add_student",
            "student_id":10
        }


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
        queryset = Semester.objects.all().filter(classroom=get_classroom(self.request))
        return queryset

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()
        semesters = SemesterSerializer(queryset, many=True)

        return Response(semesters.data)
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
            semester = semester_form.save(teacher=request.user.teacher,
                                          classroom=classroom)

            return Response(semester_form.data)

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
        return Subject.objects.all().filter(semester__classroom=classroom)

    def list(self, request):

        subjects = self.get_queryset()

        subjects_data = SubjectSerializer(subjects, many=True)

        return Response(subjects_data.data)

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
                return Response(subject_form.data)

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

            return Response(notes_form.errors)

    def list(self, request):

        subject_pk = request.query_params.get("subject_pk", None)

        if(subject_pk):

            subject = get_object_or_404(Subject, pk=subject_pk)
            queryset = self.get_queryset().filter(subject=subject)

        else:

            queryset = self.get_queryset().filter(
                subject__semester__classroom=get_classroom(request))

        notes_data = NotesSerializer(queryset, many=True)

        return Response(notes_data.data)

    def get_queryset(self):

        classroom = get_classroom(self.request)

        # All Classroom notes
        classroom_notes = Notes.objects.all().filter(
            subject__semester__classroom=classroom)

        # Created by the current teacher maybe on other classrooms
        teacher_notes = Notes.objects.filter(
            created_by=self.request.user.teacher)

        return classroom_notes | teacher_notes


class ClassroomPageView(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    serializer_class = ClassroomPageSerializer

    def get_queryset(self):

        current_teacher = self.request.user.teacher

        queryset = (ClassroomPage.objects.filter(subject__subject_teacher=current_teacher) |
                    ClassroomPage.objects.filter(subject__semester__classroom=get_classroom(self.request)))

        return queryset

    def create(self, request):

        data = request.data

        classroom_page = ClassroomPageSerializer(data=data)


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

        currentTeacher = self.request.user.teacher

        if(subject_pk == None):
            return Assignment.objects.filter(teacher=currentTeacher)

        subject = get_object_or_404(Subject, pk=subject_pk)

        currentClassroom = get_classroom(self.request)

        hasPermissionToGetAssignments = subject.subject_teacher == currentTeacher or subject.semester.classroom == currentClassroom

        if(hasPermissionToGetAssignments):
            queryset = Assignment.objects.filter(subject=subject)
            return queryset

    def list(self, request):
        queryset = self.get_queryset()

        assignmentListData = AssignmentSerializer(queryset, many=True).data

        if(queryset):
            return Response(assignmentListData)
        else:

            return Response("No permission to check notes")

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
    
    serializer_class=DocumentSerializer
    permission_classes=[permissions.IsAuthenticated,IsTeacher]


    def get_queryset(self):

        subject_pk = self.request.query_params.get("subject_pk", None)
        pdb.set_trace()
        teacher=self.request.user.teacher

        if(subject_pk==None):
            # documents shared by teacher
            documents=Document.objects.filter(created_by=teacher)

            return documents
        
        # # Documents by subject
        print(subject_pk)
        # documents=Document.objects.filter(subject__pk=subject_pk)

        # return documents

        


