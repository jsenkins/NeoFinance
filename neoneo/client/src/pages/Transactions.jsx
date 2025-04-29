import TransactionForm from '../components/TransactionForm';
import { useGetTransactionsQuery, useSearchTransactionsQuery } from '../store/api';
import { useState } from 'react';

export default function Transactions(){
  const [q,setQ] = useState('');
  const { data: txs=[] } = useGetTransactionsQuery();
  const { data: s=[] } = useSearchTransactionsQuery(q, { skip: !q });
  const list = q ? s : txs;

  return (
    <div>
      <h2 className="text-xl mb-2">Transactions</h2>
      <TransactionForm />
      <input
        placeholder="Search"
        className="border p-1 mb-2"
        value={q}
        onChange={e=>setQ(e.target.value)}/>
      <ul>
        {list.map(t=>
          <li key={t._id}>{new Date(t.date).toLocaleDateString()} – {t.category} – {t.amount}</li>
        )}
      </ul>
    </div>
  );
}
