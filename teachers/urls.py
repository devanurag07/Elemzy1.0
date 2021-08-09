from django.urls import path, include
from . import api
from .api import (DocumentResultUploadAPI, HolisticRankingGraphAPI, ManualResultsAPI, SemesterAPI,
                  SubjectAPI, NotesAPI,
                  SecondaryClassroom,
                  AssignmentAPI,
                  GlobalStudentsAPI,
                  ClassroomStudentsAPI,
                  DocumentAPI,
                  TeacherProfile,
                  ExamsAPI,
                  SubjectEntryAPI, MyTimeTable, HolisticRankingAPI, DashboardDataAPI)


from .api import LeaveRequestsAPI

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


router.register("classroom/holisticrankinggraph",
                HolisticRankingGraphAPI, basename="holistic_ranking_graph")
router.register("classroom/leaverequests",
                LeaveRequestsAPI, basename="leaverequests")

urlpatterns = [
    path("classroom/", api.TeacherClassroom.as_view()),
    path("studentslist/", api.GlobalStudentsAPI.as_view()),
    path("teacherslist/", api.TeachersList.as_view()),
    path("otherClassrooms/", SecondaryClassroom.as_view()),
    path("teacherProfileUpdate/", TeacherProfile.as_view()),
    path("classroom/dashboard_data/", DashboardDataAPI.as_view()),
    path("classroom/mytimetable/", MyTimeTable.as_view(), name="mytimetable"),
    path("classroom/uploadresult/",
         DocumentResultUploadAPI.as_view(), name="uploadresult"),
    path("classroom/manualresult/",
         ManualResultsAPI.as_view(), name="manualresult"),


]

urlpatterns += router.urls
