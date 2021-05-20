from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from main.models import UserProfile

# Create your models here.
# Teacher Profile
class Teacher(models.Model):
    # name=models.CharField(max_length=100)
    # Base User
    user=models.OneToOneField(UserProfile,on_delete=models.CASCADE,related_name="teacher")
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Teacher- {self.user.firstname}"


# Classroom
class ClassRoom(models.Model):
    # /Class Standard like 9th 8th
    standard=models.IntegerField(validators=[MinValueValidator(1,"Class can not be less than 1"),MaxValueValidator(12,"Class can not be greater than 12")])

    # Main Class Teacer
    class_teacher=models.OneToOneField(Teacher,on_delete=models.CASCADE,related_name="classroom")
    # Secondary Teachers

    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Class Teacher- {self.class_teacher.user.firstname}- Class- {self.standard}"


# Student Profile
class Student(models.Model):
    
    name=models.CharField(max_length=100)
    #Students
    classroom=models.ForeignKey(ClassRoom,related_name="students",blank=True,null=True,on_delete=models.CASCADE)

    user=models.OneToOneField(UserProfile, on_delete=models.CASCADE,related_name="student")

    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name   



# class StudentProfile(models.Model):
#     student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name="student")
#     teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="profiles")
#     classroom=models.ForeignKey(ClassRoom,on_delete=models.CASCADE) 

#     created_at=models.DateTimeField(auto_now_add=True)


# class SubjectMarks(models.Model):

#     """
#         This model will be created when teacher will start the subject,
#         it will be created autmatically in case of Class TEACHER

#     """

#     subject=models.CharField(max_length=30)
#     marks=models.IntegerField(default=0)
#     student_profile=models.ForeignKey(StudentProfile,on_delete=models.CASCADE)

#     created_at=models.DateTimeField(auto_now_add=True)
#     teacher=models.ForeignKey(Teacher,related_name="marks",on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.subject} Marks- {self.marks} Student- {self.student.user.firstname}" 
  


#Getting Different Semesters
class Semester(models.Model):

    name=models.CharField(max_length=100)
    teacher=models.ForeignKey(Teacher,related_name="semesters",on_delete=models.CASCADE)
    classroom=models.ForeignKey(ClassRoom,related_name="semesters",on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"pk: {self.pk} name: {self.name}"


# Creating subject related to semester
class Subject(models.Model):
    name=models.CharField(max_length=50)
    # Of which semester the subject is
    semester=models.ForeignKey(Semester,related_name="subjects",on_delete=models.CASCADE)

    #Which teacher is teaching this subject
    subject_teacher=models.ForeignKey(Teacher,related_name="subjects",on_delete=models.CASCADE)


    def __str__(self):
        return f"pk: {self.pk} name: {self.name}"

# Classroom Page or Assignment connected to Subject
class ClassroomPage(models.Model):
    title=models.CharField(max_length=400)
    content=models.TextField()

    # The subject which it is related to
    subject=models.ForeignKey(Subject,related_name="classroom_pages",on_delete=models.CASCADE)

    def __str__(self):
        return f"pk: {self.pk} title: {self.title}"


class StudentResponse(models.Model):
    response_text=models.CharField(max_length=200)

    student=models.ForeignKey(Student,related_name="responses",on_delete=models.CASCADE)
    classroom_page=models.ForeignKey(ClassroomPage,related_name="responses",on_delete=models.CASCADE)



# A model to share notes
# Notes related to classroom
class Notes(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(max_length=500)   

    created_by=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="notes")
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE,related_name="notes") 

    def __str__(self):
        return f"pk: {self.pk} title: {self.name}"


# class Quiz(models.Model):

#     topic=models.CharField(max_length=250)

# class Question(models.Model):
#     question_name=models.CharField(max_length=500)
    
# class Choice(models.Model):




class TeacherMembership(models.Model):
    # The teacher who got the invitation
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='memberships')
    # The classroom the teacher is invited to
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE,related_name="teacher_memberships")

    subject=models.OneToOneField(Subject,on_delete=models.CASCADE,related_name="teacher_membership")
    # The subject why the teacher is inviteed
    date_joined = models.DateField(auto_now_add=True)

    accepted=models.BooleanField(default=False)
    
    created_at=models.DateTimeField(auto_now_add=True)



# class NotesFile(models.Model):

#     # file=models.FileField(upload_to="/usr/notes/files")
#     notes=models.ForeignKey(Notes,on_delete=models.CASCADE)