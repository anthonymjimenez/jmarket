import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Nav() {
  
  return (
    <>
    <h2>jHood</h2>
    <nav>
        <ul>
          <li>
            <Link to="/">Sign In /</Link>
          </li>
          <li>
              <Link to ='/dash'> Dashboard /</Link>
          </li>
          <li>
            <Link to ='/account'>Account</Link>
          </li>
        </ul>
    </nav>
    </>
  );
}

export default Nav;
