import react from "react"

import DashboardMainImage from "../../../components/images/dashboardMain.png"
import DashboardMainImageTwo from "../../../components/images/dashboardMainTwo.png"
import Task from "../../../components/images/AddNewTask.png"
import EmployeesDetails from "../../../components/images/EmployeesDetails.png"
import AddEmployeeAccount from "../../../components/images/AddEmployeeAccount.png"
import Settings from "../../../components/images/Settings.png"

import "../About/About.css"

function About() {
    return (
        <section className="about-component">

            <div>
                <p className="page-heading underline underline-offset-1 font-semibold text-center mb-8 mt-10 text-xl">About Our Application</p>
            </div>

            <div>
                {/* <p className="font-semibold ml-10 text-lg">See the details of organization</p> */}
            </div>

            <div className="about-section-div">
                <img src={DashboardMainImage} />
                <p className="font-semibold">Data of Organization like total number of employee, total tasks , total number of admins can be seen on the Home Page.   </p>
            </div>

            <div className="about-section-div">
                <p className="font-semibold">Graphs tell us about the strength of the employees in terms of gender and department. Admin and employees can also see the employee of the month</p>
                <img src={DashboardMainImageTwo} />
            </div>
            <div className="about-section-div">
                <img src={Task} />
                <p className="font-semibold">Now, Admin can manage task and can perform actions such as add, update, delete. They can set deadline of task and can also assign task to multiple employees. Employee can see their assigned task</p>
            </div>

            <div className="about-section-div">
                <p className="font-semibold">Admin and employees can see total number of employees working in the organization and can filter out employees with search filter. Admin can also assign employee of the month and can delete any employee account who is now not working in the organization</p>
                <img src={EmployeesDetails} />
            </div>
            <div className="about-section-div">
                <img src={AddEmployeeAccount} />
                <p className="font-semibold">Admin can now add new employees account by filling up details given by the employee whenever a new employee joins the organization. Whenever a new employee account is added the updated data can be seen on the graph</p>
            </div>
            <div className="about-section-div">
                <p className="font-semibold">Admin information is shown in the settings page. Admin can easily update their settings such as name and password.</p>
                <img src={Settings} />
            </div>
        </section>
    )
}

export default About;