import { useState } from 'react';
import { useAddBudgetMutation } from '../store/api';

export default function BudgetForm() {
  const [addBudget, { isLoading }] = useAddBudgetMutation();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await addBudget({
        category: formData.category,
        amount:   Number(formData.amount),
        period:   formData.period,
      }).unwrap();

      // reset form
      setFormData({ category: '', amount: '', period: 'monthly' });
    } catch (err) {
      setError(err?.data?.message || err?.error || 'Failed to add budget');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#678e93] space-y-4 p-6 rounded-md">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: e.target.value })
        }
        className="w-full p-2 border rounded"
        step="0.01"
        min="0"
        required
      />

      <select
        value={formData.period}
        onChange={(e) =>
          setFormData({ ...formData, period: e.target.value })
        }
        className="w-full p-2 border rounded"
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full submit-button text-white p-2 rounded hover:bg-green-600 disabled:opacity-60"
      >
        {isLoading ? 'Saving…' : 'Set Budget'}
      </button>
    </form>
  );
}
