import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { apiLoggedInInstances } from "../../getApi/axios";

import { DemoModal } from "../../layout/Modal1";
const Demo = () => {
    const [paginatedData, setPaginatedData] = useState([]);
    const [totalPage, settotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]); // luu data
    const [pageSize, setPageSize] = useState(10); // stt
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [editField, setEditField] = useState();
    const [find, setFind] = useState({
        code: "",
        name: ""
    });

    const handleCreate = () => {
        apiLoggedInInstances({
            url: "/api/field",
            method: "POST",
            params: {
                code: code,
                name: name
            }
        }).then((res) => {
            if (res.data) {
                getData();
                handleClose();
            }
        })
    }
    const handelDelete = (fieldID) => {
        apiLoggedInInstances({
            url: "/api/field/" + fieldID,
            method: "DELETE"
        }).then(res => {
            if (res.status === 200) {
                getData();
            }
        })
    }
    const handleUpdate = (fieldID) => {
        if (!editField) return;
        apiLoggedInInstances({
            url: "/api/field/" + fieldID,
            method: "PUT",
            params: {
                code: editField.code,
                name: editField.name
            }
        }).then(() => {
            getData()
            setEditField(null);
            handleClose();
        })
    }
    const handleClose = () => {
        setCode("");
        setName("");
        setShowModal(false);
    }
    const handelFind = () =>{
        apiLoggedInInstances({
            url: "/api/field",
            method: "GET",
        }).then(response => {
            let foundData = response.data;
       
            foundData =foundData.filter(item => {
                return item.code.includes(find.code) && item.name.includes(find.name)})
     
        setData(foundData);
        })
    }
    const handleResetFind = () =>{
        setFind({
            code:"",
            name: ""
        })
        getData()
    }
    const getData = () => {
        apiLoggedInInstances({
            url: "/api/field",
            method: "GET",
        }).then(response => {
            const responseData = response.data;
            const calTotalPage = Math.ceil(responseData.length / pageSize);
            settotalPage(calTotalPage);
            setData(responseData);
        })
    }
    // lay dl tu api lan dau va khi pagesize thay doi
    useEffect(() => {
        getData();
    }, [pageSize]);
    useEffect(() => {
        // 1-10
        //10-20
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        const paginatedData = sortedData.slice(((currentPage - 1) * pageSize), currentPage * pageSize);
        setPaginatedData(paginatedData);
    }, [data, currentPage, pageSize])
    return (
        <div>
            <div className="grid grid-cols-2">
                <div>nganh nghe ({data.length})</div>
                <div>
                    <button className="bg-blue-700 text-white justify-items-end grid" onClick={
                        () => setShowModal(true)
                    }>+ Thêm ngành nghề </button>
                </div>
            </div>
            <div>
                <table className="w-full  ">
                    <thead className="text-center">
                        <tr>
                            <td className="border border-3">STT</td>
                            <td className="border border-3 w-{2px}">(*)</td>
                            <td className="border border-3">MA NGANH NGHE</td>
                            <td className="border border-3">TEN</td>
                        </tr>
                        <tr>
                            <td className="border border-3">
                                <button onClick={() => {
                                    handleResetFind()
                                }}>
                                    clear
                                </button>
                            </td>
                            <td className="border border-3">
                                <button onClick={() => handelFind()}>
                                    tim kiem
                                </button></td>
                            <td className="border border-3">
                                <input value={find.code} onChange={(event) => {
                                    setFind(pre => ({ ...pre, code: event.target.value }))
                                }}>
                                </input>
                            </td>
                            <td className="border border-3">
                                <input value={find.name} onChange={(event) => {
                                    setFind(pre => ({ ...pre, name: event.target.value }))
                                }}>
                                </input>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={4}>ko co du lieu</td>
                            </tr>
                        )}
                        {paginatedData.map((field, index) => (
                            <tr>
                                <td className="border border-3 text-center">{((currentPage - 1) * pageSize) + index + 1}</td>
                                <td className="border border-3"><ButtonAction item={field} onDelete={handelDelete} clickUpdate={() => {
                                    setEditField(field)
                                    setShowModal(true)
                                }}></ButtonAction></td>
                                <td className="border border-3">{field.code}</td>
                                <td className="border border-3">{field.name}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="text-center ">
                            <td colSpan={4}>
                                <button
                                    onClick={() => {
                                        if (currentPage === 1) return;
                                        setCurrentPage(currentPage - 1)
                                    }}>
                                    {"<"}
                                </button>
                                {[...Array(totalPage)].map((_, index) => (
                                    <button

                                        onClick={() => setCurrentPage(index + 1)}
                                        style={{
                                            color: "blue",
                                            width: 20,
                                            height: 20,
                                            alignContent: "center",
                                            paddingTop: 0,
                                            paddingBottom: 25,
                                            paddingRight: 20,
                                            paddingLeft: 10,
                                            border: `${currentPage === index + 1 ? "1px solid blue" : "transparent"}`,
                                        }}>
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        if (currentPage === totalPage) return;
                                        setCurrentPage(currentPage + 1)
                                    }}>
                                    {">"}
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {showModal && (
                    <DemoModal title={editField ? "chinh sua nganh nghe" : "them moi nganh nghe"} onClose={handleClose}>
                        {editField ? ( // sua doi
                            <div className="grid grid-cols-2 grid-rows-2">
                                <div>
                                    <div className="m-2">Mã ngành nghề</div>
                                    <input
                                        style={{
                                            width: 500
                                        }}
                                        value={editField.code}
                                        className="border border-1 m-1 px-11 "
                                        onChange={(e) => {
                                            setEditField(pre => ({ ...pre, code: e.target.value }))
                                        }} placeholder="Nhập mã" />
                                </div>
                                <div>
                                    <div className="m-2">
                                        Ngành nghề
                                    </div>
                                    <input
                                        style={{
                                            width: 500
                                        }}
                                        className="border border-1 m-1 px-11"
                                        value={editField.name} onChange={(e) => {
                                            setEditField(pre => ({ ...pre, name: e.target.value }))
                                        }} placeholder="Nhập ngành nghề " />
                                </div>

                                <div className="col-start-2 justify-items-end grid grid-rows-1 ">
                                    <button
                                        onClick={() => handleClose()}
                                        className="">
                                        Hủy
                                    </button>
                                    <button
                                        className="text-white bg-blue-700 drop-shadow-md rounded h-7 m-2 "
                                        onClick={() => {
                                            handleUpdate(editField.id)
                                        }}>{"sua"}
                                    </button>
                                </div>
                            </div>
                        ) : ( // ko sua doi 
                            <div className="grid grid-cols-2 grid-rows-2">
                                <div>
                                    <div className="m-2">Mã ngành nghề</div>
                                    <input
                                        style={{
                                            width: 500
                                        }}
                                        value={code}
                                        className="border border-1 m-1 px-11 "
                                        onChange={(e) => {
                                            setCode(e.target.value)
                                        }} placeholder="Nhập mã" />
                                </div>
                                <div>
                                    <div className="m-2">
                                        Ngành nghề
                                    </div>
                                    <input
                                        style={{
                                            width: 500
                                        }}
                                        className="border border-1 m-1 px-11"
                                        value={name} onChange={(e) => {
                                            setName(e.target.value)
                                        }} placeholder="Nhập ngành nghề " />
                                </div>

                                <div className="col-start-2 justify-items-end grid grid-rows-1 ">
                                    <button
                                        onClick={() => handleClose()}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="text-white bg-blue-700 drop-shadow-md rounded h-7 m-2 "
                                        onClick={() => {
                                            handleCreate()
                                        }}>{"them"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </DemoModal>
                )}
            </div>
        </div>
    )

}

const ButtonAction = ({ item, onDelete, clickUpdate }) => {
    const buttonref = useRef();
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        if (buttonref.current && !buttonref.current.contains(event.target)) {
            setOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClick)
    }, [])
    return (
        <>
            <div className="relative"
                ref={buttonref}
            >
                <button onClick={() => setOpen(!open)}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="2.25" stroke="#98BEE1" stroke-width="1.5" />
                        <g clip-path="url(#clip0_11_6764)">
                            <path d="M16 18.25C17.2426 18.25 18.25 17.2426 18.25 16C18.25 14.7574 17.2426 13.75 16 13.75C14.7574 13.75 13.75 14.7574 13.75 16C13.75 17.2426 14.7574 18.25 16 18.25Z" stroke="#98BEE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21.55 18.25C21.4502 18.4762 21.4204 18.7271 21.4645 18.9704C21.5086 19.2137 21.6246 19.4382 21.7975 19.615L21.8425 19.66C21.982 19.7993 22.0926 19.9647 22.1681 20.1468C22.2436 20.3289 22.2824 20.5241 22.2824 20.7213C22.2824 20.9184 22.2436 21.1136 22.1681 21.2957C22.0926 21.4778 21.982 21.6432 21.8425 21.7825C21.7032 21.922 21.5378 22.0326 21.3557 22.1081C21.1736 22.1836 20.9784 22.2224 20.7812 22.2224C20.5841 22.2224 20.3889 22.1836 20.2068 22.1081C20.0247 22.0326 19.8593 21.922 19.72 21.7825L19.675 21.7375C19.4982 21.5646 19.2737 21.4486 19.0304 21.4045C18.7871 21.3604 18.5362 21.3902 18.31 21.49C18.0882 21.5851 17.899 21.7429 17.7657 21.9442C17.6325 22.1454 17.561 22.3812 17.56 22.6225V22.75C17.56 23.1478 17.402 23.5294 17.1207 23.8107C16.8394 24.092 16.4578 24.25 16.06 24.25C15.6622 24.25 15.2806 24.092 14.9993 23.8107C14.718 23.5294 14.56 23.1478 14.56 22.75V22.6825C14.5542 22.4343 14.4738 22.1935 14.3294 21.9915C14.1849 21.7896 13.9831 21.6357 13.75 21.55C13.5238 21.4502 13.2729 21.4204 13.0296 21.4645C12.7863 21.5086 12.5618 21.6246 12.385 21.7975L12.34 21.8425C12.2007 21.982 12.0353 22.0926 11.8532 22.1681C11.6711 22.2436 11.4759 22.2824 11.2787 22.2824C11.0816 22.2824 10.8864 22.2436 10.7043 22.1681C10.5222 22.0926 10.3568 21.982 10.2175 21.8425C10.078 21.7032 9.9674 21.5378 9.89191 21.3557C9.81642 21.1736 9.77757 20.9784 9.77757 20.7812C9.77757 20.5841 9.81642 20.3889 9.89191 20.2068C9.9674 20.0247 10.078 19.8593 10.2175 19.72L10.2625 19.675C10.4354 19.4982 10.5514 19.2737 10.5955 19.0304C10.6396 18.7871 10.6098 18.5362 10.51 18.31C10.4149 18.0882 10.2571 17.899 10.0558 17.7657C9.85463 17.6325 9.61884 17.561 9.3775 17.56H9.25C8.85218 17.56 8.47064 17.402 8.18934 17.1207C7.90804 16.8394 7.75 16.4578 7.75 16.06C7.75 15.6622 7.90804 15.2806 8.18934 14.9993C8.47064 14.718 8.85218 14.56 9.25 14.56H9.3175C9.56575 14.5542 9.8065 14.4738 10.0085 14.3294C10.2104 14.1849 10.3643 13.9831 10.45 13.75C10.5498 13.5238 10.5796 13.2729 10.5355 13.0296C10.4914 12.7863 10.3754 12.5618 10.2025 12.385L10.1575 12.34C10.018 12.2007 9.9074 12.0353 9.83191 11.8532C9.75642 11.6711 9.71757 11.4759 9.71757 11.2787C9.71757 11.0816 9.75642 10.8864 9.83191 10.7043C9.9074 10.5222 10.018 10.3568 10.1575 10.2175C10.2968 10.078 10.4622 9.9674 10.6443 9.89191C10.8264 9.81642 11.0216 9.77757 11.2188 9.77757C11.4159 9.77757 11.6111 9.81642 11.7932 9.89191C11.9753 9.9674 12.1407 10.078 12.28 10.2175L12.325 10.2625C12.5018 10.4354 12.7263 10.5514 12.9696 10.5955C13.2129 10.6396 13.4638 10.6098 13.69 10.51H13.75C13.9718 10.4149 14.161 10.2571 14.2943 10.0558C14.4275 9.85463 14.499 9.61884 14.5 9.3775V9.25C14.5 8.85218 14.658 8.47064 14.9393 8.18934C15.2206 7.90804 15.6022 7.75 16 7.75C16.3978 7.75 16.7794 7.90804 17.0607 8.18934C17.342 8.47064 17.5 8.85218 17.5 9.25V9.3175C17.501 9.55884 17.5725 9.79463 17.7057 9.99585C17.839 10.1971 18.0282 10.3549 18.25 10.45C18.4762 10.5498 18.7271 10.5796 18.9704 10.5355C19.2137 10.4914 19.4382 10.3754 19.615 10.2025L19.66 10.1575C19.7993 10.018 19.9647 9.9074 20.1468 9.83191C20.3289 9.75642 20.5241 9.71757 20.7213 9.71757C20.9184 9.71757 21.1136 9.75642 21.2957 9.83191C21.4778 9.9074 21.6432 10.018 21.7825 10.1575C21.922 10.2968 22.0326 10.4622 22.1081 10.6443C22.1836 10.8264 22.2224 11.0216 22.2224 11.2188C22.2224 11.4159 22.1836 11.6111 22.1081 11.7932C22.0326 11.9753 21.922 12.1407 21.7825 12.28L21.7375 12.325C21.5646 12.5018 21.4486 12.7263 21.4045 12.9696C21.3604 13.2129 21.3902 13.4638 21.49 13.69V13.75C21.5851 13.9718 21.7429 14.161 21.9442 14.2943C22.1454 14.4275 22.3812 14.499 22.6225 14.5H22.75C23.1478 14.5 23.5294 14.658 23.8107 14.9393C24.092 15.2206 24.25 15.6022 24.25 16C24.25 16.3978 24.092 16.7794 23.8107 17.0607C23.5294 17.342 23.1478 17.5 22.75 17.5H22.6825C22.4412 17.501 22.2054 17.5725 22.0042 17.7057C21.8029 17.839 21.6451 18.0282 21.55 18.25V18.25Z" stroke="#98BEE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_11_6764">
                                <rect width="18" height="18" fill="white" transform="translate(7 7)" />
                            </clipPath>
                        </defs>
                    </svg>


                </button>
                {open && (
                    <div
                        style={{
                            backgroundColor: "white",
                            zIndex: 1
                        }}
                        className="absolute">
                        <div
                            onClick={
                                clickUpdate
                            }
                        >sua</div>
                        <div onClick={() => {
                            onDelete(item.id)
                            setOpen(false)
                        }}>xoa</div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Demo;