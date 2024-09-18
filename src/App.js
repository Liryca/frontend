import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserTable from "./components/UserTable";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route path="/register" element={<Register />} />
          {localStorage.getItem("token") && (
            <Route
              path="/users"
              element={
                <AuthProvider>
                  <UserTable />
                </AuthProvider>
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
