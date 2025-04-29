import { useState } from 'react';
import { useAddTransactionMutation } from '../store/api';

export default function TransactionForm(){
  const [tx, setTx] = useState({ type:'expense', amount:'', category:'', date:'' });
  const [add] = useAddTransactionMutation();
  return (
    <form
      className="flex space-x-2 mb-4"
      onSubmit={e=>{ e.preventDefault(); add(tx); }}>
      <select
        className="border p-1"
        value={tx.type}
        onChange={e=>setTx({...tx,type:e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        className="border p-1"
        placeholder="Amount"
        value={tx.amount}
        onChange={e=>setTx({...tx,amount:e.target.value})}/>
      <input
        className="border p-1"
        placeholder="Category"
        value={tx.category}
        onChange={e=>setTx({...tx,category:e.target.value})}/>
      <input
        type="date"
        className="border p-1"
        value={tx.date}
        onChange={e=>setTx({...tx,date:e.target.value})}/>
      <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-3">Add</button>
    </form>
  );
}
