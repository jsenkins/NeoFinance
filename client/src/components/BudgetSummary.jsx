import React from 'react';
import { useGetBudgetSummaryQuery } from '../store/api';

export default function BudgetSummary() {
  const { data = [], isLoading, isError } = useGetBudgetSummaryQuery();

  if (isLoading) return <p>Loading budgets…</p>;
  if (isError)   return <p>Error loading budgets</p>;

  return (
    <div className="space-y-4">
      {data.map(b => (
        <div key={b._id}>
          <div className="flex justify-between mb-1">
            <span className="font-medium">{b.category}</span>
            <span>
              {b.spent} / {b.amount} ({b.percent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className={`h-2 rounded ${
                b.percent > 100 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${b.percent}%` }}
            />
          </div>
          {b.percent > 100 && (
            <p className="text-sm text-red-600 mt-1">
              You’ve exceeded this budget!
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
