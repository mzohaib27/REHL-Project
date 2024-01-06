const baseURL = "http://localhost:8000/server";

export const fetchWithBaseURL = (endpoint, options) => {
  const url = `${baseURL}${endpoint}`;
  return fetch(url, options);
};
