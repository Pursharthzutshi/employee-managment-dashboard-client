# Admin Employee Management Dashboard

A modern, responsive employee management CRM dashboard.

## Server Link 
https://github.com/Pursharthzutshi/employee-managment-dashboard-server

## Note / Instructions
Note: Initial startup especially during login/signup may take a few moments, as the backend server is hosted on Render.

## Demo Login Credentials

**Admin Login**
To see the admin dashboard, please type the admin login and admin password in the admin login form:
- Admin Email-id: `adminjake@gmail.com`
- Admin Password: `admin123`

**Employee Login**
To see the employee dashboard, please type the employee login and employee password in the employee login form:
- Employee Email-id: `william@gmail.com`
- Employee Password: `123`

---

## Tech Stack Used
In this project I have used React Typescript, Redux Toolkit, Tailwind CSS (for modern, premium CRM styling), and Apollo Client & GraphQL queries like useQuery, useMutation etc. In this project I have also used GraphQL mutations like add, update, delete, fetch etc & Apollo Server.

I have defined the typeDefs and resolvers in GraphQL. I have also set up the MongoDB database where all my dynamic data such as employee account details, employee task info details, and admin sign up info details are stored.

## From Admin Point of View

### Left Sidebar
It displays component links so the admin can navigate to the desired component. I have also added a logout button at the bottom so the admin can easily log out from the dashboard.

### Add Employees Component
In this component the admin can create a new employee account. It is a form where the admin can fill up employee details. Here the 2 most important fields are the gender type and department. So whenever a new account is created, the charts data of the bar chart & pie chart in the Home Component is updated automatically.

### Show All Employees Component
In this component, details of all employees are shown in boxes/cards. In this I have also added a search filter to filter out employees. Here a button is also added where the admin can set any employee as the employee of the month.
Here the admin can also delete an employee account.

### Home Component (Overview)
In this component, data of the organization is shown with the help of chart.js. I have used charts like bar and pie chart and data is coming from the database whenever a new employee account is added. 

The data shown is dynamic and updates automatically whenever there is any change, such as when a new employee is added. This component also includes information cards that display organization data like the total number of employees, total departments, etc.
Here there is another box which shows the employee of the month which can be assigned by the admin in the Show All Employees Component.

### Task Component
In this component the admin can create a new task, assign a task to the employee and can also edit and delete tasks. Here while adding I have added a select dropdown where the admin can select the employee and can assign a task to more than one employee.

### Create Admin Account Component
This component is visible at the start of the login page. Here the admin account can be created but the admin secret key (provided by company stored in database) is required to fill in order to create an account.

## From Employee Point of View

Whenever an employee tries to login he / she can see their own specific dashboard components:
- **Home / Overview:** Similar data overview.
- **Task Manager:** The employees can see their assigned tasks.
- **Employee Directory:** To view other employees.
- **Leave Status:** Employees can apply for leaves and track their request status (Pending, Approved, or Rejected).
