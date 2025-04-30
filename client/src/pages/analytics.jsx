import React, { useEffect, useState } from 'react';
import Header from '../assets/components/header';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; // Axios for API calls
import { jsPDF } from 'jspdf'; // For PDF generation
import Papa from 'papaparse'; // For CSV generation


import './analytics.css'; // Regular CSS import

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);

const Analytics = () => {
    const [incomeExpenseData, setIncomeExpenseData] = useState(null);
    const [expenseBreakdownData, setExpenseBreakdownData] = useState(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                // Connect to your backend API endpoint (adjust the URL according to your backend server)
                const response = await axios.get('/api/analytics');

                // Assuming the response has income vs expenses and breakdown data separately
                setIncomeExpenseData(response.data.incomeExpenseData);
                setExpenseBreakdownData(response.data.expenseBreakdownData);

            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, []);

    // Function to generate and download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Financial Summary Report", 10, 10);

        // Adding content to PDF (example, modify according to your needs)
        let yPosition = 20;
        incomeExpenseData && incomeExpenseData.datasets.forEach((dataset) => {
            doc.text(`${dataset.label}: ${dataset.data.join(', ')}`, 10, yPosition);
            yPosition += 10;
        });

        doc.save("financial_summary_report.pdf");
    };

    // Function to generate and download CSV
    const downloadCSV = () => {
        const dataToExport = [
            ['Month', 'Income', 'Expenses'], // Header Row
            ['January', 4000, 3000],
            ['February', 4500, 3500],
            ['March', 5000, 3200],
            ['April', 4700, 3600],
            ['May', 5200, 3400],
            ['June', 5800, 3700],
        ];

        const csvData = Papa.unparse(dataToExport); // Convert data to CSV format
        const blob = new Blob([csvData], { type: 'text/csv' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "financial_summary_report.csv";
        link.click();
    };

    const defaultLineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Income',
                data: [4000, 4500, 5000, 4700, 5200, 5800],
                borderColor: '#001e30',
                backgroundColor: '#277278',
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: [3000, 3500, 3200, 3600, 3400, 3700],
                borderColor: '#F44336',
                backgroundColor: '#F4433644',
                tension: 0.4,
            },
        ],
    };

    const defaultPieData = {
        labels: ['Rent', 'Food', 'Utilities', 'Entertainment', 'Other'],
        datasets: [
            {
                label: 'Expense Breakdown',
                data: [35, 25, 15, 10, 15],
                backgroundColor: ['#001e30', '#277278', '#0c3e43', '#e2e9ea', '#52565d'],
            },
        ],
    };

    return (
        <div className='fullWindow'>
            <Header username='javeria' />

            <div className="mainContent">
                <h2 className="analyticsTitle">Financial Analytics</h2>

                <div className="analyticsSection">
                    {/* Chart Box for Income vs Expenses */}
                    <div className="buttonContainer">

                        <button type='pdf' onClick={downloadPDF}>Download Report (PDF)</button>
                        <button type='csv' onClick={downloadCSV}>Download (CSV)</button>
                    </div>
                    <div className="chartBox">
                        <div className="chartContainer">
                            <h3 className="chartTitle">Income vs Expenses</h3>
                            <Line data={incomeExpenseData || defaultLineData} />
                        </div>

                    </div>

                    {/* Chart Box for Expense Breakdown */}
                    <div className="chartBox">
                        <div className="chartContainer">
                            <h3 className="chartTitle">Expense Breakdown</h3>
                            <Pie data={expenseBreakdownData || defaultPieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Analytics;


<div style={{ marginTop: '40px' }}>
    <iframe
        style={{ borderRadius: '12px' }}
        src="https://open.spotify.com/embed/track/3VHD84tIdyxRTtRc167YSR?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Music Player"
    ></iframe>
</div>