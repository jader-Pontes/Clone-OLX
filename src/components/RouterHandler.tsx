import React from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';


type Props={
    children:React.ReactNode;
}


export const RouterHandler = (children:Props):any => {
    const navigate = useNavigate();
    const isAuth = true;
    if (isAuth) {
        return children;
    } else {
     return navigate("/signin");
    }
   
}