import React from "react";
import {BrowserRouter, Route,Routes } from "react-router-dom";
import Main from "../login/Main";
import App from "../home/App"
import  { useEffect, useState } from "react";
import { apiLoggedInInstances } from "../getApi/axios";

function Main1() {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/login" element ={<Main/>}></Route>
                <Route path="/" element = {<App/>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Main1