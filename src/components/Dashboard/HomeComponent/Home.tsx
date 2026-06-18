
import { useEffect, useState } from "react";
// import Dropdown from 'react-dropdown';
import "../../../App.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement

} from 'chart.js';

import NavBar from "../../NavBarComponent/NavBar";
import { gql, useQuery, } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { resetCounts, resetDepartmentCounts, setCount, setDepartmentCount, setGenderTypeCount } from "../../../ReduxSlicers/ChartsDetailsSlicer";
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";
import GenderTypeChart from "./HomeCharts/GenderTypeChart/GenderTypeChart";
import DepartmentChart from "./HomeCharts/DepartmentChart/DepartmentChart";
import CardsDetails from "./CardsDetailsComponent/CardsDetails";
import EmployeeOfTheMonth from "./EmployeeOfTheMonthComponent/EmployeeOfTheMonth";
import WelcomeBack from "./WelcomeBackComponent/WelcomeBack";

import { show_all_employees_charts_data_query } from "../../../GraphQLQueries/HomeQuery";
import EmployeeLeaves from "./EmployeeLeavesComponent/EmployeeLeaves";
import ChatBox from "./ChatBox/ChatBox";
import ShowChatRoom from "./ChatBox/ShowAllChatsUsersComponent/ShowChatRoom";


import "../HomeComponent/Home.css"
import "../HomeComponent/HomeResponsive.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


function Home() {

    const { data: employeesData, refetch } = useQuery(show_all_employees_charts_data_query);

    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)


    const count = useAppSelector((state) => state.ChartsDetailsSlicer.count)
    const createEmployeeNewAccountStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus);
    const showChatRoom = useAppSelector((state) => state.ShowChatRoomSlicer.showChatRoom)


    const Dispatch = useAppDispatch()

    useEffect(() => {

        if (createEmployeeNewAccountStatus === true) {
            Dispatch(resetCounts());
            Dispatch(resetDepartmentCounts());
            Dispatch(setCreateEmployeeNewAccountStatus(false))
        }

        if (employeesData && employeesData.showAllEmployee) {

            if (count !== employeesData.showAllEmployee.length) {
                employeesData.showAllEmployee.map((employeesDataList: string) => {
                    return Dispatch(setGenderTypeCount(employeesDataList))
                })
                employeesData.showAllEmployee.map((employeesDataList: string) => {
                    return Dispatch(setDepartmentCount(employeesDataList))
                })
            }

            const totalDataCount = employeesData.showAllEmployee.length
            Dispatch(setCount(totalDataCount))

            refetch()
        }

    }, [employeesData])



    return (
        <div id="main-page" className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">

            <NavBar />

            <div className="mt-8 space-y-8 animate-[showDashboardEffectAnimation_0.5s_ease-out]">
                <WelcomeBack />

                <CardsDetails />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <GenderTypeChart />
                    <EmployeeOfTheMonth />
                    <DepartmentChart />
                </div>

                <div className="mt-6 w-full">
                    {
                        adminStatus && <EmployeeLeaves />
                    }
                </div>

                {
                    !adminStatus && <ChatBox />
                }

                {
                    showChatRoom && <ShowChatRoom />
                }
            </div>

        </div>
    )
}

export default Home;

