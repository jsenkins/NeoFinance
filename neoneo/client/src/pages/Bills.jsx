// client/src/pages/Bills.jsx
import { useGetBillsQuery, useDelBillMutation } from '../store/api';
import BillForm from '../components/BillForm';

export default function Bills() {
  const { data:bills = [], isLoading } = useGetBillsQuery();
  const [delBill] = useDelBillMutation();

  if (isLoading) return <p>Loading bills…</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">Your Bills</h2>
      <BillForm />
      <ul className="space-y-2">
        {bills.map(b => (
          <li key={b._id} className="flex justify-between items-center">
            <span>
              {b.name} — {b.amount} — due {new Date(b.dueDate).toLocaleDateString()}
            </span>
            <button
            onClick={async () => {
                // 1) call the delete-mutation
                await delBill(b._id).unwrap()
                // 2) then reload the page
                window.location.reload()
            }}
            className="text-red-500 hover:underline"
            >
            Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
