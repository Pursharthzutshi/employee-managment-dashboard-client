import React from "react";
import { useEffect, useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2";
import { useAppSelector } from "../../../../../ReduxHooks";


function DepartmentChart() {

  const HRDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.HRDepartment)
  const softwareDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.softwareDepartment)
  const testingDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.testingDepartment)
  const UIUXDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.UIUXDepartment)
  const salesDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.salesDepartment)

  const data = {
    // labels: ["Total Department"],

    datasets: [
      {
        // labels: ["HR Department", "Software Department", "Testing Department", "UI UX Design Department", "Sales Department"],
        data: [HRDepartment, softwareDepartment, testingDepartment, UIUXDepartment, salesDepartment],

        backgroundColor: ['rgb(0, 113, 212)', 'rgb(0, 85, 170)', 'rgb(0 142 184)', 'darkblue', 'blue'],
      },


    ],
    labels: ["HR Department", "Software Department", "Testing Department", "UI UX Design Department", "Sales Department"],

  }

  const options = {
    
    scales: {
      x: {
        display: false
      },
      y: {
        display: false

      },
      
    }
  }

  return (
    <div className="pie-chart-div">
      {
        <Pie className="pie-chart" options={options} data={data} />
      }
    </div>
  )


}

export default DepartmentChart;