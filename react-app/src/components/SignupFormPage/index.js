import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { getAllStoreDataThunk } from "../../store/store";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()

  const sessionUser = useSelector((state) => state.session.user);
  const allStore = useSelector((store) => store.store)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password));
    if (data) { // returns null if fine, so will not excecute
      setErrors(data)
      console.log(errors)
    } else {
      await dispatch(getAllStoreDataThunk())
    }

  };

  return (
    <div id="signup-page-main-container">
      <form onSubmit={handleSubmit} id="signup-form">
      <h2>Sign up for an account</h2>

        <div data-placeholder="my placeholder">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        {errors.email && errors.email.map((error, idx) => <span key={idx} className="errors">{error}</span> )}

        <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        {errors.password && errors.password.map((error, idx) => <span key={idx} className="errors">{error}</span> )}

        <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
        {errors.username && errors.username.map((error, idx) => <span key={idx} className="errors">{error}</span> )}

        {/* <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label> */}
        <button type="submit" id="signup-button">Sign Up</button>
      </form>
      <div id="signup-redirect-buttons-container">
        <button onClick={()=>history.push("/login")}>Login</button>
      </div>
    </div>
  );
}

export default SignupFormPage;
