import React, { useEffect, useState } from "react";
import "./HeaderStyles.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

function Header() {
  const [{ user, apiKey, basket }, dispatch] = useStateValue();
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_USER",
    });
    localStorage.removeItem("user");
  };

  

  return (
    <div style={{ width: "100%" }} className="maxWidth">
      <Navbar
        collapseOnSelect
        style={{ zIndex: 5 }}
        className="parent header container"
        // collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <div className="container">
          <Navbar.Brand as={NavLink} to="/" className="brandName" >
            Hospital Management 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <div className="header__links">
              
                <Nav.Link as={NavLink} to="/doctors">
                  Doctor
                </Nav.Link>

                <Nav.Link as={NavLink} to="/medicines">
                  Medicine
                </Nav.Link>

                <Nav.Link as={NavLink} to="/patients">
                  Patient
                </Nav.Link>

                <Nav.Link as={NavLink} to="/dispensaries">
                  Dispensary
                </Nav.Link>

              {user === null ? (
                <Nav className="navbarLinks">
                  <Nav.Link as={NavLink} to="/user_registration">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/user_login">
                    Login
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav className="navbarLinks">
                 
                  <NavDropdown title={"User"}>
                    <NavDropdown.Item>
                      Logged in as: <br></br>
                      <strong>{user?.Name}</strong>
                    </NavDropdown.Item>
                    <NavDropdown.Item>{user?.Phone}</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
            </div>

          </Navbar.Collapse>
        </div>
      </Navbar>

   

    </div>
    
  );
}

export default Header;
