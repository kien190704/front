import React, { useEffect, useState } from "react";
import { apiLoggedInInstances } from "../getApi/axios";
const QuanTriThanhVien = () => {
    const [Data, setData] =useState([]); // luu Data
    const [PageIndex,setPageIndex] = useState(0);
    const[PageSize,setPageSize] = useState(10);
    const[TotalPage,setTotalPage] = useState(1);

    useEffect(() => {
        apiLoggedInInstances( {
            url: "/api/admin/user",
            params: {
                page_index:PageIndex,
                page_size:PageSize
            }
        }).then(respone => {
            const {Data: userData, headers} = respone 
            setData(userData);
            //tong so trang 
            const {totalElement} = headers;
            setTotalPage(Math.ceil(totalElement/PageSize))
        })
    },[PageIndex,PageSize])
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
                            <th> </th>
                            <th></th>
                            <th> </th>
                            <th> </th>
                            <th></th>
                        </tr>
                        {Data.map((user,index) =>(
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
                        <tfoot>
                            <tr>
                                <td>
                                {[...Array(TotalPage)].map((_,i) =>(
                                    <button onClick={() => {
                                        setPageIndex(i)
                                    }} className="border">{i + 1}</button>
                                ))}
                                </td>
                            </tr>
                        </tfoot>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default QuanTriThanhVien;