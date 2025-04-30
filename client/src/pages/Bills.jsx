import { useState } from 'react';
//import { useDelBillMutation } from '../store/api';

import BillForm from '../assets/components/BillForm';
import './basics.css'; // Common styles
import './bills.css';

export default function Bills() {
  // Hardcoded bills data for now
  const [bills, setBills] = useState([
    { _id: '1', name: 'Electricity', amount: 150, dueDate: '2025-05-01' },
    { _id: '2', name: 'Water', amount: 50, dueDate: '2025-05-10' },
    { _id: '3', name: 'Internet', amount: 30, dueDate: '2025-05-15' },
  ]);

  //const [delBill] = useDelBillMutation();
  const [message, setMessage] = useState(null); // Success/Error messages

  const handleDelete = async (billId) => {
    try {
      // Simulate delete operation here, remove from hardcoded data
      setBills((prevBills) => prevBills.filter((bill) => bill._id !== billId));
      setMessage({ type: 'success', text: 'Bill deleted successfully!' });

      // You can replace the above with the real mutation call later
      // await delBill(billId).unwrap();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete bill. Please try again.' });
      console.error("Failed to delete bill:", err);
    }
  };

  return (
    <div className='bills-container'>
      <h2>Your Bills</h2>
      {/* Uncomment when you want to allow users to add bills */}
      {/* <BillForm /> */}

      {/* Display success/error messages */}
      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
          <span
            className="alert-close"
            onClick={() => setMessage(null)}
          >
            &times;
          </span>
        </div>
      )}

      <ul className="space-y-2">
        {bills.map(b => (
          <li key={b._id} className="flex justify-between items-center">
            <span>
              {b.name} — ${b.amount} — due {new Date(b.dueDate).toLocaleDateString()}
            </span>
            <button type="delete"
              onClick={() => handleDelete(b._id)}
              className="bill-item"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
