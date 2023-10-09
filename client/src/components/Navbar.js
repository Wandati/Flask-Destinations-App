import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

function AppNavbar() {
  const { setUser } = useUser();
  const id = localStorage.getItem('id');

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem('id');
    window.location = '/';
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-white text-decoration-none">
            Destination App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/destinations" className="text-white text-decoration-none">
                Destinations
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/reviews" className="text-white text-decoration-none">
                Reviews
              </Link>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link>
              <Link to="/sign-up" className="text-white text-decoration-none">
                SignUp
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/sign-in" className="text-white text-decoration-none">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              {id != null && (
                <button onClick={(e) => handleLogoutClick(e)} className="btn btn-link text-white">
                  Logout
                </button>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
