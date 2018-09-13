import Req from './Req';

const Token = {
  setToken: (resp) => {
    if (resp.headers['x-access-token'] && resp.headers['x-refresh-token']) {
      const token = resp.headers['x-access-token'];
      const refreshToken = resp.headers['x-refresh-token'];
      localStorage.setItem('x-access-token', token);
      localStorage.setItem('x-refresh-token', refreshToken);
      Req.defaults.headers = {
        'x-access-token': token,
        'x-refresh-token': refreshToken
      }
    }
  },
  setLoginToken: (data) => {
    const {token, refreshToken} = data;
    localStorage.setItem('x-access-token', token);
    localStorage.setItem('x-refresh-token', refreshToken);
    Req.defaults.headers = {
      'x-access-token': token,
      'x-refresh-token': refreshToken
    }
  }
}

export default Token;