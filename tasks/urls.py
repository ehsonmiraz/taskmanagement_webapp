from django.urls import path
from .views import TaskListView, TaskCreateView, TaskUpdateView, TaskDeleteView
app_name= "tasks"
urlpatterns = [
    path('', TaskListView.as_view(), name='task-list'),
    path('add/', TaskCreateView.as_view(), name='task-add'),
    path('<int:pk>/edit/', TaskUpdateView.as_view(), name='task-edit'),
    path('<int:pk>/delete/', TaskDeleteView.as_view(), name='task-delete'),
]
