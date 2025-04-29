import BudgetForm from '../components/BudgetForm';
import BudgetSummary from '../components/BudgetSummary';

export default function Budgets() {
  return (
    <div>
      <h2 className="text-xl mb-4">Budgets</h2>
      
      {/* form to create new budgets */}
      <BudgetForm />

      {/* the summary with progress bars */}
      <div className="mt-8 p-4 bg-white rounded shadow">
        <h3 className="mb-2 font-semibold">Your Budget Usage</h3>
        <BudgetSummary />
      </div>
    </div>
  );
}
