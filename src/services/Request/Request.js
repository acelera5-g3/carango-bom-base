const request = (url, method, body) => {
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
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
