import LeftSidebar from './components/LeftSidebarComponent/LeftSidebar';
import { Route, Routes } from 'react-router-dom';
import EmployeesTaskManager from './components/Dashboard/EmployeesTaskManagerComponent/EmployeesTaskManager';
import Home from './components/Dashboard/HomeComponent/Home';
import ShowAllEmployees from './components/Dashboard/ShowAllEmployeesComponent/ShowAllEmployees';
import SignupAdmin from './components/RegisterComponent/SignUpComponent/CreateNewEmployeeAccount';
import { useEffect } from 'react';
import { useAppSelector } from './ReduxHooks';
import LoginUsers from './components/RegisterComponent/LoginComponent/LoginUsers';
import LoginAdmin from './components/RegisterComponent/LoginComponent/LoginAdmin';
import AssignedEmployeesTask from './components/Dashboard/UserComponents/AssignedEmployeesTask';
import EmployeesHome from './components/Dashboard/UserComponents/EmployeesHome';
import CreateNewEmployeeAccount from './components/Dashboard/CreateNewEmployeeAccountComponent/CreateNewEmployeeAccount';

import './App.css';
import './AppResponsive.css';
import NavBar from './components/NavBarComponent/NavBar';


function App() {


  const changeLoginForm = useAppSelector((state) => state.ChangeSignUpFormSlicer.changeLoginForm)

  const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

  const logOutButton = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)

  useEffect(() => {
    // console.log('adminStatus from localStorage:', localStorage.getItem('adminStatus'));
  }, [adminStatus])

  return (
    <div className="App">

      {/* <button onClick={() => Dispatch(setChangeComponent(true))}>change</button> */}
      <div className='left-sidebar-dashboard-div'>
        {
          logOutButton ? <LeftSidebar /> : null
        }
        <Routes >
          <Route path="/home" element=
            {
              adminStatus ? <Home /> : <EmployeesHome />
            }
          />
          <Route path="/employeesTaskManagmentPage" element={

            adminStatus ? <EmployeesTaskManager /> : <AssignedEmployeesTask />
          }
          />

          <Route path="/showAllEmployeesData" element={<ShowAllEmployees />} />

          <Route path="/" element={
            changeLoginForm ? <LoginUsers /> : <LoginAdmin />}
          />

          <Route path="/createEmployeeNewAccount" element={<CreateNewEmployeeAccount />} />

          <Route path="/signUpAdmin" element={<SignupAdmin />} />

        </Routes>
      </div>


    </div>
  );
}

export default App;
