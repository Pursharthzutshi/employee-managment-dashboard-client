import { Pie } from "react-chartjs-2";
import { useAppSelector } from "../../../../../ReduxHooks";


function DepartmentChart() {

  const HRDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.HRDepartment)
  const softwareDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.softwareDepartment)
  const testingDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.testingDepartment)
  const UIUXDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.UIUXDepartment)
  const salesDepartment = useAppSelector((state) => state.ChartsDetailsSlicer.salesDepartment)

  const data = {

    datasets: [
      {
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center h-full transition-all hover:shadow-md min-h-[300px]">
      <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight text-center">Department Breakdown</h3>
      <div className="flex-1 w-full flex items-center justify-center">
      {
        <Pie className="w-full max-h-[250px]" options={options} data={data} />
      }
      </div>
    </div>
  )


}

export default DepartmentChart;