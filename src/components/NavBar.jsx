import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./NavBar.css";

function NavBar() {
    const { auth, setAuth } = useAuth();
  
    const handleLogout = () => {
      window.localStorage.removeItem("token");
      setAuth({ token: null });
    };
  
    return (
      <header>
        <div>
          <img src="/logo1.png" alt="Logo" />
          <nav className="nav-links">
            <Link to="/">Home</Link>
            {auth.token ? (
              <>
                <Link to="/" onClick={handleLogout}>
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/createaccount">Create Account</Link>
              </>
            )}
            <Link to="/pledges">Pledges</Link>
            <Link to="/about">About</Link>
          </nav>
          <Outlet />
        </div>
      </header>
    );
  }
  
  export default NavBar;




