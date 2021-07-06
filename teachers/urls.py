from django.urls import path, include
from . import api
from .api import (DocumentResultUploadAPI, SemesterAPI,
                  SubjectAPI, NotesAPI,
                  SecondaryClassroom,
                  AssignmentAPI,
                  GlobalStudentsAPI,
                  ClassroomStudentsAPI,
                  DocumentAPI,
                  TeacherProfile,
                  ExamsAPI,
                  SubjectEntryAPI, MyTimeTable, HolisticRankingAPI, DashboardDataAPI)


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("classroom/semester", SemesterAPI, basename="semester")
router.register("classroom/subject", SubjectAPI, basename="subject")
router.register("classroom/notes", NotesAPI, basename="notes")
router.register("classroom/assignments", AssignmentAPI, basename="assignments")
router.register("classroom/students", ClassroomStudentsAPI, basename="student")
router.register("classroom/documents", DocumentAPI, basename="documents")
router.register("classroom/exams", ExamsAPI, basename="exams")
router.register("classroom/timetable", SubjectEntryAPI, basename="timetable")
router.register("classroom/holisticranking",
                HolisticRankingAPI, basename="holistic_ranking")

# router.register("classroom/assignments",GradedAssingmentView,basename="assignments")


urlpatterns = [
    path("classroom", api.TeacherClassroom.as_view()),
    path("studentslist", api.GlobalStudentsAPI.as_view()),
    path("teacherslist", api.TeachersList.as_view()),
    path("otherClassrooms", SecondaryClassroom.as_view()),
    path("teacherProfileUpdate", TeacherProfile.as_view()),
    path("classroom/dashboard_data", DashboardDataAPI.as_view()),
    path("classroom/mytimetable", MyTimeTable.as_view(), name="mytimetable"),
    path("classroom/uploadresult",
         DocumentResultUploadAPI.as_view(), name="uploadresult")

]

urlpatterns += router.urls
