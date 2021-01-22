import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <h2>jHood</h2>
      <nav>
        <Link to="/">
          Sign Up
        </Link>
        <>  &#916;  </>

        <Link to="/dash"> Dashboard </Link>
      <>  &#916;  </>
        <Link to="/account">Account </Link>
      </nav>
    </>
  );
}

export default Nav;
