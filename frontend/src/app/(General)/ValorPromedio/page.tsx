'use client'

import { valorpromediocategoria } from '@/app/Servicios/api';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,Title,Tooltip,Legend} from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement,Title, Tooltip, Legend);

export default function PromedioPorCategoriaChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: ''
      }
    ]
  });

  useEffect(() => {
    valorpromediocategoria()
      .then(data => {
        const categorias = data.map((item: any) => item.categoryCode);
        const promedios = data.map((item: any) => parseFloat(item.valorPromedio));

        setChartData({
          labels: categorias,
          datasets: [
            {
              label: 'Promedio por Categoría',
              data: promedios,
              borderColor: 'rgba(54, 162, 235, 0.8)',
              backgroundColor: 'rgba(54, 162, 235, 0.4)',
              tension: 0.3,
              fill: true
            }
          ]
        });
      })
      .catch((error) => console.log('Ocurrio un error al obtener datos:', error));
  }, []);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
