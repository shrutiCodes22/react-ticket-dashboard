import React from "react";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute=({ children})=> {
    const user = JSON.parse(localStorage.getItem("user"));
    const location=useLocation();

    if(!user?.isLoggedIn){
        if(location.pathname === "/login" || location.pathname=== "/signup"){
            return children;
        }
        return <Navigate to="/login" replace />;

        }

        if(user?.isLoggedIn && (location.pathname === "/login" || location.pathname==="/signup")){
            return <Navigate to="/" replace />;
        }

        //Otherwise->allow access
        return children;
    };

    export default ProtectedRoute;
