import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from '../assets/login.svg';
import queryString from 'query-string';

const Login = (props) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = new useHistory();
  const cookies = new Cookies();

  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  useEffect(() => {
    let queryObj = queryString.parse(props.location.search)
    if(queryObj.activation){
      toast.success("Activation successful.");
    }else if(queryObj.reset){
      toast.success("Password Reset Successful.");
    }else if(queryObj.error){
      toast.error(queryObj.error);
    }else if(queryObj.token){
      cookies.set('jwt', queryObj.token , { path: '/' })
      history.push("/home");
    }
  },[])

  const submitButton = async (event) => {
    event.preventDefault();
    await axios({
      method : "POST",
      url : 'http://localhost:4000/api/v1/auth/login',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      data : {
        email,
        password
      }
    })
    .then((res) => res.data)
    .then(data => {
        cookies.set('jwt', data.token , { path: '/' })
        history.push("/home");
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
  };
  if (cookies.get("jwt") !== undefined) {
    history.push("/home");
  } else {
    return (
      <>
        <div>
        <ToastContainer />
        <div className="maindiv">
          <div className="innerdiv">
            <div className="design m-auto">
              <svg
                height="300px"
                width="auto"
                className="svg"
              >
                <image
                  href={loginImage}
                  height="300px"
                  className="image"
                />
              </svg>
            </div>
            <div className="register">
              <h3 className="register-heading text-center">LOGIN FORM</h3>
              <form onSubmit={submitButton} className="register-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    className="form-control"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    id="password"
                    value={password}
                    required
                  />
                  <div className="show-password">
                    <div>
                      <input type="checkbox" onClick={showPassword} />
                      <span> Show Password</span>
                    </div>
                    <div className='forgot-password'>
                      <Link to='/forgot-password'>Forgot password ?</Link>
                    </div>
                  </div>
                </div>
                <div className='button-div'>
                    <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary mb-4"
                    />
                </div>
              </form>
              <div className='text-center'>
                <p>
                  Don't have an account ?{" "}
                  <Link to="/signup" className="register-login">
                    Register
                  </Link>
                </p>
              </div>
              <div className='text-center'>
                <a href="http://localhost:4000/api/v1/auth/google"> Login with Google </a>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  return 0;
};
export default Login;
