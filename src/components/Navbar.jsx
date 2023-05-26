import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <Link>
        <img src={Logo} alt="" width="50" />
      </Link>
      <div className="d-flex">
        <Link id="item" className="btn btn-dark mr-2" to="/Inicio">
          Inicio
        </Link>
        <Link id="item" className="btn btn-dark mr-2" to="/Login">
          Login
        </Link>
        <Link id="item" className="btn btn-dark mr-2" to="/Servicio">
          Servicio
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
