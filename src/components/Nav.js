import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Nav({user}) {
  
  return (
    <nav>
        <ul>
          <li>
            <Link to="/">Sign In</Link>
          </li>
          <li>
              <Link to ='/dash'>Dashboard</Link>
          </li>
          
        </ul>
    </nav>

  );
}

export default Nav;
