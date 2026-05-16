import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <div>Loading.....</div>
    }
    if(user){
        return children
    }
    return (
        <Navigate to={"/login"}></Navigate>
    );
};

export default PrivateRoute;