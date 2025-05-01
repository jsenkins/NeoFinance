        
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Analytics from "./pages/analytics";
import Profile from "./pages/profile";
import Bills from "./pages/Bills";
import DebtData from "./pages/budgeting";
import Budgeting from "./pages/budgeting";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/debtdata" element={<DebtData />} />
        <Route path="/budgeting" element={<Budgeting />} />

        





      </Routes>
    </Router>
  );
}

export default App;
