import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  async function demoLogin(){
    await dispatch(login('demolition@gmail.com','password')).then((history.push("/")))
  }

  return (
    <div id="login-page-container">
      <form onSubmit={handleSubmit} id="login-form">
      <h2>Log Into Your Account</h2>

        <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        {errors.email && <span className="errors">{errors.email[0]}</span>}

        <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        {errors.password && <span className="errors">{errors.password[0]}</span>}

        <button type="submit" id="login-button">Log In</button>
        <button onClick={()=>demoLogin()}>Demo User</button>
      </form>
      <div id="login-redirect-buttons-container">
        <button onClick={()=>history.push("/signup")}>Sign up</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
