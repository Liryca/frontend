import axios from "axios";
import $api from "../http/index";

export async function login(email, password) {
  return axios.post("backend-pearl-eight.vercel.app/api/auth/login", {
    email,
    password,
  });
}
