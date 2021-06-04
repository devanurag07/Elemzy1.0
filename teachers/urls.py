from django.urls import path,include
from . import api
from .api import SemesterAPI,SubjectAPI,NotesAPI,ClassroomPageView,SecondaryClassroom,AssignmentAPI,GlobalStudentsAPI,ClassroomStudentsAPI,DocumentAPI,TeacherProfile
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
router.register("classroom/semester",SemesterAPI,basename="semester")
router.register("classroom/subject",SubjectAPI,basename="subject")
router.register("classroom/notes",NotesAPI,basename="notes")
router.register("classroom/assignments",AssignmentAPI,basename="assignments")
router.register("classroom/students",ClassroomStudentsAPI,basename="student")
router.register("classroom/documents",DocumentAPI,basename="documents")


urlpatterns = [
    path("classroom",api.TeacherClassroom.as_view()),
    path("studentslist",api.GlobalStudentsAPI.as_view()),
    path("teacherslist",api.TeachersList.as_view()),
    path("otherClassrooms",SecondaryClassroom.as_view()),
    path("teacherProfileUpdate",TeacherProfile.as_view()),

]

urlpatterns +=router.urls
