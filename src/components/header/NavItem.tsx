import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import React from "react";

export const NavItem: React.FC<React.PropsWithChildren<NavLinkProps>> = ({ to, children, ...rest }) => {
    const location = useLocation();

    return (
        <li className="nav-item">
            <NavLink
                to={to}
                {...rest}
                className={({ isActive }) =>
                    `nav-link ${isActive && location.pathname === to ? "active" : ""}`
                }
                end
            >
                {children}
            </NavLink>
        </li>
    );
};
