import React from "react";
import style from "./layout.module.css"
function LayOut() {
    return (
        <div className={style.container}>
            <div className={style.sideBar}>
                <div>imgae</div>
                <div className={style.sidecontent}>
                    <div>quan tri thanh vien</div>
                    <div>danh muc</div>
                    <div>do an</div>
                    <div>to chuc</div>
                </div>
            </div>
            <div className={style.main}>
                <div className={style.header}>
                    Truong dai hoc A
                </div>
                <div className={style.subheader}>
                    To chuc
                </div>
                <div className={style.content}>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
export default LayOut;