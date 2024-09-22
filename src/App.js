import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserTable from "./components/UserTable";
import NotFound from "./components/NotFound";
import "./App.css";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { isAuth } = useAuth();

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuth && <Route path="/users" element={<UserTable />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
