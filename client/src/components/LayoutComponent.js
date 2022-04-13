import { NavLink, Outlet } from "react-router-dom";
import "../Css/LayoutComponent.css";

export function LayoutComponent() {
  return (
    <div>
      <nav className="nav">
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/signup">
          SignUp
        </NavLink>
        <NavLink className="nav-link" to="/showfavoriteAnimes">
          Favorites
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
