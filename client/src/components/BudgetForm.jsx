import { useState } from 'react';
import { useAddBudgetMutation } from '../store/api';

export default function BudgetForm(){
  const [b,setB] = useState({ category:'', amount:'' });
  const [add] = useAddBudgetMutation();
  return (
    <form className="flex space-x-2 mb-4" onSubmit={e=>{e.preventDefault();add(b);}}>
      <input
        className="border p-1"
        placeholder="Category"
        value={b.category}
        onChange={e=>setB({...b,category:e.target.value})}/>
      <input
        type="number"
        className="border p-1"
        placeholder="Amount"
        value={b.amount}
        onChange={e=>setB({...b,amount:e.target.value})}/>
      <button onClick={() => window.location.reload()} className="bg-green-500 text-white px-3">Set</button>
    </form>
  );
}
