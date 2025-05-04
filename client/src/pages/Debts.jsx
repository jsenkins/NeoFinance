import { useGetDebtsQuery } from '../store/api';
import DebtForm from '../components/DebtForm';

export default function Debts() {
  const { data: debts = [], isLoading } = useGetDebtsQuery();

  return (
    <div className="bg-[#001e30] p-6 space-y-6 text-white" >
      <h2 className="text-2xl font-semibold">Debts</h2>

      <div className="  grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─────────── Add‑new panel ─────────── */}
        <div className="bg-[#0c3e43] rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Add New Debt</h3>
          <DebtForm />
        </div>

        {/* ─────────── Current debts panel ─────────── */}
        <div className="bg-[#0c3e43] rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Current Debts</h3>

          {isLoading ? (
            /* Loading spinner */
            <div className="flex items-center justify-center h-[200px]">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : debts.length ? (
            /* Debt list */
            <div className="space-y-4">
              {debts.map((debt) => {
                // ---------- Safe coercions ----------
                const initial   = Number(debt?.initialAmount ?? 0);
                const remaining = Number(debt?.remainingAmount ?? 0);
                const paid      = initial - remaining;
                const progress  = initial ? (paid / initial) * 100 : 0;

                return (
                  <div
                    key={debt._id}
                    className="p-4 bg-[#aca4ac] rounded-lg space-y-2 border border-base-200"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{debt?.name ?? '—'}</h4>
                      <span className="badge badge-error">
                        {debt?.type ?? 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-base-content/70">
                      <span>Initial: ${initial.toLocaleString()}</span>
                      <span>Rate: {Number(debt?.interestRate ?? 0)}%</span>
                    </div>

                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-error h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Paid: ${paid.toLocaleString()}</span>
                      <span>Remaining: ${remaining.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <p className="text-center text-base-content/50 py-8">
              No debts added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
