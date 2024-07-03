from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from .models import Task
from .forms import TaskForm
from django.views.generic.base import TemplateView
@method_decorator(login_required, name='dispatch')
class TaskListView(View):
    def get(self, request):
        tasks = Task.objects.filter(user=request.user).order_by('due_date')
        return render(request, 'tasks/task_list.html', {'tasks': tasks})

@method_decorator(login_required, name='dispatch')
class TaskCreateView(View):
    def get(self, request):
        form = TaskForm()
        return render(request, 'tasks/add_task.html', {'form': form})

    def post(self, request):
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            return redirect('tasks:task-list')
        return render(request, 'tasks/add_task.html', {'form': form})

@method_decorator(login_required, name='dispatch')
class TaskUpdateView(View):
    def get(self, request, pk):
        task = get_object_or_404(Task, pk=pk, user=request.user)
        form = TaskForm(instance=task)
        return render(request, 'tasks/add_task.html', {'form': form})

    def post(self, request, pk):
        task = get_object_or_404(Task, pk=pk, user=request.user)
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('tasks:task-list')
        return render(request, 'tasks/add_task.html', {'form': form})

@method_decorator(login_required, name='dispatch')
class TaskDeleteView(View):
    def post(self, request, pk):
        task = get_object_or_404(Task, pk=pk, user=request.user)
        task.delete()
        return redirect('tasks:task-list')
class AboutView(TemplateView):
    template_name = 'about.html'

class ContactView(TemplateView):
    template_name = 'contact.html'