import React from "react";
import image from "../../../RegisterComponent/images/employee.png"
import { useAppSelector } from "../../../../ReduxHooks";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

import "../WelcomeBackComponent/WelcomeBack.css"

function WelcomeBack() {

    const savedLoggedInUserName = useAppSelector((state) => state.LocalStorageSlicer.savedLoggedInName)

    // const fetchAdminAccountDetails  = gql`

    // `

    return (
        <div className="welcome-back-card-container">
            <div className="welcome-back-card-image-message-div">
                <img src={image} />
                <h3>Welcome Back {savedLoggedInUserName}</h3>
            </div>
            <div className="welcome-back-card-text-button-div">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis accumsan elementum. Ut non fringilla tellus, vel iaculis orci. Vestibulum tristique finibus arcu id accumsan. Ut nec nisi vitae nulla posuere faucibus. Aliquam quis dui sit amet neque vestibulum lobortis. Curabitur lobortis nec augue ac euismod. Curabitur fermentum, tellus sed cursus ultrices, metus massa rutrum enim, at pretium mi lacus sed nulla. Sed sed ante risus.</p>
                <Link className="welcome-back-button" to="/">View Task</Link>
            </div>
        </div>

    )
}

export default WelcomeBack