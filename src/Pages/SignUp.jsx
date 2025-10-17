import React, { use, useState } from "react";
import { Link } from "react-router";
import MyContainer from "../Components/MyContainer";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const { signUpUser } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({email, password, signUpUser});

    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#^()\-_=+])[A-Za-z\d@$!%?&#^()\-_=+]{8,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    signUpUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("SignUp successFully");
      })
      .catch((e) => {
        console.log(e);
        // console.log(e.code);
        if (e.code === "auth/email-already-in-use") {
          toast.error(
            "User already exists in the database."
          );
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }

      });
  };
  return (
    <div className="min-h-[calc(100vh-74px)] py-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      <MyContainer>
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 items-center justify-between w-full text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="sm:text-4xl text-3xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <form onSubmit={handleSignUp} className="space-y-5">
              <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                Sign Up
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
                  type={showPass ? "text" : "password"}
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
                Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-white/30"></div>
                <span className="text-sm text-white/70">or</span>
                <div className="h-px w-16 bg-white/30"></div>
              </div>

              <p className="text-center text-sm text-white/80 mt-3">
                Already have an account?{" "}
                <Link
                  to="/signIn"
                  className="text-pink-300 hover:text-white underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
