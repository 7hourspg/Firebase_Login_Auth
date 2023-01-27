import React from "react";
import {FaSearch} from "react-icons/fa";
import {MdPeopleAlt} from "react-icons/md";
import {TfiShoppingCartFull} from "react-icons/tfi";
import {auth} from "../../Firebase/App";
import {signOut} from "firebase/auth";
import {DataContext} from "../../Context/Context";
import "./Home.scss";

function Home() {
  let date = new Date().getFullYear();
  const {setGetEmail} = React.useContext(DataContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setGetEmail("");
        console.log("Logged Out Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <div className="headerItem">
          <div className="navOptions">
            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>Pages</li>
              <li>Lookbook</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="LogoIcon">
            <h2 className="logo">
              Lebaba <span className="dot">.</span>
            </h2>
          </div>
          <div className="navOptions">
            <div className="iconsList">
              <span className="icon">
                <FaSearch size={"18px"} />
              </span>
              <span onClick={handleLogout} className="icon">
                <MdPeopleAlt />
              </span>
              <span className="icon">
                <TfiShoppingCartFull />
              </span>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="contentBox">
            <div className="contentWrapper">
              <p className="discountTxt">up to 20% discount on </p>
              <h1 className="boldTxt">girl's fashion</h1>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                temporibus quod tenetur dolores neque illum
              </p>
              <button className="exploreBtn">EXPLORE NOW</button>
            </div>
          </div>
          <div className="imgBox">
            <img
              src="https://images.pexels.com/photos/4889486/pexels-photo-4889486.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="img"
            />
          </div>
        </div>
        <div className="footerContainer">
          <hr />
          <div className="footerList">
            <span className="footerItem">Disclaimer</span>
            <span className="footerItem">Term and Conditions</span>
            <span className="footerItem">Privacy Policy</span>
            <span className="footerItem">Copyright {date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
