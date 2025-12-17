import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

type Props = {};

const LineChart = (props: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
useEffect(()=>{

  const weather=async()=>{
    const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
  }
},[])
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const canvasHeight = chartRef.current.height;
const config:ChartConfiguration={
  type:"line",
  data:{
    label:[],
    datasets[
      {
        label:"",
        data:""
      }
    ]
  }
}
    chartInstance.current = new Chart(chartRef.current, config);

  },[])
  return (
    <div>
      <canvas ref={chartRef} className="w-full" />
    </div>
  );
};

export default LineChart;
