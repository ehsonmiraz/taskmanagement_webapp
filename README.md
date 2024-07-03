###Overview
The Task Management Application is a web-based tool that allows users to manage their tasks efficiently. The application includes features such as user registration, login, task creation, updating, deletion, and listing tasks. The application is built using Django for the backend and Bootstrap for the frontend.

**Features**
User Authentication
User Registration
User Login
User Logout
Task Management
Add a New Task
View List of Tasks
Update an Existing Task
Delete a Task
View Detailed Information of a Task
Technology Stack
Backend: Django
Frontend: Bootstrap
Database: SQLite (default with Django, can be replaced with PostgreSQL, MySQL, etc.)
Authentication: Django’s built-in authentication system
Prerequisites
Python 3.x
Django
Bootstrap (included via CDN)

###Installation

**Clone the Repository**
git clone https://github.com/yourusername/task_management_app.git
cd task_management_app

Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`


pip install -r requirements.txt
python manage.py migrate
Create a Superuser


python manage.py createsuperuser

python manage.py runserver

**Project Structure**
task_management_app/
├── accounts/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
├── tasks/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── add_task.html
│   ├── task_list.html
├── static/
│   ├── css/
│       ├── styles.css
├── manage.py
├── requirements.txt
└── README.md
####Usage
**User Authentication**
Register
Navigate to /accounts/register/ to create a new account.
Login
Navigate to /accounts/login/ to log into your account.
Logout
Click on the "Logout" button available on the navbar when logged in.
**Task Management**
Add a New Task
Navigate to /tasks/add/ to add a new task.
View Tasks
The home page / lists all tasks for the logged-in user.
Update a Task
Click on a task in the task list to view its details and then click "Edit" to update it.
Delete a Task
Click on a task in the task list to view its details and then click "Delete" to remove it.
