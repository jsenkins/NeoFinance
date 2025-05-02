// client/src/components/BillForm.jsx
import { useState } from 'react';
import { useAddBillMutation } from '../store/api';

export default function BillForm() {
  const [addBill, { isLoading }] = useAddBillMutation();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    frequency: 'monthly',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await addBill({
        name: formData.name,
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        frequency: formData.frequency,
      }).unwrap();

      // reset the form
      setFormData({
        name: '',
        amount: '',
        dueDate: new Date().toISOString().split('T')[0],
        frequency: 'monthly',
      });
    } catch (err) {
      setError(err?.data?.message || err?.error || 'Failed to add bill');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Bill Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full p-2 border rounded"
        step="0.01"
        min="0"
        required
      />

      <select
        value={formData.frequency}
        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-60"
      >
        {isLoading ? 'Adding…' : 'Add Bill'}
      </button>
    </form>
  );
}
