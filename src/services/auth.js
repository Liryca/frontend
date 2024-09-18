import axios from "axios";

export async function login(email, password) {
  return axios.post(
    "https://backend-7yg7ehjo1-lirycas-projects.vercel.app/api/auth/login",
    {
      email,
      password,
    }
  );
}
