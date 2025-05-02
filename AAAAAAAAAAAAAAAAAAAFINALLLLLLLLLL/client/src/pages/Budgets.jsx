
import BudgetForm from '../components/BudgetForm';
import BudgetSummary from '../components/BudgetSummary';

export default function Budgets() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Budgets</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Create Budget</h3>
          <BudgetForm />
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-200">
          <h3 className="text-lg font-semibold mb-6">Budget Overview</h3>
          <BudgetSummary />
        </div>
      </div>
    </div>
  );
}
