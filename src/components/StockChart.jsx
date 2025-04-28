import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StockChart({ stocks }) {
  const data = {
    labels: stocks.map((stock) => stock.symbol),
    datasets: [
      {
        label: 'Stock Price ($)',
        data: stocks.map((stock) => stock.price),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)'); // Indigo-500
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0.6)');  // Indigo-600
          return gradient;
        },
        borderRadius: 8, // rounded corners
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 1)',
        hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows custom height
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Live Stock Prices Chart',
        font: {
          size: 24,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 14 },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 400,
        ticks: {
          stepSize: 50,
          font: { size: 14 },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-10 h-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default StockChart;