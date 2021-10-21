import axios from 'axios'
import history from '../history';
const axiosApiInstace = axios.create({
  baseURL: 'http://localhost:4000',
  
})
const refrestoken = ()=>{
  return new Promise((resolve, reject)=>{
    const refreshToken = localStorage.getItem('refreshToken')
    axios.post('http://localhost:4000/v1/users/refreshtoken', { refreshToken:refreshToken})
    .then((res)=>{
      const result = res.data.data
      localStorage.setItem('token', result.token)
      localStorage.setItem('refreshToken', result.refreshToken)
      resolve(result)
    })
    .catch((err)=>{
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      reject(err)
      history.push('/login')
    })
  })
}
axiosApiInstace.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token')
  if (token){
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosApiInstace.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  // console.log(error.response);
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry){
    originalRequest._retry = true;
    if (error.response.data.message ==='token invalid'){
      alert('jangan ubah tokenya bro.....')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      history.push('/login')
    } else if (error.response.data.message === 'token expired'){
      // jika tidak fitur refresh token
      // alert('session habis silahkan login kembali')
      // localStorage.removeItem('token')
      // localStorage.removeItem('refreshToken')
      // history.push('/login')

      // jika ada fitur refresh token
      const resultRefresh = await refrestoken()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + resultRefresh.token;
      return axiosApiInstace(originalRequest);
    }
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default axiosApiInstace