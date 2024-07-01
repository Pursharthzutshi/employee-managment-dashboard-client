import React from "react";
import NavBar from "../../NavBarComponent/NavBar";
import "../../NavBarComponent/NavBar.css"
import "../SettingsComponent/Settings.css"
import SettingsProfile from "./SettingsProfile/SettingsProfile";

function Settings() {

    return (
        <div className="settings-component">

            <NavBar />
            <p className="font-bold text-xl">Settings</p>
            <SettingsProfile/>
        </div>
    )
}

export default Settings;