import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  console.log("1");

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#ADD8E6", // Light blue background
        borderBottom: "2px solid #FFFFFF", // White border
      }}
      variant="light"
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            color: "#FFFFFF", // White text
            fontWeight: "bold",
          }}
        >
          ERP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              style={({ isActive }) =>
                isActive
                  ? { color: "#0000FF", fontWeight: "bold" } // Active link style
                  : { color: "#FFFFFF" }
              }
            >
              Home
            </Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  style={({ isActive }) =>
                    isActive
                      ? { color: "#0000FF", fontWeight: "bold" }
                      : { color: "#FFFFFF" }
                  }
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/settings"
                  style={({ isActive }) =>
                    isActive
                      ? { color: "#0000FF", fontWeight: "bold" }
                      : { color: "#FFFFFF" }
                  }
                >
                  Settings
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/logout"
                  style={({ isActive }) =>
                    isActive
                      ? { color: "#0000FF", fontWeight: "bold" }
                      : { color: "#FFFFFF" }
                  }
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                style={({ isActive }) =>
                  isActive
                    ? { color: "#0000FF", fontWeight: "bold" }
                    : { color: "#FFFFFF" }
                }
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
