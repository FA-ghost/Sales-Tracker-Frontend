import React from "react";
import logo from "../assets/trend.png"
import { PanelLeftOpen, House, Warehouse, Package, Truck, ClipboardList, Users, ChartArea, PanelLeftClose } from "lucide-react";

function Sidebar(props){
    return (
        <>
            <aside className="flex flex-col gap-[5px] bg-[#3B38A0] h-full text-white">
                <div className={`flex ${props.isOpen ? "flex-row gap-[10px]" : "flex-col gap-[20px]"} items-center p-[15px]`}>
                    <img src={logo} alt="logo" className="w-[40px] h-[40px] rounded-full" />
                    <span className={`font-bold text-[20px] bg-linear-to-r from-[#E0E0E6CC] to-[#EF83F5CC] bg-clip-text text-transparent ${props.isOpen ? "block" : "hidden"}`}>SalesTracker</span>
                    <button className="p-[5px] bg-[#B2B0E8] rounded-md" onClick={props.update}>{props.isOpen ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button>
                </div>
                <hr className="m-[15px]" />
                <div>
                    <ul className="flex flex-col gap-[20px] p-[10px] text-[18px]">
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            <House size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Home</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            <Package size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Orders</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            <Warehouse size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Inventory</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            <Truck size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Suppliers</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            {/* work on last */}
                            <ClipboardList size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Reports</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            {/* work on last */}
                            <Users size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Customers</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-gray-200/80 hover:text-black`}>
                            {/* work on last */}
                            <ChartArea size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Analysis</span>
                        </li>

                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;