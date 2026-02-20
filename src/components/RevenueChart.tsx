"use client";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function RevenueChart() {
    const data = {
        labels: ["Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026"],
        datasets: [
            {
                label: "Monthly Revenue",
                data: [1658453, 1959063, 2830980, 2921715, 4232866,1686765],
                backgroundColor: "#ef4444",
                borderRadius: 8,
            },
        ],
    };

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
