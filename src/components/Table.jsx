import React from "react";


function Table(props){
    return (
        <>
            <div className="w-full rounded-md overflow-y-hidden overflow-x-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
                    <thead className="text-xs titlecase mg:uppercase bg-[#4A6CF726] dark:bg-[#4A6CF726] dark:text-[#1E1E1EF11]">
                        <tr className="">
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Total Products</th>
                            <th scope="col" className="px-6 py-3">Total Sales (Last Month)</th>
                            <th scope="col" className="px-6 py-3">Total Revenue (Last Month)</th>
                            {props.mainData && <th scope="col" className="px-6 py-3">Action</th>}
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap hover:underline hover:underline-offset-2 hover:cursor-pointer">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            {props.mainData && (
                                <td scope="row" className="px-6 py-4 text-[#1E1E1EBF] flex gap-[10px]">
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-blue-400 hover:cursor-pointer">Edit</a>
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-red-400 hover:cursor-pointer">Delete</a>
                                </td>)}
                        </tr>
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap hover:underline hover:underline-offset-2 hover:cursor-pointer">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            {props.mainData && (
                                <td scope="row" className="px-6 py-4 text-[#1E1E1EBF] flex gap-[10px]">
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-blue-400 hover:cursor-pointer">Edit</a>
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-red-400 hover:cursor-pointer">Delete</a>
                                </td>)}
                        </tr>
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap hover:underline hover:underline-offset-2 hover:cursor-pointer">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            {props.mainData && (
                                <td scope="row" className="px-6 py-4 text-[#1E1E1EBF] flex gap-[10px]">
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-blue-400 hover:cursor-pointer">Edit</a>
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-red-400 hover:cursor-pointer">Delete</a>
                                </td>)}
                        </tr>
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap hover:underline hover:underline-offset-2 hover:cursor-pointer">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            {props.mainData && (
                                <td scope="row" className="px-6 py-4 text-[#1E1E1EBF] flex gap-[10px]">
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-blue-400 hover:cursor-pointer">Edit</a>
                                    <a href="#" className="hover:underline hover:underline-offset-2 text-red-400 hover:cursor-pointer">Delete</a>
                                </td>)}
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table