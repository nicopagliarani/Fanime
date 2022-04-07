import { NavLink, Outlet } from "react-router-dom";

export function LayoutComponent() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
