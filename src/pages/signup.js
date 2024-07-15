import React, { useState } from 'react';
import '../signupcss.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Signup = () => {
    
  

  const [registrationdata,setregistrationdata]=useState({
     name: "",
     email: "",
     phone: "",
     password: ""
  })

     const navigate=useNavigate();

  const handlechange=(e)=>{
    const {name , value}=e.target;

    setregistrationdata((prevdata)=>({
        ...prevdata,
        [name]: value,
    }))
      
  }

  const handlesubmit =async(e)=>{
    e.preventDefault();
     console.log(registrationdata)

     try{

      const res=await axios.post('http://localhost:5000/signupapi',registrationdata)
      
       if(res.status===200)
        {
          alert("registraion successfull")
          navigate("/login")
        }
        else{
          alert("registraion failed")
        }



        
      


  }
  catch(err){
    console.log(err)
  }


  }

 







    return (
      <div className='sign'>
      <div className="wrapper contain">
        <header>Registration</header>
        <form action="#" onSubmit={handlesubmit}>
          <div className="field first-name">
            <div className="input-area">
              <input type="text" placeholder="Enter Your Full Name" name="name" value={registrationdata.name} onChange={handlechange} />
              <i className="icon fas fa-user" />
              <i className="error error-icon fas fa-exclamation-circle" />
            </div>
            <div className="error error-txt">First name can't be blank</div>
          </div>
          {/* <div className="field last-name">
            <div className="input-area">
              <input type="text" placeholder="Last Name" />
              <i className="icon fas fa-user" />
              <i className="error error-icon fas fa-exclamation-circle" />
            </div>
            <div className="error error-txt">Last name can't be blank</div>
          </div> */}
          <div className="field email">
            <div className="input-area">
              <input type="text" placeholder="Email Address" name='email' value={registrationdata.email} onChange={handlechange}/>
              <i className="icon fas fa-envelope" />
              <i className="error error-icon fas fa-exclamation-circle" />
            </div>
            <div className="error error-txt">Email can't be blank</div>
          </div>
          <div className="field phone">
            <div className="input-area">
              <input type="text" placeholder="Phone Number" name='phone' value={registrationdata.phone} onChange={handlechange} />
              <i className="icon fas fa-phone" />
              <i className="error error-icon fas fa-exclamation-circle" />
            </div>
            <div className="error error-txt">Phone number can't be blank</div>
          </div>
          <div className="field password">
            <div className="input-area">
              <input type="password" placeholder="Password" name='password' value={registrationdata.password} onChange={handlechange}/>
              <i className="icon fas fa-lock" />
              <i className="error error-icon fas fa-exclamation-circle" />
            </div>
            <div className="error error-txt">Password can't be blank</div>
          </div>
          <input type="submit" defaultValue="Register" value="Submit" />
        </form>
        <div className="sign-txt">Already a member? <Link to="/login">Login now</Link></div>
      </div>
    </div>
    

        
    );
}

export default Signup;
