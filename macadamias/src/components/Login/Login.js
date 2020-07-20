import React, { useState } from 'react';
import APIManager from "../../modules/APIManager";



const Login = (props) => {
  const [register, setRegister] = useState(true);

  const [form, setForm] = useState({
    username: "",
    password: "",
    activeUserId: 1
  })
  const handleChange = async (e) => {
    e.preventDefault()
    let target = e.target;
    let { name, value } = target;
    let current = await APIManager.searchUsers(value).catch(err=>err)
    console.log(current, "CURRENT")
    setForm({ ...form, [name]: value })
    if(current.length != 0){
      checkValidity(current, value)
    }
    
  }
  const checkValidity = (current, value) => {
    
      if (current[0].username === value) {
        setRegister(false);
      } else {
        console.log("Keep Typing")
      
    }

  }
  const onSubmit = async (e) => {
    e.preventDefault()
    sessionStorage.setItem('credentials', JSON.stringify(form))

    console.log(window.userData)
    props.history.push('/navbar');
  }
  //Registration by default
  //If username is in system, collapse the second password field and make 
  //Register buttonm a login button


  return (
    <>
      {register ? <><form className="col-md-4 col-md-offset-4 center">
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            value={form.userName}
            name="username"
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
          Login/Register
  </button>
      </form> </> : <form className="col-md-4 col-md-offset-4 center">
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.userName}
              name="username"
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
        </form>}

    </>
  )
}
export default Login;