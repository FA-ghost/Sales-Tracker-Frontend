import React from "react";


function Table(){
    return (
        <>
            <div className="w-full rounded-md overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
                    <thead className="text-xs titlecase mg:uppercase bg-[#4A6CF726] dark:bg-[#4A6CF726] dark:text-[#1E1E1EF11]">
                        <tr className="">
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Total Products</th>
                            <th scope="col" className="px-6 py-3">Total Sales in Last Month</th>
                            <th scope="col" className="px-6 py-3">Total Revenue Generated in the Last Month</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 hover:underline hover:underline-offset-2 hover:cursor-pointer last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                        </tr>
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 hover:underline hover:underline-offset-2 hover:cursor-pointer last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                        </tr>
                        <tr className="font-semibold odd:dark:bg-[#9B5DE514] even:dark:bg-[#E0E4EC8C] border-b dark:border-gray-700 border-gray-200 hover:underline hover:underline-offset-2 hover:cursor-pointer last:border-y-0">
                            <td scope="row" className="px-6 py-4 font-medium text-[#1E1E1EF2] whitespace-nowrap">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                            <td scope="row" className="px-6 py-4 text-[#1E1E1EBF]">something</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table