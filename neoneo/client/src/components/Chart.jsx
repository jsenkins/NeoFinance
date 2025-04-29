// client/src/components/Chart.jsx
import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut, Bar, Line } from 'react-chartjs-2'

// register chart types + scales + plugins once
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Doughnut / Pie
export function DoughnutChart({ data, options }) {
  return <Doughnut data={data} options={options} />
}

// Vertical Bar
export function BarChart({ data, options }) {
  return <Bar data={data} options={options} />
}

// Line chart
export function LineChart({ data, options }) {
  return <Line data={data} options={options} />
}
