import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Threats from "./pages/dashboard/Threats";
import Alerts from "./pages/dashboard/Alerts";
import Logs from "./pages/dashboard/Logs";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/threats" element={<Dashboard><Threats /></Dashboard>} />
      <Route path="/dashboard/alerts" element={<Dashboard><Alerts /></Dashboard>} />
      <Route path="/dashboard/logs" element={<Dashboard><Logs /></Dashboard>} />
      <Route path="/dashboard/settings" element={<Dashboard><Settings /></Dashboard>} />
    </Routes>
  );
}

