import axios from 'axios';

export default axios.create({
  baseURL : "http://devs.ip-dynamic.com:3001/",
  headers : {
    'x-access-token' : localStorage.getItem('x-access-token'),
    'x-refresh-token' : localStorage.getItem('x-refresh-token')
  }
});