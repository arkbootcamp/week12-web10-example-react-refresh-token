import React, {useState} from 'react'
import axiosInstace from '../../configs/axios'
import {useHistory} from 'react-router-dom'
// import 

const Login = (props) => {
  // console.log(props);
  const history = useHistory()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e)=>{
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = (e)=>{
    e.preventDefault()
    axiosInstace.post('/v1/users/login', formLogin)
    .then((res)=>{
      const result = res.data.data
      localStorage.setItem('token', result.token)
      localStorage.setItem('refreshToken', result.refreshToken)
      history.push('/product')
    })
  }
  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={handleChange}/>
          <small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name="password" onChange={handleChange}/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
