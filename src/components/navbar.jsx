import React, { useState } from "react";
import "../stylesheets/navbar.css";
import logo from "../img/Logo.png";

function Navbar() {
  const [navLinksVisible, setNavLinksVisible] = useState(false);

  const toggleNavLinks = () => {
    setNavLinksVisible(!navLinksVisible);
  };

  return (
    <nav className="navigation">
      <div className="nav nav-left">
        <div className="brand">
          <img src={logo} alt="" className="brand-logo" />
          <h1 className="brand-name">Art<span>Pixelizer</span></h1>
        </div>
        <ul className={`nav-links ${navLinksVisible ? 'visible' : ''}`}>
          <li className="nav-item">
            <a href="" className="nav-link"><i class="fa-solid fa-images"></i> <span>Gallery</span></a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link"><i class="fa-solid fa-folder"></i> <span>My Designs</span></a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-button"><span>Create Sprite</span> <i class="fa-solid fa-plus"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
