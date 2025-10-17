import React, { use } from "react";
import { Link, NavLink } from "react-router";
import MyLink from "./MyLink";
import MyContainer from "./MyContainer";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      <MyLink to={`/`} className={`text-lg`}>
        Home
      </MyLink>
      <MyLink to={`/dashboard`} className={`text-lg`}>
        Dashboard
      </MyLink>
      {
        user && 
        <MyLink to={`/profile`} className={`text-lg`}>
          Profile
        </MyLink>
      }
    </>
  );
  const handleSignOut = () => {
    signOutUser()
     .then(() => {
        toast.success("Sign Out");
     })
     .catch(error => {
        console.log(error.message);
        toast.error(error.message);
     })
  }
  return (
    <div className="bg-gradient-to-br to-indigo-400 shadow-sm">
      <MyContainer>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link to={`/`} className="text-xl font-bold">
              <span className="sm:inline hidden">Firebase Figter</span>
              <span className="sm:hidden inline">Figter</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div>
                <a onClick={handleSignOut} className="btn">Sign Out</a>
                <Link to={`/signUp`} className="btn ml-2">Sign Up</Link>
              </div>
            ) : (
              <Link to={"/signIn"} className="btn">Sign In</Link>
            )}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Header;
