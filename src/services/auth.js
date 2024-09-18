import axios from "axios";

export async function login(email, password) {
  return axios.post(
    "https://backend-4wn28qfob-lirycas-projects.vercel.app/api/auth/login",
    {
      email,
      password,
    }
  );
}
