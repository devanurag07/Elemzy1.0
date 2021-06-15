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



    class Meta:
        db_table="teachers"


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

    
    class Meta:
        db_table="classrooms"


# Student Profile
class Student(models.Model):

    name=models.CharField(max_length=100)
    firstname=models.CharField(max_length=100)
    lastname=models.CharField(max_length=100)

    roll_no=models.PositiveIntegerField(blank=True,null=True)
    fathers_name=models.CharField(max_length=100)

    student_id=models.PositiveBigIntegerField(blank=True,null=True)
    #Students
    classroom=models.ForeignKey(ClassRoom,related_name="students",blank=True,null=True,on_delete=models.CASCADE)
    user=models.OneToOneField(UserProfile, on_delete=models.CASCADE,related_name="student")

    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name   

    
    class Meta:
        db_table="students"




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

    
    class Meta:
        db_table="semesters"



# Creating subject related to semester
class Subject(models.Model):
    name=models.CharField(max_length=50)
    # Of which semester the subject is
    semester=models.ForeignKey(Semester,related_name="subjects",on_delete=models.CASCADE)

    #Which teacher is teaching this subject
    subject_teacher=models.ForeignKey(Teacher,related_name="subjects",on_delete=models.CASCADE)


    def __str__(self):
        return f"pk: {self.pk} name: {self.name}"

    
    class Meta:
        db_table="subjects"


# # Classroom Page or Assignment connected to Subject
class ClassroomPage(models.Model):
    title=models.CharField(max_length=400)
    content=models.TextField()

    # The subject which it is related to
    subject=models.ForeignKey(Subject,related_name="classroom_pages",on_delete=models.CASCADE)

    def __str__(self):
        return f"pk: {self.pk} title: {self.title}"

    
    class Meta:
        db_table="classroompages"



class StudentResponse(models.Model):
    response_text=models.CharField(max_length=200)

    student=models.ForeignKey(Student,related_name="responses",on_delete=models.CASCADE)
    classroom_page=models.ForeignKey(ClassroomPage,related_name="responses",on_delete=models.CASCADE)



    class Meta:
        db_table="studentresponses"




# A model to share notes
# Notes related to classroom
class Notes(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(max_length=500)   

    created_by=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="notes")
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE,related_name="notes") 

    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"pk: {self.pk} title: {self.name}"

    
    class Meta:
        db_table="notes"





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






class Assignment(models.Model):

    title=models.CharField(max_length=300)

    subject=models.ForeignKey(Subject,on_delete=models.CASCADE,related_name="subjectAssignments")
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="teacherAssignments")
    created_at=models.DateTimeField(auto_now_add=True)
    deadline=models.DateTimeField()

    def __str__(self):
        return self.title


    class Meta:
        db_table="assignments"


class Choice(models.Model):

    title=models.CharField(max_length=400)

    def __str__(self):
        return self.title

    class Meta:
        db_table="choices"
        



class Question(models.Model):

    question=models.CharField(max_length=400)
    
    choices=models.ManyToManyField(Choice,related_name="choiceQuestions")

    answer=models.ForeignKey(Choice,related_name="answerQuestions",on_delete=models.CASCADE)
    assignment=models.ForeignKey(Assignment,on_delete=models.CASCADE,related_name="assignmentQuestions")

    order=models.SmallIntegerField()

    def __str__(self):
        return self.question


    class Meta:
        db_table="questions"


class Document(models.Model):

    title=models.CharField(max_length=100)
    description=models.TextField(max_length=300)
    document_file=models.FileField(upload_to="documents/")

    subject=models.ForeignKey(Subject,on_delete=models.CASCADE)
    created_by=models.ForeignKey(Teacher,on_delete=models.CASCADE)

    created_at=models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table="documents"


    


class GradedAssignment(models.Model):
    assignment=models.ForeignKey(Assignment,on_delete=models.DO_NOTHING,related_name="graded_assignments")
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    graded=models.IntegerField()
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table="graded_assignments"


class Exam(models.Model):
    classroom=models.ForeignKey(ClassRoom,on_delete=models.CASCADE,related_name="exams")
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE,related_name="exams")
    teacher=models.ForeignKey(Teacher,related_name="exams",on_delete=models.CASCADE)

    exam_date=models.DateField()
    start_time=models.TimeField()
    finish_time=models.TimeField()

    title=models.CharField(max_length=150)
    description=models.TextField()
    exam_help_text=models.TextField()

    class Meta:
        db_table="exams"


class TimeTable(models.Model):
    classroom=models.OneToOneField(ClassRoom,related_name='timetable',on_delete=models.CASCADE)

    class Meta:
        db_table="TimeTable"
class SubjectEntry(models.Model):
    subject=models.OneToOneField(Subject,related_name="subjct_time",on_delete=models.CASCADE)
    start_time=models.TimeField()
    finish_time=models.TimeField()
    timetable=models.ForeignKey(TimeTable,related_name="subject_entries",on_delete=models.CASCADE)

    class Meta:
        db_table="SubjectEntries"
