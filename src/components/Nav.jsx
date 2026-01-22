import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="sticky-nav">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/roster">Roster</NavLink>
          </li>

          <li>
            <NavLink to="/schedule">Schedule</NavLink>
          </li>

          <li>
            <NavLink to="/news">News</NavLink>
          </li>

          <li>
            <NavLink to="/history">History</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
