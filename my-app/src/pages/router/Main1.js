import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../login/Main";
import LayOut from "../layout/LayOut";
import Homepage from "../home/Homepage";
import QuanTriThanhVien from "../comp/QuanTriThanhVien";
import ToChuc from "../comp/ToChuc";
import DoAn from "../comp/DoAn";
import Error from "../404/Error";
import Demo from "../danhmuc/nganhnghe/Demo";
import Khoa from "../danhmuc/nganhnghe/Khoa";
import Lop from "../danhmuc/nganhnghe/Lop";
function Main1() {
    return (
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Error />} />
                        <Route path="/login" element={<Main />} />
                        <Route path="/" element={<LayOut />}>
                            <Route path="/home" element={<Homepage />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/khoa" element={<Khoa />} />
                            <Route path="/lop" element={<Lop />} />
                            <Route path="/quantri" element={<QuanTriThanhVien />} />
                            <Route path="/doan" element={<DoAn />} />
                            <Route path="/tochuc" element={<ToChuc />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
    )
}
export default Main1;