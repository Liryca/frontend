export const shouldLogout = (error) => {
  return (
    error.response &&
    (error.response.status === 403 ||
      error.response.status === 404 ||
      error.response.status === 400)
  );
};
