import React from 'react';
import { useGetCreditsQuery, useGetCreditSummaryQuery } from '../store/api';
import CreditForm from '../components/CreditForm';
import { BarChart } from '../components/Chart';

export default function CreditsPage() {
  const { data: lines = [], isLoading: loadingLines } = useGetCreditsQuery();
  const { data: summary = [], isLoading: loadingSummary } = useGetCreditSummaryQuery();

  if (loadingLines || loadingSummary) return <p>Loading credit data…</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Credit Lines</h2>

      {/* A) Form to add new credit lines */}
      <CreditForm />

      {/* B) Chart */}
      {summary.length > 0 ? (
        <BarChart
          data={{
            labels: summary.map(s => s.name),
            datasets: [{
              label: 'Utilization %',
              data: summary.map(s => s.utilization),  // these should be 0–100
              backgroundColor: '#fbbf24'
            }]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: v => `${v}%`
                }
              }
            }
          }}
        />
      ) : (
        <p className="text-gray-500">No credit lines yet.</p>
      )}

      {/* C) List existing lines */}
      <ul className="space-y-2">
        {lines.map(l => (
          <li key={l._id}>
            {l.name} — Used {l.balanceUsed} of {l.limit} ({Math.round((l.balanceUsed/l.limit)*100)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
