from django.contrib import admin
from .models import Teacher, ClassRoom, Student
from .models import (ClassroomPage, Semester,
                     Subject, StudentResponse,
                     GradedAssignment, Notes,
                     Question,
                     Assignment,
                     Choice, Document,
                     Exam,DocumentResult,ResultRow,ManualResult,RankingDocument)

# Register your models here.

admin.site.register([Teacher, ClassRoom, Student, ClassroomPage, Notes, Semester,
                    Subject, StudentResponse, Question, Assignment, Choice, Document, GradedAssignment,Exam,
                    DocumentResult,ResultRow,ManualResult,RankingDocument])
