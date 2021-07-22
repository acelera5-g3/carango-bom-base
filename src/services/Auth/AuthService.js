import request from '../Request/RequestService';

const AuthService = {
  login(user) {
    return request(`${process.env.REACT_APP_API_URL}/auth`, 'POST', user)
      .then((r) => r.json())
      .catch((err) => err);
  },
};

export default AuthService;
