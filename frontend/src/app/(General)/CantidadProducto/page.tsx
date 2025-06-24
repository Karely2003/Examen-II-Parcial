'use client'
import {cantidadproductomarca} from '@/app/Servicios/api'
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CantidadPorMarcaChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Cantidad de productos por marca',
      data: [],
      backgroundColor: [
        '#FF6384', 
        '#FFCD56', 
        '#36A2EB', 
        '#4BC0C0', 
        '#9966FF', 
        '#FF9F40'  
      ],
      borderWidth: 1
    }]
  });

  useEffect(() => {
      cantidadproductomarca()
      .then(res => res.json())
      .then(data => {
        const labels = data.map((item: any) => item.brandCode);
        const values = data.map((item: any) => parseInt(item.cantidadProductos));

        setChartData(prev => ({
          ...prev,
          labels,
          datasets: [{
            ...prev.datasets[0],
            data: values
          }]
        }));
      })
      .catch(error => console.error('Error al cargar datos:', error));
  }, []);

  return (
    <div>
      <h2>Cantidad de productos por Marca</h2>
      <Pie data={chartData} />
    </div>
  );
}
