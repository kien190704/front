import React, { useDeferredValue, useEffect, useState } from "react";
import { apiLoggedInInstances } from "../../pages/getApi/axios";
import { DemoModal } from "../../pages/layout/Modal1";
import { USER_TYPE } from "../../constants/userType";
import { Formik } from 'formik';
const QuanTriThanhVien = () => {
    const [data, setdata] = useState([]); // luu data
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [nganhnghe,setNganhNghe] = useState([]);

    //dong modal
    const onCloseModalSearch = () =>{
        setShowModal(false);
        if(step===2) {
            setStep(1);
        }
    }
    // filter
    const [filterData, setFilterData] = useState({
        address: null,
        birthday_start: null,
        birthday_end: null,
        email: null,
    })
    //form
    const [step, setStep] = useState(1) //1- hcon via tro, 2- nhap thong tin
    const [role, setRole] = useState(USER_TYPE.MANAGER);
    const searchUser = () => {
        apiLoggedInInstances({
            url: "/api/admin/user",
            method: "GET",
            params: {
                page_index: pageIndex,
                page_size: pageSize,
                ...filterData
            }
        }).then(respone => {
            const { data: userData, headers } = respone
            setdata(userData);
            //tong so trang 
            const { totalelement } = headers;
            setTotalPage(Math.ceil(totalelement / pageSize))
        })
    }
    useEffect(() =>{
        apiLoggedInInstances({
            url:"/api/field/",
        }).then(res =>{
            setNganhNghe(res.data)
        })
    })
    useEffect(() => {
        searchUser()
    }, [pageIndex, pageSize])
    return (
        <div>

            <div>
                <button
                    onClick={() => {
                        setShowModal(true)
                    }}>
                    them thanh vien
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th></th>
                            <th> So dt</th>
                            <th>email</th>
                            <th> dia chi</th>
                            <th> gioi tinh</th>
                            <th>ngay sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <button onClick={() => {
                                    searchUser();
                                }}>tim kiem</button>
                            </th>
                            <th></th>
                            <th><input type="text" placeholder="so dien thoai" onChange={(e) => {
                                setFilterData(pre => ({ ...pre, phone: e.target.value }))
                            }} /></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {data.map((user, index) => (
                            <tr>
                                <td className="border">{index + 1}</td>
                                <td className="border"></td>
                                <td className="border">{user.phone}</td>
                                <td className="border">{user.email}</td>
                                <td className="border">{user.address}</td>
                                <td className="border">{user.gender}</td>
                                <td className="border">{user.birthday}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td >
                                {[...Array(totalPage)].map((_, i) => (
                                    <button onClick={() => {
                                        setPageIndex(i)
                                    }} className='px-2 py-1 border'>{i + 1}</button>
                                ))}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {showModal && (
                    <DemoModal title="them thanh vien" onClose={() => {
                        onCloseModalSearch()
                    }}>
                        {step === 1 && (
                            <div className="w-full flex justify-between">
                                <div className="cursor-poiner" onClick={() => {
                                    setRole(USER_TYPE.MANAGER)
                                }}>
                                    <input type="radio" checked={role === USER_TYPE.MANAGER} name="role" value={USER_TYPE.MANAGER} />
                                    <span>quan ly</span>
                                </div>
                                <div onClick={() => {
                                    setRole(USER_TYPE.TEACHER)
                                }}>
                                    <input type="radio" checked={role === USER_TYPE.TEACHER} name="role" value={USER_TYPE.TEACHER} />
                                    <span>giao vien</span>
                                </div>
                                <div onClick={() => {
                                    setRole(USER_TYPE.STUDENT)
                                }}>
                                    <input type="radio" checked={role === USER_TYPE.STUDENT} name="role" value={USER_TYPE.STUDENT} />
                                    <span>hoc sinh</span>
                                </div>
                            </div>
                        )}
                        {/*nhap form */}
                        {step === 2 && (
                            <div>
                                <Formik
                                    initialValue={{
                                        address: "",
                                        avatar: "",
                                        birthday: "",
                                        classId: 0,
                                        courseId: 0,
                                        email: "",
                                        enabled: true,
                                        fieldId: 0,
                                        fullName: "",
                                        gender: 0,
                                        note: "",
                                        password: "",
                                        phone: "",
                                        studentCode: "",
                                        teacherType: true,
                                        type: "",
                                        username: ""
                                    }}>
                                    <div className="w-full flex justify-between">

                                        <div className="w-1/2">
                                            <div className="w-full">
                                                <div className="w-full">tai khoan</div>
                                                <input className="w-full px-2 py-1 border" placeholder="tai khoan"></input>
                                            </div>
                                            <div className="w-full">
                                                <div className="w-full">mat khau</div>
                                                <input className="w-full px-2 py-1 border" placeholder="mat khau"></input>
                                            </div>

                                        </div>
                                        {/*thong tin lien he */}
                                        <div className="w-1/2">
                                            avatar
                                        </div>
                                        <div className="w-1/2">
                                            <div className="w-full">
                                                <div className="w-full">ho va ten</div>
                                                <input className="w-full px-2 py-1 border" placeholder="tai khoan"></input>
                                            </div>
                                            <div className="w-full">
                                                <div className="w-full">ngay sinh</div>
                                                <input className="w-full px-2 py-1 border" placeholder="mat khau"></input>
                                            </div>
                                            <div className="w-full">
                                                <div className="w-full">Email</div>
                                                <input className="w-full px-2 py-1 border" placeholder="mat khau"></input>
                                            </div>

                                        </div>
                                        <div className="w-1/2">
                                            <div className="w-full">
                                                <div className="w-full">gioi tinh</div>
                                                <div>
                                                    <input name="gender" type="radio" value={0} /> <span>nam</span>
                                                    <input name="gender" type="radio" value={1} /> <span>nu</span>
                                                    <input name="gender" type="radio" value={2} /> <span>khac</span>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="w-full">so dien thoai</div>
                                                <input className="w-full px-2 py-1 border" placeholder="so dien thoai"></input>
                                            </div>
                                        </div>

                                        {/*dua vao role*/}
                                        {role === USER_TYPE.MANAGER && (
                                            <div>
                                                <div>
                                                    <div> hoc va lam viec tai</div>
                                                    <input placeholder="nhap thong tin" />
                                                </div>
                                                <div>
                                                    <div> ghi chu</div>
                                                    <textarea className="w-full" placeholder="nhap thong tin" />
                                                </div>
                                            </div>
                                        )}
                                        {role === USER_TYPE.TEACHER && (
                                            <div>
                                                <div>
                                                    <div> hinh thuc</div>
                                                    <select>
                                                        <option>co huu</option>
                                                        <option>thinh giang</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <div> chuyen nganh</div>
                                                    <select>
                                                        {nganhnghe.map((f,i) => (
                                                            <option value={f.id} key={f.id}>{f.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </Formik>
                            </div>

                        )}
                        <div className="flex justify-end items-center gap-2">
                            <button onClick={() =>{
                               onCloseModalSearch()
                            }}>huy</button>
                            {step === 1 ? (
                                <button onClick={() => {
                                    setStep(2);
                                }}>tiep tuc</button>
                            ) : (
                                <button>them</button>
                            )}

                        </div>
                    </DemoModal>
                )}
            </div>
        </div>
    )
}
export default QuanTriThanhVien;