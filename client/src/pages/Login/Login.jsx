import './login.css';
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleNavigate = (eventKey) => {
    navigate(eventKey);
}
  const handleLogin = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
        handleNavigate("/")
    };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
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
                placeholder="Password"
                required
                ref={password}
                type="password"
                minLength="6"
                className="loginInput item2"
              />
            </div>
            <b className="forgotPassword">Forgot your password?</b>
            <button className="loginButton" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login