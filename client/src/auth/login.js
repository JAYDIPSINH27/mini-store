import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from '../assets/login.svg';

axios.defaults.withCredentials = true;

const Login = () => {
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

  const submitButton = async (event) => {
    event.preventDefault();
    await axios
      .post("/auth-user/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error("❗" + res.data.error);
        }
        if (res.data.message) {
            toast.info(res.data.message);
          }
        if (res.data.token) {
          console.log(res);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
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
