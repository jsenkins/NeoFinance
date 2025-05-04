// client/src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login        from './pages/Login';
import Register     from './pages/Register';
import Sidebar      from './components/Sidebar';
import Navbar       from './components/Navbar';
import Dashboard    from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets      from './pages/Budgets';
import Bills        from './pages/Bills';
import Debts        from './pages/Debts';
import Credits      from './pages/CreditsPage';
import Reports      from './pages/Reports';
import Contact      from './pages/Contact';
import Layout       from './components/Layout';

export default function App() {
  const token = useSelector((s) => s.auth.token);

  // If not authenticated, only allow login/register
  if (!token) {
    return (
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*"         element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Authenticated area
  return (
    <Layout>
      <Routes>
        <Route path="/"             element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets"      element={<Budgets />} />
        <Route path="/bills"        element={<Bills />} />
        <Route path="/debts"        element={<Debts />} />
        <Route path="/credits"      element={<Credits />} />
        <Route path="/reports"      element={<Reports />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
