const baseURL = "http://localhost:3000";

export const fetchWithBaseURL = (endpoint, options) => {
  const url = `${baseURL}${endpoint}`;
  return fetch(url, options);
};
