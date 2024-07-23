import NavBar from "../../NavBarComponent/NavBar";
import SettingsProfile from "./SettingsProfile/SettingsProfile";

import "../../NavBarComponent/NavBar.css"
import "../SettingsComponent/Settings.css"

function Settings() {

    return (
        <div className="settings-component">

            <NavBar />
            <p className="font-bold text-xl">Settings</p>
            <SettingsProfile />
        </div>
    )
}

export default Settings;