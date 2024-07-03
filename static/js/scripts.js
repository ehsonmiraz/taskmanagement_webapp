$(document).ready(function () {
    const API_URL = 'http://127.0.0.1:8000/api/';

    // Function to store tokens in local storage
    function storeTokens(access, refresh) {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
    }

    // Function to check if access token is expired
    function isTokenExpired(token) {
        const decodedToken = jwt_decode(token);
        return decodedToken.exp < Date.now() / 1000;
    }

    // Function to refresh access token using refresh token
    async function refreshToken() {
        const refreshToken = localStorage.getItem('refresh');

        try {
            const response = await fetch(`${API_URL}accounts/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('access', data.access);
        } catch (error) {
            console.error('Token refresh failed:', error);
            // Handle token refresh failure (e.g., redirect to login page)
        }
    }

    // Function to fetch tasks with access token
    async function fetchTasks() {
        const accessToken = localStorage.getItem('access');

        if (!accessToken || isTokenExpired(accessToken)) {
            await refreshToken();
        }

        try {
            const response = await fetch(`${API_URL}tasks/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const data = await response.json();
            $('#tasks').empty();
            data.forEach(task => {
                $('#tasks').append(`
                    <li class="list-group-item">
                        ${task.title} - ${task.description} - ${task.due_date}
                        <button class="btn btn-sm btn-danger float-right delete-task" data-id="${task.id}">Delete</button>
                        <button class="btn btn-sm btn-warning float-right edit-task" data-id="${task.id}" style="margin-right: 5px;">Edit</button>
                    </li>
                `);
            });
        } catch (error) {
            console.error('Fetch tasks failed:', error);
            // Handle fetch tasks failure (e.g., redirect to login page)
        }
    }

    // Function to handle login
    async function handleLogin(username, password) {
        try {
            const response = await fetch(`${API_URL}accounts/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            storeTokens(data.access, data.refresh);
            window.location.href = '/tasks/task_list.html';
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    }

    // Function to handle registration
    async function handleRegister(username, password) {
        try {
            const response = await fetch(`${API_URL}accounts/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            alert('Registration successful. Please login.');
            window.location.href = '/accounts/login.html';
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    }

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/accounts/login.html';
    }

    // Event listener for login form submission
    $('#login-form').submit(function (event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        handleLogin(username, password);
    });

    // Event listener for registration form submission
    $('#register-form').submit(function (event) {
        event.preventDefault();
        const username = $('#reg-username').val();
        const password = $('#reg-password').val();
        handleRegister(username, password);
    });

    // Event listener for add task form submission
    $('#add-task-form').submit(async function (event) {
        event.preventDefault();

        const title = $('#title').val();
        const description = $('#description').val();
        const dueDate = $('#due-date').val();

        const accessToken = localStorage.getItem('access');

        if (!accessToken || isTokenExpired(accessToken)) {
            await refreshToken();
        }

        try {
            const response = await fetch(`${API_URL}tasks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ title, description, due_date: dueDate })
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            $('#title').val('');
            $('#description').val('');
            $('#due-date').val('');
            fetchTasks(); // Refresh task list after adding a new task
        } catch (error) {
            console.error('Add task failed:', error);
            alert('Failed to add task. Please try again.');
        }
    });

    // Event listener for logout button
    $('#logout').click(handleLogout);

    // Check if on login or register page
    if (window.location.pathname.includes('login')) {
        $('#login-page').show();
    } else if (window.location.pathname.includes('register')) {
        $('#register-page').show();
    } else {
        // Auto login and fetch tasks if tokens are present
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');

        if (accessToken && refreshToken) {
            fetchTasks();
            $('#tasks-page').show();
        } else {
            window.location.href = '/accounts/login.html';
        }
    }
});
