import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user? <Home /> : <Navigate to="/login" />}>
          
        </Route>
        <Route path="/login" element={user? <Navigate to="/" /> : <Login />}></Route>
        {/* we are not required to make register page, considering the project requirements, accounts are only added by managers, so please ignore this route */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}>
        </Route>
        <Route path="/admin/:adminContentProp" element={user? <Admin/> : <Navigate to="/login" />}></Route>
        <Route path="/dashboard" element={user? <Dashboard/> : <Navigate to="/login" />}/>

      </Routes>
    </Router>
  );
}

export default App;
