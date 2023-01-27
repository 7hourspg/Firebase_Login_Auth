import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "./Login.scss";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import {auth} from "../../Firebase/App";
import {DataContext} from "../../Context/Context";

function Login() {
  const {setGetEmail} = React.useContext(DataContext);
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
  const hanldeLogin = () => {
    setStatus(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("email", user.reloadUserInfo.email);
        setGetEmail(user.reloadUserInfo.email);
        navigate("/");
      })
      .catch((error) => {
        setStatus(false);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Handle Google Login

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("email", user.reloadUserInfo.email);
        setGetEmail(user.reloadUserInfo.email);
        navigate("/");
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

  // Handle facebook Login

  const hanldeFbLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
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
                <h2>Login </h2>
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
              <button onClick={hanldeLogin} className="loginBtn">
                {status ? "Loading" : "Login"}
              </button>
              <span className="mdlTxt">Easy login with</span>
              <div className="otherOption">
                <button onClick={handleGoogleLogin} className="btn">
                  Google
                </button>
                <button onClick={hanldeFbLogin} className="btn">
                  Facebook
                </button>
              </div>
              <div className="crateAccount">
                <span className="crateAccountItem">
                  Don't have an account yet?
                  <NavLink to="/reg">
                    <span className="blue">Create an account</span>
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
