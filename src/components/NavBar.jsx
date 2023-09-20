import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import { useState } from "react";
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
                <nav>
                    <Link to="/">Home</Link>
                    {auth.token ? (
                        <Link to="/" onClick={handleLogout}>
                            Log Out
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/createaccount">Create Account</Link>
                        </>
                    )}
                </nav>
                <nav>
                    <Link to="/about">About</Link>
                </nav>
                <Outlet />
            </div>
        </header>
    );
}

export default NavBar;

