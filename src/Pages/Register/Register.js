import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {auth} from "../../Firebase/App";

import "../Login/Login.scss";

function Login() {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleData = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({...prev, [name]: value}));
  };
  let navigate = useNavigate();
  const handleRegister = () => {
    setStatus(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("User Created Successfully");
        navigate("/login");
      })
      .catch((error) => {
        setStatus(false);
        const errorMessage = error.message;
        console.log(errorMessage, "error message");
      });
  };

  // Handel Google Login

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    console.log("Calling");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(email);
      });
  };
  return (
    <>
      <div className="loginContainer">
        <div className="loginWrapper">
          <div className="userImg">
            <div className="circlContainer">
              <div className="circle1" />
              <div className="circle2" />
            </div>
            <div className="userImgItem img1">
              <img
                className="img"
                src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="userImgItem img2">
              <img
                className="img"
                src="https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="userImgItem img3">
              <img
                className="img"
                src="https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="userImgItem img4">
              <img
                className="img"
                src="https://images.pexels.com/photos/1578531/pexels-photo-1578531.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
          </div>
          <div className="loginBx">
            <div className="loginContainer">
              <span className="loginTxt">
                <h2>Create account </h2>
              </span>
              <div className="emailBx">
                <span className="inputTxt">E-mail</span>
                <div className="emailBxItm">
                  <input
                    className="loginInput"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleData}
                  />
                </div>
                <span className="inputTxt">Password</span>
                <div className="emailBxItm">
                  <input
                    className="loginInput"
                    type="text"
                    placeholder="Password"
                    name="password"
                    onChange={handleData}
                  />
                </div>
              </div>
              <button onClick={handleRegister} className="loginBtn">
                {status ? "Loading" : "Register"}
              </button>
              <span className="mdlTxt">Easy Register with</span>
              <div className="otherOption">
                <button className="btn" onClick={handleGoogleLogin}>
                  Google
                </button>
                <button className="btn">Facebook</button>
              </div>
              <div className="crateAccount">
                <span className="crateAccountItem">
                  Already have a account?
                  <NavLink to="/login">
                    <span className="blue">Login</span>
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
