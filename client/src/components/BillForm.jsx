// client/src/components/BillForm.jsx
import { useState } from 'react';
import { useAddBillMutation } from '../store/api'; // Adjust the import path as necessary

export default function BillForm() {
  const [bill, setBill] = useState({ name:'', amount:'', dueDate:'' });
  const [addBill] = useAddBillMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    await addBill(bill).unwrap();
    setBill({ name:'', amount:'', dueDate:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        className="border p-1"
        placeholder="Bill name"
        value={bill.name}
        onChange={e=>setBill({ ...bill, name:e.target.value })}
      />
      <input
        type="number"
        className="border p-1"
        placeholder="Amount"
        value={bill.amount}
        onChange={e=>setBill({ ...bill, amount:e.target.value })}
      />
      <input
        type="date"
        className="border p-1"
        value={bill.dueDate}
        onChange={e=>setBill({ ...bill, dueDate:e.target.value })}
      />
      <button onClick={() => window.location.reload()} type="submit" className="bg-blue-500 text-white px-3">Add Bill</button>
    </form>
  );
}
