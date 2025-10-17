import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);

    const location = useLocation();

    if(loading) {
        return <h1 className="text-center py-10 text-2xl font-bold">Loading...</h1>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to={`/signIn`}></Navigate>;
};

export default PrivateRoute;