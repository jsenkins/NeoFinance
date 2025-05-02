
import { useGetBillsQuery, useDelBillMutation } from '../store/api';
import { Trash2 } from 'lucide-react';
import BillForm from '../components/BillForm';

export default function Bills() {
  const { data: bills = [], isLoading } = useGetBillsQuery();
  const [delBill] = useDelBillMutation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bills</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Add New Bill</h3>
          <BillForm />
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Upcoming Bills</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <span className="loading loading-spinner loading-lg"/>
            </div>
          ) : bills.length > 0 ? (
            <div className="space-y-4">
              {bills.map(bill => (
                <div 
                  key={bill._id}
                  className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{bill.name}</h4>
                    <p className="text-sm text-base-content/70">
                      Due {new Date(bill.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                      ${bill.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => delBill(bill._id)}
                      className="btn btn-ghost btn-sm btn-square text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-base-content/50 py-8">
              No bills added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
