import axios from "axios";
import $api from "../http/index";

export async function login(email, password) {
  return axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
}

// export async function logout() {
//   return $api.post("/rest/v1/client/keys");
// }

export async function register() {
  return $api.get("/rest/v1/client/keys");
}
