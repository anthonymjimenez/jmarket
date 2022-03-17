import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav, NavbarBrand } from "react-bootstrap";
function Navbar() {
  return (
    <Nav className="m-3" variant="pills" defaultActiveKey="/home">
      <NavbarBrand>jHood</NavbarBrand>
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
