import { useState } from 'react';
import { useAddCreditMutation } from '../store/api';

export default function CreditForm() {
  const [form, setForm] = useState({
    name: '',
    limit: '',
    interestRate: '',
    cycleDate: '1'
  });
  const [addCredit] = useAddCreditMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCredit({
      name: form.name,
      limit:  Number(form.limit),
      interestRate: Number(form.interestRate),
      cycleDate: Number(form.cycleDate)
    }).unwrap();
    setForm({ name:'', limit:'', interestRate:'', cycleDate:'1' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        className="border p-1"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        className="border p-1"
        placeholder="Limit"
        value={form.limit}
        onChange={e => setForm({ ...form, limit: e.target.value })}
      />
      <input
        type="number"
        className="border p-1"
        placeholder="Interest %"
        value={form.interestRate}
        onChange={e => setForm({ ...form, interestRate: e.target.value })}
      />
      <input
        type="number"
        className="border p-1 w-16"
        placeholder="Cycle Day"
        value={form.cycleDate}
        onChange={e => setForm({ ...form, cycleDate: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white px-3">
        Add
      </button>
    </form>
  );
}
