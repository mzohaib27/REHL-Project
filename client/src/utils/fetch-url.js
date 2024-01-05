<<<<<<< HEAD
const baseURL = "http://localhost:8000/server";
=======
const baseURL = "http://localhost:3000";
>>>>>>> 466853a9e9e5f26b7b27a2d2298727663e770801

export const fetchWithBaseURL = (endpoint, options) => {
  const url = `${baseURL}${endpoint}`;
  return fetch(url, options);
};
