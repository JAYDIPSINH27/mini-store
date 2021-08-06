import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../css/register.css";
import loginImage from '../assets/login.svg';

axios.defaults.withCredentials = true;

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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
    if (password !== confirmPassword) {
      toast.error("Both password must be same");
    } else {
      await axios
        .post("/auth/signup", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          }
          if (res.data.emailError) {
            toast.error(res.data.emailError);
          }
          if (res.data.passwordError) {
            toast.error(res.data.passwordError);
          }
          if (res.data.token) {
            toast.success("Register Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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
              <h3 className="register-heading text-center">REGISTER FORM</h3>
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
                  <div className="register-show-password">
                    <input type="checkbox" onClick={showPassword} />
                    <span> Show Password</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    name="cpassword"
                    type="password"
                    placeholder="Enter Your Password"
                    className="form-control"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    id="cpassword"
                    value={confirmPassword}
                    required
                  />
                </div>
                <div className='button-div'>
                    <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary mb-4"
                    />
                </div>
              </form>
              <div className='text-center'>
                <p>
                  Already have an account ?{" "}
                  <Link to="/signin" className="register-login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
