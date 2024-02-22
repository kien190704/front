import React, { useEffect, useState } from "react";
import style from "./Main.module.css";
import apiInstance, { apiLoggedInInstances } from "../getApi/axios";
import { useLocation, useNavigate } from "react-router-dom";
import TopImage from "../login/top.jpg";
import BotImage from "../login/bot.jpg";

const Main =() => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const params = useLocation();

    const handelLogin = () => {
        apiInstance({
            url: "/api/auth/login",
            method: "POST",
            params: {
                username: userName,
                password: password
            }
        }).then(response => {
            const responseData = response.data
            const { token, userId } = responseData;
            localStorage.setItem("token", token);
            localStorage.setItem("userID", userId);
            console.log(responseData);
            navigate("/");
        }); 
    };

    return (
        <div className={style.container}>
            <div className={style.log}>
                <div className={style.word}>Đăng nhập</div>
                <div className={style.inputContainer}>
                    <div>Tài khoản</div>
                    <input
                        className={style.inputBox}
                        value={userName}
                        onChange={(event) => {
                            const value = event.target.value;
                            setUserName(value);
                        }}
                        placeholder="Tài khoản"></input>
                </div>
                <div>
                    <div>Mật khẩu</div>
                    <input
                        value={password}
                        onChange={(event) => {
                            const value = event.target.value;
                            setPassword(value);
                        }}
                        type="password"
                        placeholder="Mật khẩu"></input>
                </div>
                <button className={style.loginBox} onClick={() =>handelLogin()}>Đăng nhập</button>
            </div>
            <div className={style.picContainer}>
                <img className={style.topPic} src={TopImage} alt=""></img>
                <img className={style.botPic} src={BotImage} alt=""></img>
            </div>
        </div>
    )
}
export default Main;