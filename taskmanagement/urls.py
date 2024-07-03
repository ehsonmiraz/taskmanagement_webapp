from django.contrib import admin
from django.urls import path, include
from tasks.views import TaskListView,ContactView,AboutView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('tasks/', include('tasks.urls')),
    path('', TaskListView.as_view(),name="homepage"),
    path('contact', ContactView.as_view(),name="contact"),
    path('about', AboutView.as_view(),name="about"),

]
