import { NavLink, Outlet } from "react-router-dom";

export function LayoutComponent() {
  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
        <NavLink to="/home/kk">Detail anime page</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
