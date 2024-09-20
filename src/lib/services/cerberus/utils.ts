export const getHeaders = () => {
  const access_token = localStorage.getItem("access_token");
  //   const refresh_token = localStorage.getItem("refresh_token");

  const headers = new Headers();
  if (access_token) {
    headers.append("Authorization", `Bearer ${access_token}`);
  }

  return headers;
};
