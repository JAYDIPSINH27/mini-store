import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/forgotPassword.css";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import forgotImage from "../assets/forgot.png";

axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);

  const history = new useHistory();
  const cookies = new Cookies();

  const submitButton = async (event) => {
    event.preventDefault();
    await axios
      .post("/auth/forgot-password", {
        email: email,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        }
        if (res.data.message) {
          toast.info("Change password using link sent in your email");
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
        <div className="forgot-password-maindiv">
          <ToastContainer />
          <h1 className="forgot-password-heading text-center mt-10">
            FORGOT PASSWORD
          </h1>
          <div className="forgot-password-innerdiv">
            <div className="forgot-password-image">
              <img src={forgotImage} width="300"></img>
            </div>
            <form onSubmit={submitButton}>
              <div className="form-group">
                <label>Email :</label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="button-div">
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  return 0;
};

export default ForgotPassword;
