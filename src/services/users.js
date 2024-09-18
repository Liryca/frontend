import $api from "../http/index";

export async function deleteUsers(ids) {
  return $api.delete("/users/", { data: { ids } });
}

export async function blockUsers(ids) {
  return $api.post("/users/block", { ids });
}

export async function unBlockUsers(ids) {
  return $api.post("/users/unblock", { ids });
}

export async function getUsers() {
  return $api.get("/users");
}
