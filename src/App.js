import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserTable from "./components/UserTable";
import { useAuth } from "./context/AuthProvider";
import "./App.css";

function App() {
  const { user } = useAuth();
  console.log(user);
  console.log(localStorage.getItem("token"));
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {localStorage.getItem("token") && (
            <Route path="/users" element={<UserTable />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
