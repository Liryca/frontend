import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setIsAuth(true);
      setUser(response.data.user);
      sessionStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (error) {
      setError(error?.response?.data);
    } finally {
      setTimeout(() => setError(""), 1000);
    }
  };

  return (
    <div className="row align-items-center">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1>Login</h1>
      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
        <div>
          <input
            required
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            required
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
        </div>
      </form>
      <div>
        <Link className="link-underline-primary" to="/register">
          or Register if you don't have an account yet
        </Link>
      </div>
    </div>
  );
}

export default Login;
