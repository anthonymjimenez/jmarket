import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav, NavbarBrand } from "react-bootstrap";
function Navbar() {
  return (
    <Nav className="m-3" variant="pills" defaultActiveKey="/home">
      <NavbarBrand>jHood</NavbarBrand>

      <Nav.Item>
        <Nav.Link>
          <Link to="/">Sign up</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/dash">
          <Link to="/dash">Dashboard</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/account">
          <Link to="/account">Account</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

// function Nav() {
//   return (
//     <>
//       <h2>jHood</h2>
//       <nav>
//         <Link to="/">
//           Sign Up
//         </Link>
//         <>  &#916;  </>

//         <Link to="/dash"> Dashboard </Link>
//       <>  &#916;  </>
//         <Link to="/account">Account </Link>
//       </nav>
//     </>
//   );

export default Navbar;
