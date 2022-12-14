import React, { useState } from "react";
import '../login.css';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    let navigate = useNavigate();

    const [signupemail, setsignupemail] = useState ("");
    const [signuppass, setsignuppass] = useState ("");
    const {signup, error, isLoading} = useSignup();

    const handleSignupEmailChange = (event) => {
        setsignupemail(event.currentTarget.value);
    };

    const handleSignupPassChange = (event) => {
        setsignuppass(event.currentTarget.value);
    };
    
    const handleSignup = async (e) => {

    e.preventDefault();

    await signup(signupemail, signuppass);

    }

    return (
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSignup}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span style={{ cursor: "pointer" }}  className="link-primary"
              onClick={() => {
                navigate("/login");
            }}>
              Log In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email"
                name="data"
                id="signupemail"
                onChange={handleSignupEmailChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                name="data"
                id="signuppass"
                onChange={handleSignupPassChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error ">{error}</div>}
            </div>
          </div>
        </form> 
      </div>
    )

}

export default Signup;