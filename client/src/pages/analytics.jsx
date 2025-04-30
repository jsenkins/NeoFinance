import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import './analytics.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);

const Analytics = () => {
    const [incomeExpenseData, setIncomeExpenseData] = useState(null);
    const [expenseBreakdownData, setExpenseBreakdownData] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get('/api/analytics');
                setIncomeExpenseData(response.data.incomeExpenseData);
                setExpenseBreakdownData(response.data.expenseBreakdownData);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, []);

    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "http://localhost:5000/api/export/pdf";
        link.setAttribute("download", "financial_summary_report.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadCSV = () => {
        const link = document.createElement("a");
        link.href = "http://localhost:5000/api/export/csv";
        link.setAttribute("download", "financial_summary_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        <div className="fullWindow">
            <Header username="javeria" />
            <div className="mainContent">
               
                
                <h2 className="analyticsTitle">You are viewing your analytics</h2>

                <div className="analyticsSection">
                    <div className="buttonContainer">
                        <button type="pdf" onClick={downloadPDF}>Download Report (PDF)</button>
                        <button type="csv" onClick={downloadCSV}>Download (CSV)</button>
                        <button type="transaction" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Hide Transaction Form' : 'Show Transaction Form'}
                        </button>

                        { showForm && (
                            <div className="mt-4">
                                <TransactionForm />
                                <button className="reloadButton" onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>
                                    Reload Page
                                </button>
                            </div>
                        )}
                    </div>
                    

                    <h2>Scroll down to view more charts </h2>

                    <div className="chartGrid">
                        <div className="chartBox">
                            <div className="chartContainer">
                                <h3 className="chartTitle">Income vs Expenses</h3>
                                <div style={{ width: '100%' }}>
                                    <Line data={incomeExpenseData || defaultLineData} />
                                </div>
                            </div>
                        </div>

                        <div className="chartBox">
                            <div className="chartContainer">
                                <h3 className="chartTitle">Expense Breakdown</h3>
                                <div style={{ width: '100%' }}>
                                    <Pie data={expenseBreakdownData || defaultPieData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div style={{ marginTop: '40px', paddingBottom: '20px' }}>
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

                   
                </div>
              
            </div>
        </div>
    );
};

export default Analytics;
