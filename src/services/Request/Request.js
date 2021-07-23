const request = (url, method, body) => {
  let headers = { 'Content-type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  console.log({ url });
  console.log({ method });
  console.log({ body });
  console.log({ headers });
  return fetch(url, {
    method,
    mode: 'cors',
    body: JSON.stringify(body),
    timeout: 5000,
    headers,
  });
};

export default request;
