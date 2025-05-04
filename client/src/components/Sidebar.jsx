
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ArrowLeftRight, 
  PieChart, 
  Receipt, 
  Wallet, 
  CreditCard,
  BarChart,
  Mail
} from 'lucide-react';
import clsx from 'clsx';

const links = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budgets', icon: PieChart, label: 'Budgets' },
  { to: '/bills', icon: Receipt, label: 'Bills' },
  { to: '/debts', icon: Wallet, label: 'Debts' },
  { to: '/credits', icon: CreditCard, label: 'Credits' },
  { to: '/reports', icon: BarChart, label: 'Reports' },
  { to: '/contact', icon: Mail, label: 'Contact' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className=" text-white hidden lg:flex flex-col w-64 bg-[#33363c] border-r">
      <div className="flex-1 px-3 py-4">
        <ul className="menu menu-lg gap-2">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={clsx(
                  'flex items-center gap-3',
                  location.pathname === to && 'active'
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t p-4 text-sm text-center text-gray-500">
        © Neo Finance 2025 · v1.0.0
      </div>
    </div>
  );
}
