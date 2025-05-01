import { useState } from 'react';
import { useAddDebtMutation } from '../store/api';

export default function DebtForm() {
  const [debt, setDebt] = useState({
    name:'', principal:'', interestRate:'', termMonths:'', monthlyPayment:''
  });
  const [addDebt] = useAddDebtMutation();

  const onSubmit = async e => {
    e.preventDefault();
    await addDebt({ 
      ...debt,
      principal: +debt.principal,
      interestRate: +debt.interestRate,
      termMonths: +debt.termMonths,
      monthlyPayment: +debt.monthlyPayment
    }).unwrap();
    setDebt({ name:'', principal:'', interestRate:'', termMonths:'', monthlyPayment:'' });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 mb-4">
      {/* inputs for name, principal, rate, term, payment */}
      <button type="submit" className="bg-blue-500 px-3 py-1 text-white">Add Debt</button>
    </form>
  );
}
