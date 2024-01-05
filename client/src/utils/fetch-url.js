const baseURL = "http://localhost:7000/server";

export const fetchWithBaseURL = (endpoint, options) => {
  const url = `${baseURL}${endpoint}`;
  return fetch(url, options);
};

export const backendPort = fetch(`http://localhost:7000/server`);
