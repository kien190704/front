import { useNavigate } from "react-router-dom";
import Main1 from "../router/Main1";
import React, { useContext, useEffect, useState } from 'react';
import { apiLoggedInInstances } from "../getApi/axios";

const Homepage = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");
    useEffect(() => {
        apiLoggedInInstances({
            url: '/api/auth/user-info',
            method: "GET"
        }).then(response => {
            setUser(response.data);
            console.log(response);
        })
    },[]);
    return(
        <div>
            <button onClick={() => {
                navigate("/login")
            }}> user: {user.username} </button>
            <div>token : {token ? "da dang nhap" : "ch dang nhap"}</div>
        </div>
    )
}
export default Homepage;