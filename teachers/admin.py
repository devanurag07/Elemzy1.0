from django.contrib import admin
from .models import Teacher,ClassRoom,Student
from .models import ClassroomPage,Semester,Subject,StudentResponse,Notes

# Register your models here.

admin.site.register([Teacher,ClassRoom,Student,ClassroomPage,Notes,Semester,Subject,StudentResponse])
