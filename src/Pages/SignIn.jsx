import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import MyContainer from "../Components/MyContainer";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Tanij from "../assets/tanij.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { user, signInUser, signOutUser, googleSignUser } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log({email, password, signUpUser});
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign  In successFully");
        navigate(location.state);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };
  const handleSignInWithGoogle = () => {
    googleSignUser()
      .then((result) => {
        console.log(result.user);
        toast.success("Google SignIn successfull.");
        navigate(location.state);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="min-h-[calc(100vh-74px)] py-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      <MyContainer>
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 items-center justify-between w-full text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="sm:text-4xl text-3xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            {user ? (
              <div className="text-center space-y-3">
                <img
                  src={user?.photoURL || Tanij}
                  className="h-20 w-20 rounded-full mx-auto"
                  alt=""
                />
                <h2 className="text-xl font-semibold">
                  {user?.displayName || "Tanij Roy"}
                </h2>
                <p className="text-white/80">{user?.email}</p>
                <button onClick={handleSignOut} className="my-btn">
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                  Sign In
                </h2>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type={showPass? "text": "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer absolute z-10 top-9 right-2.5"
                  >
                    {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </span>
                </div>

                <button type="submit" className="my-btn">
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-white/30"></div>
                  <span className="text-sm text-white/70">or</span>
                  <div className="h-px w-16 bg-white/30"></div>
                </div>

                {/* Google Signin */}
                <button
                  onClick={handleSignInWithGoogle}
                  type="button"
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <p className="text-center text-sm text-white/80 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signUp"
                    className="text-pink-300 hover:text-white underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignIn;
