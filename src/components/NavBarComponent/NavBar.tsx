import React, { useState } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import DropDown from "../utils/DropDown";

import "../NavBarComponent/NavBar.css"
import "../NavBarComponent/NavBarResponsive.css"

function NavBar() {

    const [test, setTest] = useState<boolean>(false);
    const location = useLocation();

    const change = () => {
        setTest(!test)
    }

    const getPageTitle = (path: string) => {
        if (path.includes('/home')) return 'Overview';
        if (path.includes('/employeesTaskManagmentPage')) return 'Tasks Manager';
        if (path.includes('/showAllEmployeesData')) return 'Employee Directory';
        if (path.includes('/createEmployeeNewAccount')) return 'Add Employee';
        if (path.includes('/employeesTakenLeaves')) return 'Leave Status';
        if (path.includes('/settings')) return 'Settings';
        return 'Dashboard';
    }

    const pageTitle = getPageTitle(location.pathname);

    return (
        <div className="w-full flex items-center justify-between mb-8 pb-5 border-b border-gray-200/70 relative z-40">
            {/* Left side: Heading */}
            <div className="flex items-center min-w-[200px]">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{pageTitle}</h1>
            </div>

            {/* Right side: Profile */}
            <div className="flex items-center space-x-4 min-w-[200px] justify-end relative">
                
                {/* Profile Dropdown */}
                <div 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-200"
                    onClick={() => change()}
                >
                    <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-full flex items-center justify-center shadow-sm">
                        <FaUser className="text-[13px]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 hidden sm:block">Account</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${test ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                
                {test && (
                    <div className="absolute top-14 right-0 z-50 shadow-xl rounded-xl border border-gray-100 bg-white min-w-[220px]">
                        <DropDown test={test} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar;