import { useAppSelector } from "../../../../../ReduxHooks";
import { Bar } from "react-chartjs-2";


function GenderTypeChart() {


  const maleCount = useAppSelector((state) => state.ChartsDetailsSlicer.maleCount)
  const femaleCount = useAppSelector((state) => state.ChartsDetailsSlicer.femaleCount)
  const othersCount = useAppSelector((state) => state.ChartsDetailsSlicer.othersCount)


  const chartData = useAppSelector((state) => state.ChartsDetailsSlicer.chartData)


  const data = {
    labels: [ "Male", "Female", "Others"],
    datasets: [
      {
        label: 'NUMBER OF EMPLOYEES',
        data: [ maleCount, femaleCount, othersCount],
        backgroundColor: ['rgb(0, 113, 212)', 'rgb(0, 85, 170)', "rgb(0 142 184)"],
      },


    ]
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center h-full transition-all hover:shadow-md min-h-[300px]">
      <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight text-center">Gender Diversity</h3>
      <div className="flex-1 w-full flex items-center justify-center">
      {
        chartData && <Bar className="w-full max-h-[250px]" options={options} data={data} />
      }
      </div>
    </div>
  )


}

export default GenderTypeChart;