import LeftSidebar from './components/LeftSidebarComponent/LeftSidebar';
import { Route, Routes } from 'react-router-dom';
import EmployeesTaskManager from './components/Dashboard/EmployeesTaskManagerComponent/EmployeesTaskManager';
import Home from './components/Dashboard/HomeComponent/Home';
import ShowAllEmployees from './components/Dashboard/ShowAllEmployeesComponent/ShowAllEmployees';
import SignupAdmin from './components/RegisterComponent/SignUpComponent/SignUpAdmin';
import { useEffect, useState } from 'react';
import { useAppSelector } from './ReduxHooks';

import AssignedEmployeesTask from '../src/components/Dashboard/EmployeesComponent/AssignedEmployeesTaskComponent/AssignedEmployeesTask';
import CreateNewEmployeeAccount from './components/Dashboard/CreateNewEmployeeAccountComponent/CreateNewEmployeeAccount';

import Settings from './components/Dashboard/SettingsComponent/Settings';


import './App.css';
import './AppResponsive.css';
import HomePage from './components/HomePageComponent/HomePage';
import LoginAdmin from './components/RegisterComponent/LoginComponent/LoginAdmin';
import LoginUsers from './components/RegisterComponent/LoginComponent/LoginEmployees';

function App() {


  const changeLoginForm = useAppSelector((state) => state.ChangeSignUpFormSlicer.changeLoginForm)

  const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

  const logOutButton = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)

  // const [showMenuBar,setShowMenuBar] = useState(false)

  useEffect(() => {
    console.log(logOutButton)
    // console.log('adminStatus from localStorage:', localStorage.getItem('adminStatus'));
  }, [adminStatus])

  // const showLeftSidebar = () =>{
  //   setShowMenuBar(true);
  // }

  return (
    <div data-testid="app-container" className="App">

      <button className="show-menu-bar-button">show Menu Bar</button>

      {/* <button onClick={() => Dispatch(setChangeComponent(true))}>change</button> */}
      <div className='left-sidebar-dashboard-div'>

        {
          logOutButton && <LeftSidebar />
        }

        <Routes >
          <Route path="/home" element=
            {<Home />}
          />
          <Route path="/employeesTaskManagmentPage" element={

            adminStatus ? <EmployeesTaskManager /> : <AssignedEmployeesTask />
          }
          />

          <Route path="/showAllEmployeesData" element={<ShowAllEmployees />} />

          <Route path="/" element=
          {
            !logOutButton && <HomePage />
          }
             />


          <Route path="/loginAdmin" element={<LoginAdmin />} />

          <Route path="/loginEmployee" element={<LoginUsers />} />

          <Route path="/createEmployeeNewAccount" element=
            {adminStatus ?
              <CreateNewEmployeeAccount /> :
              null
            }
          />

          <Route path="/settings" element=
            {
              adminStatus ?
                <Settings /> :
                null
            }
          />

          <Route path="/signUpAdmin" element={<SignupAdmin />} />

        </Routes>
      </div>


    </div>
  );
}

export default App;
