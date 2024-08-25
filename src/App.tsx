import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user-login/UserLogin";
import UserSignup from "./pages/user-signup/UserSignup";
import UserDashboard from "./pages/user-dashboard/UserDashboard";
import Home from "./pages/home/Home";
import ConfirmMail from "./pages/confirm-email/ConfirmMail";
import AddPhno from "./pages/add-phnumber/AddPhno";
import ConfirmPhno from "./pages/confirm-phnumber/ConfirmPhno";
import UserDetails from "./pages/user-details/UserDetails";
import ConnectBroker from "./pages/connect-broker/ConnectBroker";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/confirm-email" element={<ConfirmMail />} />
        <Route path="/add-phno" element={<AddPhno />} />
        <Route path="/confirm-phno" element={<ConfirmPhno />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/connect-broker" element={<ConnectBroker />} />
      </Routes>
    </Router>
  );
}

export default App;
