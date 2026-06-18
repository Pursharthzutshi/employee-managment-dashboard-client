
import SettingsProfile from "./SettingsProfile/SettingsProfile";

import "../../NavBarComponent/NavBar.css"
import "../SettingsComponent/Settings.css"

function Settings() {

    return (
        <div id="main-page" className="p-6 md:p-8 pt-12 md:pt-16 max-w-[1600px] mx-auto w-full">

            
            <div className="mt-8 animate-[showDashboardEffectAnimation_0.5s_ease-out]">
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h2>
                </div>

                <SettingsProfile />
            </div>
        </div>
    )
}

export default Settings;