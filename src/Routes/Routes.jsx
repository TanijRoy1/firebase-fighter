import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import SignIn from "../Pages/SignIn";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "signIn",
                Component: SignIn
            },
            {
                path: "signUp",
                Component: SignUp
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
        ]
    }
])

export default router;