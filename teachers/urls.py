from django.urls import path,include
from . import api
from .api import SemesterAPI,SubjectAPI,NotesAPI,ClassroomPageView,SecondaryClassroom
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
router.register("classroom/semester",SemesterAPI,basename="semester")
router.register("classroom/subject",SubjectAPI,basename="subject")
router.register("classroom/notes",NotesAPI,basename="notes")
router.register(r"classroom/assignments",ClassroomPageView,basename="classroompage")


urlpatterns = [
    path("classroom",api.TeacherClassroom.as_view()),
    path("studentslist",api.StudentsAPI.as_view()),
    path("teacherslist",api.TeachersList.as_view()),
    path("otherClassrooms",SecondaryClassroom.as_view()),

]

urlpatterns +=router.urls
