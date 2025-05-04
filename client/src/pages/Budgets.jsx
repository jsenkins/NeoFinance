
import BudgetForm from '../components/BudgetForm';
import BudgetSummary from '../components/BudgetSummary';
import'./basics.css'
export default function Budgets() {
  return (
    <div className="bg-[#001e30] space-y-6 p-6 ">
      <h2 className="text-2xl  text-white font-semibold">Budgeting</h2>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className=" bg-[#0c3e43] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg text-white font-semibold mb-6">Create Budget</h3>
          <BudgetForm />
        </div>

        <div className="rounded-xl  bg-[#0c3e43]  p-6 shadow-sm ">
          <h3 className="text-lg text-white font-semibold mb-6">Budget Overview</h3>
          <BudgetSummary />
        </div>
      </div>
    </div>
  );
}
