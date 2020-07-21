import React, { useState, useEffect } from 'react';
import loginService from './loginService.js';
import "./login.css";
//Login
//Enter Username, search on input
//update state with current user
//check username and password against user in state



const Login = (props) => {
  const [register, setRegister] = useState(true);
  const [form, setForm] = useState({
    user: {
      username: "",
      password: "",
      email: "",
      confirmpassword: ""
    }
  })
  useEffect(()=>{

}, [register])
  const [userData, setUserData] = useState({
    user: {
      username: "",
      email: "",
      password: "",
      id: 0
    }
  })
  const setReg = () => {
    setRegister(!register);
  }
  const handleChange = async (e) => {
    e.preventDefault()
    let target = e.target;
    let { name, value } = target;
    let current = await loginService.searchUser(value).catch(err => err);
   
    if(current.length === 0 ){
     return
    }
    setUserData((userData)=>{
      return {
        ...userData,
        user:{
          ...userData.user,
          username:current[0].username ? current[0].username: undefined,
          password:current[0].password ?current[0].password : undefined,
          email: current[0].email ?current[0].email : undefined,
          id:current[0].id ? current[0].id: undefined
        }
      }

    })
    setForm((prevState)=>{
      return {
        ...prevState,
        user:{
          ...prevState.user,
          [name]:value
        }
      }
    });
  }
  const handleRegister = async (e) => {

    let target = e.target;
    let { name, value } = target;
    setForm((prevState)=>{
      return {
        ...prevState,
        user:{
          ...prevState.user,
          [name]:value
        }
      }
    })
    

  }
  const onRegister = async (e) =>{
    let newUser = {...form.user};
    
    delete newUser.confirmpassword;
    newUser.date = new Date();
   
    let user = await loginService.addUser(newUser).then(res=>res).catch(err=>console.log(err))

    window.sessionStorage.setItem("credentials", JSON.stringify(user))
    props.history.push('/')
  }
  



  const onSubmit = (e) => {
    if (userData.user.email == form.user.email && userData.user.password == form.user.password) {
      window.sessionStorage.setItem("credentials", JSON.stringify(userData.user))
      props.history.push('/')
    } else if (userData.user.email === form.email || userData.user.password === form.password) {
      console.log("Incorrect password or username", userData.user.email, form.username, userData.user.password, form.password)
    } else {
      console.log("Password and Username Invalid")
    }
  }
  //Registration by default
  //If username is in system, collapse the second password field and make 
  //Register buttonm a login button


  return (
    <>
      {register ? <><form className="center col-md-4 col-md-offset-4 center login">
        <div className="form-group">
          <label htmlFor="inputEmail">Username</label>
          <input
            type="text"
            className="form-control"
            value={form.username}
            name="username"
            placeholder="Username"
            onChange={handleRegister}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            name="email"
            placeholder="Email"
            onChange={handleRegister}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleRegister}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmpassword"
            value={form.confirmpassword}
            placeholder="Confirm Password"
            onChange={handleRegister}
          />
        </div>
        <div className="form-group">
          <label className="form-check-label">
            <input type="checkbox" /> Remember me
    </label>
        </div>
        <button type="button" onClick={onRegister} className="btn btn-primary">
          Register
  </button>
        <button type="button" className="btn " onClick={setReg}>Login</button>
      </form> </> : <form className="col-md-4 col-md-offset-4 center login">
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-check-label">
              <input type="checkbox" /> Remember me
    </label>
          </div>
          <button type="button" onClick={onSubmit} className="btn btn-primary">
            Sign in
  </button>
          <button type="button" className="btn "  onClick={setReg}>Register</button>
        </form>}

    </>
  )
}
export default Login;