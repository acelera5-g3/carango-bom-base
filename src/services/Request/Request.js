const request = (url, method, body) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    timeout: 5000,
    headers,
  });
};

export default request;
