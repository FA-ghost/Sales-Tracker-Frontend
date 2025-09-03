import React from "react";
import { useState } from "react";
import profilePic from "../assets/profile-pic.jpg"
import { ChevronDown, LogOut, UserRoundPen } from 'lucide-react'

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    const updateIsOpen = () => setIsOpen(!isOpen);

    return (
        <nav className="w-full flex justify-end p-[10px] relative">
            <div className="flex gap-[15px] p-[10px] items-center rounded-sm hover:bg-[#2D46A0] hover:text-white" onClick={updateIsOpen}>
                <img src={profilePic} alt="user profile picture" className="w-[40px] h-[40px] rounded-full"/>
                <div className="flex flex-col gap-[2px] text-[13px]">
                    <span className="font-semibold">Welcome</span>
                    <span>Manager-FA</span>
                </div>
                <div className={`w-[20px] h-[20px] rounded-full shadow-sm ${isOpen ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out`}>
                    <ChevronDown size={20} />
                </div>
            </div>

            <div className={`w-[150px] bg-[#3B38A0] text-[#F5F6FA] rounded-md absolute top-[70px] right-[30px] ${isOpen ? "block" : "hidden"} `} onMouseLeave={updateIsOpen}>
                <ul className="w-full flex flex-col gap-[5px] my-[5px]">
                    <li className="flex gap-[10px] items-center w-full p-[10px] hover:bg-[#9B5DE5] hover:text-white">
                        <UserRoundPen size={20} />
                        <span>Profile</span>
                    </li>
                    <li className="flex gap-[10px] items-center w-full p-[10px] hover:bg-[#9B5DE5] hover:text-white">
                        <LogOut size={20} />
                        <span>Signout</span>
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar;