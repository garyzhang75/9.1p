import React from "react";
import { Outlet, Link } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <Link className="nav-logo" to="/">DEV@Deakin</Link>
                </div>
                <div className="navbar-middle">
                    <input type="text" placeholder="Search..." className="search-bar" />
                </div>
                <div className="navbar-right">
                    <Link className="nav-link" to="/post">Post</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                </div>
            </nav>

            {/* Content below the navigation bar */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default NavigationBar;
