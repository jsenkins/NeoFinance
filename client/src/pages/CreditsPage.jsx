import { useGetCreditsQuery } from '../store/api';
import CreditForm from '../components/CreditForm';

export default function CreditsPage() {
  const { data: credits = [], isLoading } = useGetCreditsQuery();

  return (
    <div className="bg-[#001e30] p-6 text-white space-y-6">
      <h2 className="text-2xl font-semibold">Credit Lines</h2>

      <div className="  bg-[#001e30] grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─────────── Add‑credit panel ─────────── */}
        <div className="rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Add Credit Line</h3>
          <CreditForm />
        </div>

        {/* ─────────── Active credit panel ─────────── */}
        <div className=" rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Active Credit Lines</h3>

          {isLoading ? (
            /* Loading spinner */
            <div className="flex items-center justify-center h-[200px]">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : credits.length ? (
            /* Credit list */
            <div className="space-y-4">
              {credits.map((credit) => {
                // ---------- Safe coercions ----------
                const limit  = Number(credit?.limit ?? 0);
                const used   = Number(credit?.used ?? 0);
                const avail  = limit - used;
                const rate   = Number(credit?.interestRate ?? 0);
                const pct    = limit ? (used / limit) * 100 : 0;

                return (
                  <div
                    key={credit._id}
                    className="p-4 bg-[#aca4ac] text-black rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{credit?.name ?? '—'}</h4>
                      <span className="badge badge-primary">
                        {credit?.type ?? 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-base-content/70">
                      <span>Limit: ${limit.toLocaleString()}</span>
                      <span>Rate: {rate}%</span>
                    </div>

                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Used: ${used.toLocaleString()}</span>
                      <span>Available: ${avail.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <p className="text-center text-base-content/50 py-8">
              No credit lines added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
