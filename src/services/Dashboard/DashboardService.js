import request from '../Request/Request';

const DashboardService = {
  listar() {
    return request(
      `${process.env.REACT_APP_API_URL}/dashboard`,
      'GET'
    ).then((r) => r.json());
  },
};

export default DashboardService;
