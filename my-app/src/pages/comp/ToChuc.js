import React from "react";
const ToChuc = () => {
    return (
        <div style={{}} className="bg-gray-200 w-100 m-5 grid grid-rows-2 w-400 ">
            <div className="grid grid-cols-3" >
                <div className="flex justify-end mr-10 m-3" >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="60" fill="#EFECE8" />
                        <path d="M66.48 55.2002L51.48 44.4902C49.38 42.9902 46.59 42.9902 44.52 44.4902L29.52 55.2002C27.93 56.3402 27 58.1402 27 60.0902V84.0002C27 85.6502 28.35 87.0002 30 87.0002H42V69.0002H54V87.0002H66C67.65 87.0002 69 85.6502 69 84.0002V60.0902C69 58.1402 68.07 56.3402 66.48 55.2002Z" fill="#C4C4C4" />
                        <path d="M87.09 33H59.91C56.64 33 54 35.64 54 38.91L54.27 39.18C54.51 39.33 54.75 39.45 54.99 39.6L69.99 50.31C72.27 51.93 73.89 54.33 74.61 57H81V63H75V69H81V75H75V87H87.09C90.36 87 93 84.36 93 81.09V38.91C93 35.64 90.36 33 87.09 33ZM81 51H75V45H81V51Z" fill="#C4C4C4" />
                    </svg>
                </div>
                <div className="flex justify-start mt-3">
                    <input style={{width:200,height:100}} className="bg-gray-200 " placeholder="ten truong"></input>
                </div>
                <div className="flex justify-end m-2">
                    <button style={{
                        width: 50,
                        height: 30,
                        color: "blue"
                    }} className="bg-gray-200 h-50 border border-blue-600 rounded">sua</button>
                </div>

            </div>
            <div className="grid grid-cols-2 ">
                <div className="grid grid-cols-1 ">
                    <input className="bg-gray-200 " placeholder="thong tin trg"></input>
                    <input className="bg-gray-200" placeholder="email"></input>
                    <input className="bg-gray-200" placeholder="so dt"></input>
                    <input className="bg-gray-200" placeholder="dia chi"></input>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <input className="bg-gray-200" placeholder="ma so thue"></input>
                    <input className="bg-gray-200" placeholder="Website"></input>
                </div>
            </div>
        </div>
    )
}
export default ToChuc;