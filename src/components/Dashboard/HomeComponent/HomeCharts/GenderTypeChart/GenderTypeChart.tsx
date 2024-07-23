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
    <div className="bar-chart-div">
   
      {
        chartData && <Bar className="doughnut-chart" options={options} data={data} />
      }
    </div>
  )


}

export default GenderTypeChart;