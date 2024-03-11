import React, { useState } from "react";
import style from "./layout.module.css"
import { Link, Outlet, useLocation } from "react-router-dom";
function LayOut() {
    const menus = [
        {
            path: "/quantri",
            name: "Quản trị thành viên",
          
        },
        {
            path: "/doan",
            name: "Danh mục",
            child: [
                {
                    path: "/demo",
                    name: "Ngành nghề"
                },
                {
                    path: "/khoa",
                    name: "Khóa"
                },
                {
                    path: "/lop",
                    name: "Lớp"
                }
            ]
        },
        {
            path: "/doan",
            name: "Đồ án",
            child: [
                {
                    path: "/demo",
                    name: "chưa biết"
                }
            ]
        },
        {
            path: "/tochuc",
            name: "Tổ chức",

        },
    ]
    return (
        <div className={style.container}>
            <div className={style.sideBar}>
                <div>image</div>
                <div className={style.sidecontent}>
                    {
                        menus.map((menu, index) => (
                            <MenuItem path={menu.path} name={menu.name} child={menu.child} key={index}/>
                        ))
                    }
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
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

const MenuItem = ({ path, name, child }) => {
    const [open, setOpen] = useState(false);
    const {pathname} = useLocation();
    if (!child) {
        return(
        <Link to={path} >
            <div className={pathname === path ? style.active : null}> {name}</div>
        </Link>
        )
    }
    return (
        <div>
            <div onClick={() => {
                setOpen(!open);
            }}
            >{name}
            </div>
            {open && child.map((item, index) => (
            <Link to={item.path} key={index} >
                <div className={pathname === item.path ? style.active : null}> {item.name}</div>
            </Link>
            ))}
        </div>
    )
}
export default LayOut;