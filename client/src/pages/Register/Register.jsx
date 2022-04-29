import './register.css'
import { useNavigate } from "react-router";
import axios from "axios";
import { useRef, useState } from "react";

function Register() {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const passwordAgain = useRef(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (passwordAgain.current.value != password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={() =>handleRegister()}>
            <div className="grid-container">
              <label className="inputLabel item1">Username:</label>
              <input
                placeholder="Your username"
                required
                ref={username}
                type="text"
                className="loginInput item2"
              />
            </div>
            <div className="grid-container">
              <label className="inputLabel item1">Email:</label>
              <input
                placeholder="putindesnat@gmail.com"
                required
                ref={email}
                type="email"
                className="loginInput item2"
              />
            </div>
            <div className="grid-container">
              <label className="inputLabel item1">Password:</label>
              <input
                placeholder="******"
                required
                ref={password}
                type="password"
                minLength="6"
                className="loginInput item2"
              />
            </div>
            <div className="grid-container">
              <label className="inputLabel item1">Confirm Password:</label>
              <input
                placeholder="******"
                required
                ref={passwordAgain}
                type="password"
                minLength="6"
                className="loginInput item2"
              />
            </div>
            <b className="forgotPassword">Forgot your password?</b>
            <button className="loginButton" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register;