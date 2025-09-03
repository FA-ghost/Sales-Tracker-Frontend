import { Chart } from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import { useEffect, useRef } from "react"

function BarGraph ({data}){
    const chartRef = useRef(null);

    useEffect(() => {
        // Force resize when component mounts or updates
        const timer = setTimeout(() => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [data]);

    const chartOptions = {
      scales:{
        x:{
          grid:{
            color:"rgba(224, 228, 236, 0.1)"
          }
        },
        y:{
          beginAtZero: true,
          grid:{
            display:false,
            color:"rgba(224, 228, 236, 0.1)"
          }
        }
      },
      plugins:{
        legend:{
          display:false,
        }
      },
      barThickness:30,
      borderWidth:2,
      borderColor:"transparent",
      borderRadius:5,
      responsive:true,
      maintainAspectRatio: false,
      resizeDelay: 0,
      onResize: (chart, size) => {
        chart.update('none');
      },
      interaction: {
        intersect: false,
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        }
      }
    }

    return (
      <div className="w-full h-full relative">
        <Bar ref={chartRef} options={chartOptions} data={data} />
      </div>
    );
}

export default BarGraph