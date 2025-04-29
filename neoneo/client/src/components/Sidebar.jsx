import { NavLink } from 'react-router-dom';
export default function Sidebar(){
  const links = ['','transactions','budgets','bills','reports','debts','credits','contact'];
  return (
    <div className="w-48 bg-gray-100 p-4">
      {links.map(p => (
        <NavLink
          key={p}
          to={p||'/'}
          className={({isActive})=>
            `block p-2 mb-1 rounded ${isActive?'bg-blue-500 text-white':'hover:bg-blue-100'}`}>
          {p? p.charAt(0).toUpperCase()+p.slice(1):'Dashboard'}
        </NavLink>
      ))}
    </div>
  );
}
