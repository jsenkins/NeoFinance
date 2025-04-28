import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/pages/login";
import Register from "./assets/pages/register";
import Analytics from "./assets/pages/analytics";
import Profile from "./assets/pages/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />

        



      </Routes>
    </Router>
  );
}

export default App;
