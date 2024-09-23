import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Неизвестная ошибка");
    }
  };

  return (
    <div className="row align-items-center">
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1>Registration</h1>
      <form className="row g-4 needs-validation" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          required
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div>
          <button className="btn btn-primary mb-3" type="submit">
            Register
          </button>
        </div>
      </form>
      <div>
        <Link className="link-underline-primary" to="/">
          or Login if you have an account
        </Link>
      </div>
    </div>
  );
}

export default Register;
