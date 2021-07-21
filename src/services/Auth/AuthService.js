import request from '../Request/RequestService';

const AuthService = {
  login(user) {
    return request(`${process.env.REACT_APP_API_URL}/auth`, 'POST', user)
      .then((r) => r.json())
      .catch((err) => err);
  },

  validar(token) {
    return request(`${process.env.REACT_APP_API_URL}/auth/validar`, 'POST', {token})
    .then(() => true)
    .catch(() => false);
  }
};

export default AuthService;
