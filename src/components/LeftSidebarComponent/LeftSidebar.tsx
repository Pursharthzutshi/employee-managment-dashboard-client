import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../ReduxHooks";
import HomePageImage from "../RegisterComponent/images/homepage.png"
import detailsImage from "../RegisterComponent/images/file.png"
import employeeInfo from "../RegisterComponent/images/employee.png"
import addEmployee from "../RegisterComponent/images/add.png"
import settingsImage from "../RegisterComponent/images/settings.png"
import leaveImage from "../RegisterComponent/images/leave.png"

import "./LeftSidebar.css"

function LeftSidebar() {

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navItemClass = (path: string) => `
        flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
        ${isActive(path) 
            ? 'bg-indigo-500/10 text-indigo-400 font-semibold' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'}
    `;

    const iconClass = (path: string) => `
        w-4 h-4 transition-all duration-200
        ${isActive(path) ? 'opacity-100 scale-110 filter brightness-150 sepia hue-rotate-[220deg]' : 'opacity-50 group-hover:opacity-100'}
    `;

    return (
        <aside className="w-[260px] h-full bg-slate-900 border-r border-slate-800 flex flex-col z-20 flex-shrink-0 transition-all duration-300">
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
                
                {/* Logo Section */}
                <div className="flex items-center mb-8 px-2 cursor-pointer transition-transform hover:scale-105 duration-300">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center mr-3 shadow-md shadow-indigo-500/20">
                        <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Dashboard</h2>
                </div>

                {/* Navigation Menu */}
                <div className="mb-2 px-2 mt-6">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
                </div>

                <nav className="flex flex-col space-y-0.5">
                    <Link className={navItemClass('/home')} to="/home">
                        <img className={iconClass('/home')} src={HomePageImage} alt="Home" />
                        <span className="text-[13px] tracking-wide">Overview</span>
                    </Link>

                    <Link className={navItemClass('/employeesTaskManagmentPage')} to="/employeesTaskManagmentPage">
                        <img className={iconClass('/employeesTaskManagmentPage')} src={detailsImage} alt="Tasks" />
                        <span className="text-[13px] tracking-wide">Tasks</span>
                    </Link>

                    <Link className={navItemClass('/showAllEmployeesData')} to="/showAllEmployeesData">
                        <img className={iconClass('/showAllEmployeesData')} src={employeeInfo} alt="Employee Details" />
                        <span className="text-[13px] tracking-wide">Directory</span>
                    </Link>
                </nav>

                <div className="mb-2 px-2 mt-8">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administration</p>
                </div>

                <nav className="flex flex-col space-y-0.5">
                    {
                        adminStatus ?
                            <Link className={navItemClass('/createEmployeeNewAccount')} to="/createEmployeeNewAccount">
                                <img className={iconClass('/createEmployeeNewAccount')} src={addEmployee} alt="Add Employee" />
                                <span className="text-[13px] tracking-wide">{adminStatus ? "Add Employee" : "Show Employee"}</span>
                            </Link>
                            : null
                    }
                    {
                        !adminStatus && <Link className={navItemClass('/employeesTakenLeaves')} to="/employeesTakenLeaves">
                            <img className={iconClass('/employeesTakenLeaves')} src={leaveImage} alt="Employee Leave" />
                            <span className="text-[13px] tracking-wide">Leave Status</span>
                        </Link>
                    }
                    {
                        adminStatus && <Link className={navItemClass('/settings')} to="/settings">
                            <img className={iconClass('/settings')} src={settingsImage} alt="Settings" />
                            <span className="text-[13px] tracking-wide">Settings</span>
                        </Link>
                    }
                </nav>
            </div>
            
            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex items-center space-x-3 px-2">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-300 font-bold text-xs">{adminStatus ? "AD" : "US"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-white truncate">{adminStatus ? "Admin User" : "Employee"}</p>
                        <p className="text-[11px] font-medium text-slate-400 truncate">Workspace Access</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default LeftSidebar;