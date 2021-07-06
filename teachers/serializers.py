from rest_framework.serializers import ModelSerializer, ValidationError
from .models import ClassRoom, DocumentResult, LeaveRequest, Student, Semester, Subject, Teacher, ClassroomPage
from .models import Notes, Assignment, Question, Choice, Document, SubjectEntry, RankingDocument
from main.serializers import UserProfileSerializer
from main.models import UserProfile
from rest_framework import serializers


from .models import Exam


from django.shortcuts import get_object_or_404


class StudentSerializer(ModelSerializer):

    user_detail = UserProfileSerializer(
        source='user', many=False, read_only=True)

    class Meta:
        model = Student
        fields = ["id", "name", "firstname", "lastname", "fathers_name",
                  "roll_no", "user", "user_detail", "student_id", "classroom"]


class NotesSerializer(ModelSerializer):

    class Meta:
        model = Notes
        fields = ["pk", "name", "description",
                  "subject", "created_at", "chapter_no"]


class TeacherSerializer(ModelSerializer):

    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = "__all__"


class SubjectSerializer(ModelSerializer):

    subject_teacher_detail = TeacherSerializer(
        source='subject_teacher', read_only=True)

    class Meta:
        model = Subject
        fields = ["pk", "name", "subject_teacher",
                  "semester", "subject_teacher_detail"]


class SemesterSerializer(ModelSerializer):

    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:

        model = Semester
        fields = ['pk', 'name', "subjects"]


class ClassRoomSerializer(ModelSerializer):

    students = StudentSerializer(many=True)
    class_teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = ClassRoom
        fields = "__all__"


class ClassroomPageSerializer(ModelSerializer):

    class Meta:
        model = ClassroomPage
        fields = "__all__"


class ChoiceSerializer(ModelSerializer):

    class Meta:
        model = Choice
        fields = ["title"]


class QuestionSerializer(ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    answer = ChoiceSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ["question", "choices", "answer"]


class AssignmentSerializer(ModelSerializer):

    no_of_questions = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()

    def get_no_of_questions(self, assignment):
        return len(assignment.assignmentQuestions.all())

    def get_questions(self, assignment):
        assingmentQuestions = assignment.assignmentQuestions.all()
        assingmentQuestionsData = QuestionSerializer(
            assingmentQuestions, many=True).data

        return assingmentQuestionsData

    def get_teacher_name(self, assignment):
        return assignment.teacher.user.firstname

    class Meta:
        fields = ['title', "subject", "created_at",
                  "no_of_questions", "questions", 'teacher_name', 'deadline']
        model = Assignment

    def create(self, validated_data):

        # Getting the request object Request contains data to create other objects
        request = self.context.get("request")

        # Way to store errors
        errors = {

        }

        isCreated = False
        questionNo = 0
        assignmentObj = None

        # Question Data - List of questions
        for questionData in request.data["questions"]:

            questionObj = None
            # Question Counter to assign order of question

            questionNo += 1
            # Question form {question:question}

            # Helpful to return errors
            questionKey = str(questionData['key'])
            errors.setdefault(
                questionKey, {"answer": {"error": False}, "choices": {"error": False}, "question": {"error": False}})

            questionForm = QuestionSerializer(data=questionData)

            # if Question does not have any error
            if(questionForm.is_valid()):

                # Main answer
                answerForm = ChoiceSerializer(
                    data={"title": questionData['answer']})

                if(answerForm.is_valid()):

                    if(len(questionData["choices"]) == 0):
                        errors[questionKey]['fieldError'] = "No Choices provided"

                    # Answer choices
                    for choiceData in questionData["choices"]:

                        # choice : {title:"Answer choice"}
                        choiceForm = ChoiceSerializer(data=choiceData)

                        if(choiceForm.is_valid()):

                            if(assignmentObj == None):

                                assignmentObj = Assignment.objects.create(
                                    title=validated_data["title"], deadline=validated_data['deadline'], subject=validated_data["subject"], teacher=request.user.teacher)

                            if(questionObj == None):

                                # try:
                                answerObj, created = Choice.objects.get_or_create(
                                    title=answerForm.validated_data["title"])

                                questionObj = questionForm.save(
                                    assignment=assignmentObj, answer=answerObj, order=questionNo)

                            choiceObj, created = Choice.objects.get_or_create(
                                title=choiceForm.validated_data["title"])

                            questionObj.choices.add(choiceObj)

                            isCreated = True

                        else:

                            errorMsg = "\n".join(
                                ["\n".join(err_list) for err_list in choiceForm.errors.values()])

                            errors[questionKey]["choices"][choiceData['key']] = {
                                "error": True, "msg": errorMsg}

                else:

                    errors.setdefault(questionKey, {""})

                    errorMsg = "\n".join(["\n".join(err_list)
                                         for err_list in answerForm.errors.values()])
                    errors[questionKey]["answer"] = {
                        "error": True, "msg": errorMsg}

            else:

                errorMsg = "\n".join(["\n".join(err_list)
                                     for err_list in questionForm.errors.values()])
                errors[questionKey]["question"] = {
                    "error": True, "msg": errorMsg}

        # If assignmentObj createc return it
        if (isCreated):
            return assignmentObj, isCreated, errors

        else:

            self.validation_errors = errors
            raise ValidationError("Validation error")


class DocumentSerializer(ModelSerializer):

    teacher_detail = TeacherSerializer(
        source="created_by", read_only=True, many=False)

    class Meta:
        model = Document
        fields = "__all__"

        include = 'teacher_detail'


class TeacherProfileSerializer(ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['firstname', 'lastname',
                  'email', 'phone_number', 'profile_pic']


class ExamSerializer(ModelSerializer):
    class Meta:
        model = Exam
        # fields="__all__"

        exclude = ('teacher',)


# TimeTable Block Subject start_time-finish_time
class SubjectEntrySerializer(ModelSerializer):

    subject_name = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()
    semester_name = serializers.SerializerMethodField()
    class_standard = serializers.SerializerMethodField()

    def get_class_standard(self, subject_entry):
        class_standard = subject_entry.subject.semester.classroom.standard
        return class_standard

    def get_subject_name(self, subject_entry):
        subject = subject_entry.subject
        return subject.name

    def get_teacher_name(self, subject_entry):
        subject_teacher = subject_entry.subject.subject_teacher
        return subject_teacher.user.firstname

    def get_semester_name(self, subject_entry):
        semester = subject_entry.subject.semester
        return semester.name

    class Meta:
        model = SubjectEntry
        fields = ['subject', 'start_time', 'finish_time',
                  'subject_name', 'teacher_name', 'semester_name', 'class_standard']


class RankingDocumentSerializer(ModelSerializer):
    class Meta:
        model = RankingDocument
        fields = "__all__"


class DocumentResultSerializer(ModelSerializer):

    class Meta:
        model = DocumentResult
        fields = "__all__"


class LeaveRequestSerializer(ModelSerializer):

    class Meta:
        model = LeaveRequest
        fields = "__all__"
