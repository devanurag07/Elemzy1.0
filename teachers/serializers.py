from rest_framework.serializers import ModelSerializer
from .models import ClassRoom,Student,Semester,Subject,Teacher,ClassroomPage
from .models import Notes
from main.serializers import UserProfileSerializer



class StudentSerializer(ModelSerializer):

    user=UserProfileSerializer(read_only=True)
    class Meta:
        model=Student
        fields="__all__"



class NotesSerializer(ModelSerializer):
    
    class Meta:
        model=Notes
        fields=["pk","name","description","subject"]

class TeacherSerializer(ModelSerializer):

    user=UserProfileSerializer(read_only=True)

    class Meta:
        model=Teacher
        fields="__all__"


class SubjectSerializer(ModelSerializer):

    subject_teacher=TeacherSerializer(read_only=True)

    class Meta:
        model=Subject
        fields=["pk","name","subject_teacher","semester"]


class SemesterSerializer(ModelSerializer):

    subjects=SubjectSerializer(many=True,read_only=True)

    class Meta:

        model=Semester
        fields=['pk','name',"subjects"]



class ClassRoomSerializer(ModelSerializer):

    students=StudentSerializer(many=True)
    class_teacher=TeacherSerializer(read_only=True)
    
    class Meta:
        model=ClassRoom
        fields="__all__"


class ClassroomPageSerializer(ModelSerializer):

    class Meta:
        model=ClassroomPage
        fields="__all__"
