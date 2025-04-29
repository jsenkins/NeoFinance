import { Routes, Route, Link } from 'react-router-dom';
import Navbar  from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard   from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets      from './pages/Budgets';
import Reports      from './pages/Reports';
import Contact      from './pages/Contact';
import Bills        from './pages/Bills'; 
import DebtsPage    from './pages/Debts';
import CreditsPage from "./pages/CreditsPage";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 flex-1 overflow-auto">
          <Routes>
            <Route path="/"         element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/budgets"      element={<Budgets/>} />
            <Route path="/reports"      element={<Reports/>} />
            <Route path="/contact"      element={<Contact/>} />
            <Route path="/bills"        element={<Bills/>}/>
            <Route path="/debts"   element={<DebtsPage/>} />
            <Route path="/credits" element={<CreditsPage/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
