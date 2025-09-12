import React from "react";
import { useNavigate } from "react-router-dom";

function Table(props){

    const navigate = useNavigate()
    return (
        <>
            <div className="w-full rounded-md overflow-y-hidden overflow-x-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
                    <thead className="text-xs titlecase mg:uppercase bg-[#4A6CF726] dark:bg-[#4A6CF726] dark:text-[#1E1E1EF11]">
                        <tr className="">
                            {props.heading.map((heading, index) => <th key={index} scope="col" className="px-6 py-3">{heading}</th>)}
                            {props.mainData && <th scope="col" className="px-6 py-3">Action</th>}
                        </tr>
                    </thead>
                    
                    <tbody className="">
                        {props.categoryData.map((category) => {
                            return (
                                <tr key={category.categoryId} className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 last:border-y-0">
                                    <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap">
                                        <button className="hover:underline hover:underline-offset-2 hover:cursor-pointer" onClick={ () => navigate(`/${props.parent}/${category.categoryId}`)}>
                                            {category.categoryName}
                                        </button>
                                    </td>
                                    <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">{category.productCount}</td>
                                    <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">{category.categoryTotalSalesLastMonth}</td>
                                    <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">${category.categoryTotalRevenueLastMonth.toLocaleString()}</td>
                                    {props.mainData && (
                                        <td scope="row" className="px-6 py-4 text-[#1E1E1EBF] flex gap-[10px]">
                                            <button className="hover:underline hover:underline-offset-2 text-blue-400 hover:cursor-pointer" onClick={() => {
                                                props.getId(category.categoryId)
                                                props.getCurrentData(category.categoryName)
                                                props.formOpen(true)
                                            }}>Edit</button>
                                            <button className="hover:underline hover:underline-offset-2 text-red-400 hover:cursor-pointer">Delete</button>
                                        </td>)}
                                </tr> 
                            )
                        })}
                                               
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table