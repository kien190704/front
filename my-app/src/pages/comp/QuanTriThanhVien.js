import React, { useEffect, useState } from "react";
import { apiLoggedInInstances } from "../getApi/axios";
const QuanTriThanhVien = () => {
    const [data, setData] =useState([]); // luu data
    const [pageIndex,setPageIndex] = useState(0);
    const[pageSize,setPageSize] = useState(10);
    const[totalPage,setTotalPage] = useState(1);

    useEffect(() => {
        apiLoggedInInstances( {
            url: "/api/admin/user",
            method: "GET",
            params: {
                page_index:pageIndex,
                page_size:pageSize
            }
        }).then(respone => {
            const {data: userData, headers} = respone 
            setData(userData);
            //tong so trang 
            const {totalElement} = headers;
            setTotalPage(Math.ceil(totalElement/pageSize))
        })
    },[pageIndex,pageSize])
    return (
        <div>
            
            <div>
                <button
                onClick={() => {

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
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {data.map((user,index) =>(
                            <tr>
                                <td>{index +1}</td>
                                <td></td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.gender}</td>
                                <td>{user.birthday}</td>
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
            </div>
        </div>
    )
}
export default QuanTriThanhVien;