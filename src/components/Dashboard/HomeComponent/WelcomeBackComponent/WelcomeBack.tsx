import image from "../../../RegisterComponent/images/employee.png"
import { useAppSelector } from "../../../../ReduxHooks";

import "../WelcomeBackComponent/WelcomeBack.css"

function WelcomeBack() {

    const savedLoggedInName = useAppSelector((state) => state.LocalStorageSlicer.savedLoggedInName)

    const logOutButton = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)

    return (
        <div className="welcome-back-card-container">
            <div className="welcome-back-card-image-message-div">
                <img src={image} />
                <p className="font-bold text-lg ml-3 mt-5">Welcome Back
                    <span className="ml-2 text-blue-500">
                        {
                            logOutButton && savedLoggedInName
                        }
                    </span>
                </p>
            </div>
            <div className="welcome-back-card-text-button-div">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis accumsan elementum. Ut non fringilla tellus, vel iaculis orci. Vestibulum tristique finibus arcu id accumsan. Ut nec nisi vitae nulla posuere faucibus. Aliquam quis dui sit amet neque vestibulum lobortis. Curabitur lobortis nec augue ac euismod. Curabitur fermentum, tellus sed cursus ultrices, metus massa rutrum enim, at pretium mi lacus sed nulla. Sed sed ante risus.</p>
            </div>
        </div>

    )
}

export default WelcomeBack