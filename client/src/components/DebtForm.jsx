
import { useState } from 'react';
import { useAddDebtMutation } from '../store/api';

export default function DebtForm() {
  const [addDebt] = useAddDebtMutation();
  const [formData, setFormData] = useState({
    name: '',
    principal: '',
    interestRate: '',
    termMonths: '',
    monthlyPayment: '',
    startDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDebt({
        ...formData,
        principal: Number(formData.principal),
        interestRate: Number(formData.interestRate),
        termMonths: Number(formData.termMonths),
        monthlyPayment: Number(formData.monthlyPayment)
      }).unwrap();
      setFormData({
        name: '',
        principal: '',
        interestRate: '',
        termMonths: '',
        monthlyPayment: '',
        startDate: new Date().toISOString().split('T')[0],
        description: ''
      });
    } catch (err) {
      console.error('Failed to add debt:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0c3e43] p-6 space-y-4">
      <div>
        <input
          type="text"
          placeholder="Debt Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Principal Amount"
          value={formData.principal}
          onChange={(e) => setFormData({...formData, principal: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          placeholder="Interest Rate (%)"
          value={formData.interestRate}
          onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Term (months)"
          value={formData.termMonths}
          onChange={(e) => setFormData({...formData, termMonths: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          placeholder="Monthly Payment"
          value={formData.monthlyPayment}
          onChange={(e) => setFormData({...formData, monthlyPayment: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full submit-button text-white p-2 rounded "
      >
        Add Debt
      </button>
    </form>
  );
}
