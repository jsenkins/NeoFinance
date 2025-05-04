
import { useState } from 'react';
import { useAddCreditMutation } from '../store/api';

export default function CreditForm() {
  const [addCredit] = useAddCreditMutation();
  const [formData, setFormData] = useState({
    name: '',
    limit: '',
    interestRate: '',
    cycleDate: '1',
    issuer: '',
    description: '',
    type: 'personal'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCredit({
        ...formData,
        limit: Number(formData.limit),
        interestRate: Number(formData.interestRate),
        cycleDate: Number(formData.cycleDate)
      }).unwrap();
      setFormData({
        name: '',
        limit: '',
        interestRate: '',
        cycleDate: '1',
        issuer: '',
        description: '',
        type: 'personal'
      });
    } catch (err) {
      console.error('Failed to add credit:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Card Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Issuer"
          value={formData.issuer}
          onChange={(e) => setFormData({...formData, issuer: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
          <option value="rewards">Rewards</option>
          <option value="secured">Secured</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          placeholder="Credit Limit"
          value={formData.limit}
          onChange={(e) => setFormData({...formData, limit: e.target.value})}
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
          min="1"
          max="31"
          placeholder="Statement Cycle Date"
          value={formData.cycleDate}
          onChange={(e) => setFormData({...formData, cycleDate: e.target.value})}
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
        Add Credit Card
      </button>
    </form>
  );
}
