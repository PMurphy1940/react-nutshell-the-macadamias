import React, { useState } from 'react';

const Login = (props) =>{
    const [form, setForm] = useState({
        username: "",
        password:""
    })
    const handleChange = (e) =>{
        let target = e.target;
        let {name, value} = target;
        setForm({...form, [name]: value})
    }
    const onSubmit = () =>{
        sessionStorage.setItem('credentials', JSON.stringify(form))
        props.setLogin(true);
        console.log(JSON.parse(sessionStorage.credentials));
    }
    //Registration by default
    //If username is in system, collapse the second password field and make 
    //Register buttonm a login button


    return (
        <>
        <form className="col-md-4 col-md-offset-4 center">
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
</form>
        </>
    )
}
export default Login;