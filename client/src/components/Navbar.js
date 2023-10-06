import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useUser } from "./UserContext"; 



function CollapsibleExample() {

  const { setUser } = useUser(); 

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }

let id = localStorage.getItem("id")

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >
          <Link to="/" class="list">Destination App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">
            <Link to="/destinations" class="list">Destinations
          </Link>
            </Nav.Link>
            <Nav.Link href="#pricing">
            <Link to="/reviews" class="list">Reviews
          </Link>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          
          <Nav>
          <Nav.Link>
            <Link to="/sign-up" class="list">
            
               SignUp
          </Link>
            </Nav.Link>
            <Nav.Link>
            <Link to="/sign-in" class="list">
            
               Login
          </Link>
            </Nav.Link>
            <Nav.Link eventKey={2} >
            <Link to="/logout" class="list">
            {id != null && (
         <button onClick={(e) => handleLogoutClick(e)}>Logout</button>

        )}
          </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;