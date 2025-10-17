import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to, className, children}) => {
    return (
        <li>
            <NavLink to={to} className={({isActive})=> isActive ? `font-semibold border-b-2 border-blue-600 text-blue-600 ${className}` : `font-semibold border-b-2 border-indigo-300 ${className}`}>
                {children}
            </NavLink>
        </li>
    );
};

export default MyLink;