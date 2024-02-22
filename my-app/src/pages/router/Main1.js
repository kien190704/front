import React from "react";
import {BrowserRouter, Route,Routes } from "react-router-dom";
import Main from "../login/Main";
import LayOut from "../layout/LayOut";
import Homepage from "../home/Homepage";
function Main1() {
    return (
        <div>
            <Routes>
                <Route path="/" element = {<Homepage/>}></Route>
                <Route path="/login" element ={<Main/>}></Route>
                <Route path="/layout" element = {<LayOut/>}></Route>
            </Routes>
        </div>
    )
}
export default Main1;