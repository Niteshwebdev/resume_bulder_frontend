import React, {useState} from 'react';
import '../signupcss.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
    
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate()


  const handleChange = async (e) => {
    const { name, value } = e.target;
    // storing textdata from input fields
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData)

    try {
      const res =  await axios.post("http://localhost:5000/loginapi", loginData);

       if(res.status===200)
        {
          alert("Login Successfull")
          navigate("/")
        }
        else{
          alert("invalid detail")
        }


      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };




    return (
        <div>
             <div className='sign'>
       <div className="wrapper">
  <header>Login </header>
  <form action="#" onSubmit={handleLoginSubmit}>
    <div className="field email">
      <div className="input-area">
        <input type="text" placeholder="Email Address" name='email' value={loginData.email} onChange={handleChange}/>
        <i className="icon fas fa-envelope" />
        <i className="error error-icon fas fa-exclamation-circle" />
      </div>
      <div className="error error-txt">Email can't be blank</div>
    </div>
    <div className="field password">
      <div className="input-area">
        <input type="password" placeholder="Password" name='password' value={loginData.password} onChange={handleChange}/>
        <i className="icon fas fa-lock" />
        <i className="error error-icon fas fa-exclamation-circle" />
      </div>
      <div className="error error-txt">Password can't be blank</div>
    </div>
    <div className="pass-txt"><a href="#">Forgot password?</a></div>
    <Link to="/edittemplate"><input type="submit" defaultValue="Login" value="Login" /></Link>
  </form>
  <div className="sign-txt">Not yet member? <Link to="/signup">Signup now</Link></div>
</div>
</div>
        </div>
    );
}

export default Login;
