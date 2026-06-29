import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";
import { setShowLogOutButtonElements, setLogOutStatus, setAdminStatus } from "../../ReduxSlicers/LocalStorageSlicer";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../ReduxSlicers/LoginSlicer";

type testProps = {
    test: Boolean
}

function DropDown({ test }: testProps) {
    const showLogOutButtonElements = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)
    const navigate = useNavigate()

    const Dispatch = useAppDispatch()

    const logout = () => {
        Dispatch(setShowLogOutButtonElements(false))
        Dispatch(setLogOutStatus(false))
        Dispatch(setAdminStatus(false))
        navigate("/")
        Dispatch(setUserLoggedInEmailId(""))
        Dispatch(setUserLoggedInEmailPassword(""))
    }

    if (!test) return null;

    return (
        <div className="flex flex-col py-1">
            {showLogOutButtonElements ? (
                <button 
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left" 
                    onClick={logout}
                >
                    <FaSignOutAlt className="text-[16px]" />
                    <span>Logout</span>
                </button>
            ) : (
                <Link 
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors w-full text-left" 
                    to="/login"
                >
                    <FaSignInAlt className="text-[16px]" />
                    <span>Login</span>
                </Link>
            )}
        </div>
    )
}

export default DropDown;