import axios from "axios";

export async function login(email, password) {
  return axios.post(
    "https://backend-production-4fc9.up.railway.app/api/auth/login",
    {
      email,
      password,
    }
  );
}

export async function register(name, email, password) {
  return axios.post(
    "https://backend-production-4fc9.up.railway.app/api/auth/register",
    {
      name,
      email,
      password,
    }
  );
}
