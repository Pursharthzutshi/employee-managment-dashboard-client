import image from "../../../RegisterComponent/images/employee.png"
import { useAppSelector } from "../../../../ReduxHooks";
import { Link } from "react-router-dom";

import "../WelcomeBackComponent/WelcomeBack.css"

function WelcomeBack() {

    const savedLoggedInName = useAppSelector((state) => state.LocalStorageSlicer.savedLoggedInName)

    const logOutButton = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)

    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {logOutButton && savedLoggedInName ? savedLoggedInName : 'Admin'}
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                    Here's what's happening with your workspace today. All systems operational.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Link to="/showAllEmployeesData" className="px-4 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span>Directory</span>
                </Link>
                <Link to="/employeesTaskManagmentPage" className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    <span>Manage Tasks</span>
                </Link>
            </div>
        </div>
    )
}

export default WelcomeBack