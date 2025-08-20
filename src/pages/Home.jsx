import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import BarGraph from "../components/BarGraph.jsx";
import LineGraph from "../components/LineGraph.jsx";
import Footer from "../components/Footer.jsx";
import { Banknote, Package2, ShoppingCart, TriangleAlert } from "lucide-react";

function Home(){
    const [isOpen, setIsOpen] = useState(true);
    const [chartKey, setChartKey] = useState(0);

    const updateIsOpen = () => {
        setIsOpen(!isOpen);
        // Force chart re-render after sidebar animation completes
        setTimeout(() => {
            setChartKey(prev => prev + 1);
        }, 350); // Match the transition duration
    };

    const dummyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
        {
            label:'Sales',
            data: [6, 16, 12, 15, 11],
            backgroundColor: "rgba(141,110,235,0.8)",
        },
        {
            label:'Price',
            data: [6, 16, 12, 15, 11],
            backgroundColor: "rgba(239, 131, 245,0.8)",
        }
    ]
    };
    const dummyData2 = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
        {
            label:'Sales',
            data: [6, 16, 12, 15, 11],
            backgroundColor: "rgba(141,110,235,0.8)",
            fill: true
        },
        {
            label:'Price',
            data: [9, 26, 42, 5, 1],
            backgroundColor: "rgba(239, 131, 245,0.8)",
            fill:true 
        }
    ]
    };

    return (
        <>
            <div className="grid grid-rows-[75px_1fr_auto] gap-y-[0px] gap-x-[15px] transition-[grid-template-columns] duration-300 ease-in-out min-h-screen"
            style={{
                        gridTemplateColumns: isOpen ? "250px 1fr" : "70px 1fr",
                    }}
            >
                <div className="col-start-2 row-start-1">
                    <Navbar />
                </div>
                <div className="w-full col-start-1 row-start-1 row-span-2">
                    <Sidebar update={updateIsOpen} isOpen={isOpen} />
                </div>
                <div className="col-start-2 row-start-2 p-[10px] overflow-hidden">
                    <div className="flex flex-col gap-[15px] h-full">
                        {/* Stats Cards */}
                        <div className="flex justify-between text-white gap-[15px]">
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80 min-h-[120px]">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total revenue</span>
                                    <div className="bg-[#6366F1] p-[5px] rounded-md ">
                                        <Banknote size={30} />
                                    </div> 
                                </div>
                                <span className="font-semibold text-[20px]">20000</span>
                                <span>20000</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Orders</span>
                                    <div className="bg-[#8B5CF6] p-[5px] rounded-md">
                                        <ShoppingCart size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">200000</span>
                                <span>200000</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Products</span>
                                    <div className="bg-[#06B6D4] p-[5px] rounded-md">
                                        <Package2 size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">20000</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Low Stock Alert </span>
                                    <div className="bg-[#EF4444] p-[5px] rounded-md">
                                        <TriangleAlert size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">200000</span>
                            </div>
                        </div>
                        
                        {/* Revenue Trend Chart */}
                        <div className="flex flex-col gap-[5px] shadow-md p-[15px] rounded-md bg-[#E0E0E6] min-h-[500px]">
                            <span className="font-semibold">Revenue Trend</span>
                            <div className="flex-1 min-h-0">
                                <LineGraph key={`line-${chartKey}`} data={dummyData2} />
                            </div>
                        </div>
                        
                        {/* Bottom Charts - Side by Side */}
                        <div className="flex gap-[15px] min-h-[400px]">
                            <div className="flex flex-col gap-[5px] flex-1 p-[15px] rounded-md bg-[#E0E0E6] min-h-0">
                                <span className="font-semibold">Revenue vs Orders</span>
                                <div className="flex-1 min-h-0">
                                    <BarGraph key={`bar1-${chartKey}`} data={dummyData} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 p-[15px] rounded-md bg-[#E0E0E6] min-h-0">
                                <span className="font-semibold">Growth Trend</span>
                                <div className="flex-1 min-h-0">
                                    <BarGraph key={`bar2-${chartKey}`} data={dummyData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-1 col-span-full row-start-3">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Home;