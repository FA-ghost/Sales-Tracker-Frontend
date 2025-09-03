import { Menu } from "lucide-react"
import { useState } from "react"
import Sidebar from "./Sidebar"
function MobileSideBar (){
    const [isOpen, setIsOpen] = useState(false)
    return (
    <>
        {!isOpen && (
                <button 
                onClick={() => setIsOpen(true)} 
                className="p-[5px] bg-[#2D46A0] rounded-sm z-50 relative text-white"
                >
                <Menu size={30} />
                </button>
            )}

        <div className={`z-50 fixed top-0 left-0 h-screen w-[250px] transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            
            {isOpen && (
               <Sidebar update={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            )}
        </div>
    </>
    )
}

export default MobileSideBar