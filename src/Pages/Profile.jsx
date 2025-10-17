import React, { use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";
import Tanij from "../assets/tanij.jpeg";
import MyContainer from "../Components/MyContainer";

const Profile = () => {
  const { user, signOutUser } = use(AuthContext);
  const handleNotify = () => {
    toast.success("🎉 You’ll be notified when the profile is ready!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
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

  return (
    <div className="min-h-[calc(100vh-74px)] flex flex-col justify-center items-center bg-gradient-to-br from-purple-300 via-purple-500 to-purple-300 text-center">
      <MyContainer className="w-full">
        {user ? (
          <div className="w-full max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
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
          </div>
        ) : (
          // it is not visible actually
          <div>
            <h1 className="sm:text-5xl text-3xl font-bold text-white animate-bounce drop-shadow-lg">
              🚀 Profile is Coming Soon
            </h1>

            <p className="mt-5 text-lg text-white/90 animate-pulse">
              Stay tuned! We’re crafting something amazing for you ✨
            </p>

            <div className="mt-10">
              <button
                onClick={handleNotify}
                className="btn btn-outline btn-accent animate-[pulse_2s_infinite]"
              >
                Notify Me
              </button>
            </div>

            <div className="absolute bottom-6 text-white text-sm animate-pulse">
              Developed by <span className="font-bold">Tanij 💎</span>
            </div>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default Profile;
