import React from "react";
import logo from "../assets/logo.jpg"
import { PanelLeftOpen, House, Warehouse, Package, Truck, ClipboardList, Users, ChartArea, PanelLeftClose } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar(props){
    const currentLocation = window.location.href.split('/')[3]

    return (
        <>
            <aside className="flex flex-col gap-[5px] bg-[#4A6CF7] h-full text-white">
                <div className={`flex ${props.isOpen ? "flex-row gap-[10px]" : "flex-col gap-[20px]"} items-center p-[15px]`}>
                    <img src={logo} alt="logo" className="w-[40px] h-[40px] rounded-full" />
                    <span className={`font-bold text-[20px] bg-linear-to-r from-[#E0E0E6CC] to-[#EF83F5CC] bg-clip-text text-transparent ${props.isOpen ? "block" : "hidden"}`}>SalesTracker</span>
                    <button className="p-[5px] bg-[#2D46A0] rounded-md" onClick={props.update}>{props.isOpen ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button>
                </div>
                <hr className="m-[15px]" />
                <div>
                    <ul className="flex flex-col gap-[20px] p-[10px] text-[18px] text-[#F5F6FA]">
                        <Link to="/">
                            <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === '' ? "bg-[#9B5DE5]" : ""}`} >
                                
                                    <House size={20} />
                                    <span className={`${props.isOpen ? "block" : "hidden"}`}>Home</span>
                            </li>
                        </Link>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'order' ? "bg-[#9B5DE5]" : ""}`} >
                            {/* work on after e-commerce */}
                            <Package size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Orders</span>
                        </li>
                        <Link to="/inventory">
                            <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'inventory' ? "bg-[#9B5DE5]" : ""}`} >
                                    <Warehouse size={20} />
                                    <span className={`${props.isOpen ? "block" : "hidden"}`}>Inventory</span>
                            </li>
                        </Link>
                        <Link to="/supplier">
                            <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'supplier' ? "bg-[#9B5DE5]" : ""}`} >
                                <Truck size={20} />
                                <span className={`${props.isOpen ? "block" : "hidden"}`}>Suppliers</span>
                            </li>
                        </Link>
                        <Link to="/report">
                            <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'report' ? "bg-[#9B5DE5]" : ""}`} >
                                {/* work on after inventory and suppliers */}
                                <ClipboardList size={20} />
                                <span className={`${props.isOpen ? "block" : "hidden"}`}>Reports</span>
                            </li>
                        </Link>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'customer' ? "bg-[#9B5DE5]" : ""}`} >
                            {/* work on after e-commerce website */}
                            <Users size={20} />
                            <span className={`${props.isOpen ? "block" : "hidden"}`}>Customers</span>
                        </li>
                        <li className={`flex gap-[30px] items-center ${props.isOpen ? "" : "justify-center"} p-[10px] rounded-md hover:bg-[#9B5DE5] hover:text-white ${currentLocation === 'analysis' ? "bg-[#9B5DE5]" : ""}`} >
                            {/* work on after learning ml */}
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