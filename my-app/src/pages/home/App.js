import React, { useEffect, useState } from "react";
import {Route,Routes ,useNavigate } from "react-router-dom";
import Main from "../login/Main";
import Main1 from "../router/Main1";
import { apiLoggedInInstances } from "../getApi/axios";
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user,setUser] = useState({});
  return (
    <div>
      <button onClick={() => {
        navigate("/login")
      }}>
        Click
      </button>
      
    </div>
  )
}
export default App;