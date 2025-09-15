import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import BarGraph from "../components/BarGraph.jsx";
import LineGraph from "../components/LineGraph.jsx";
import Footer from "../components/Footer.jsx";
import MobileSideBar from "../components/MobileSideBar.jsx";
import StatCard from "../components/StatCard.jsx";
import { Banknote, Package2, ShoppingCart, TriangleAlert, PackageOpen } from "lucide-react";
import Loader from "../components/Loader.jsx";
import GraphFormat from "../components/GraphFormat.jsx";
import Toast from "../components/Toast.jsx";

function Home(){
    const [isOpen, setIsOpen] = useState(true);
    const [statData, setStatData] = useState(null);
    const [revenueOverTime, setRevenueOverTime] = useState(null);
    const [revenueGrowth, setRevenueGrowth] = useState(null);
    const [revenueGrowthByYear, setRevenueGrowthByYear] = useState(null);
    const [chartKey, setChartKey] = useState(0);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({message: "", type: "info"});
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const updateIsOpen = () => {
        setIsOpen(!isOpen);
        // Force chart re-render after sidebar animation completes
        setTimeout(() => {
            setChartKey(prev => prev + 1);
        }, 350); // Match the transition duration
    };


    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)
        const fetchStat = async () =>{
            try{
                const response = await fetch("/api/v1/managerHome/recentUpdates")
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json()
                
                setStatData(data)
                
            } catch (error){
                console.log(error.message)
                throw error
            }
        }
        
        const fetchRevenueOverTime = async () =>{
            try{
                const response = await fetch("/api/v1/managerHome/revenueOverTime")
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json()
                
                const dataToDisplay = {
                labels: data.label,
                datasets: [{
                    label: data.sales.label,
                    data: data.sales.data,
                    backgroundColor: "rgba(155, 93, 229, 1)",
                    fill: true
                },
                {
                    label: data.revenue.label,
                    data: data.revenue.data,
                    backgroundColor: "rgba(74, 108, 247, 1)",
                    fill:true 
                }]
            }
                setRevenueOverTime(dataToDisplay)

            } catch (error){
                console.log(error.message)
                throw error
            }
        }

        const fetchGrowth = async () =>{
            try{
                const response = await fetch("/api/v1/managerHome/revenueGrowth")
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json()
                const dataToDisplay = {
                    labels: data.label,
                    datasets: [{
                        label: data.sales.label,
                        data: data.sales.data,
                        backgroundColor: "rgba(155, 93, 229, 1)",
                        fill: true
                    },
                    {
                        label: data.revenue.label,
                        data: data.revenue.data,
                        backgroundColor: "rgba(74, 108, 247, 1)",
                        fill:true 
                    }]
                }
                
                setRevenueGrowth(dataToDisplay)

            } catch (error){
                console.log(error.message)
                throw error
            }
        }
        const fetchGrowthByYear = async () =>{
            try{
                const response = await fetch("/api/v1/managerHome/revenueGrowthByYear")
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json()
                const dataToDisplay = {
                    labels: data.label,
                    datasets: [{
                        label: data.sales.label,
                        data: data.sales.data,
                        backgroundColor: "rgba(155, 93, 229, 1)",
                        fill: true
                    },
                    {
                        label: data.revenue.label,
                        data: data.revenue.data,
                        backgroundColor: "rgba(74, 108, 247, 1)",
                        fill:true 
                    }]
                }
                
                setRevenueGrowthByYear(dataToDisplay)

            } catch (error){
                console.log(error.message)
                throw error
            }
        }

        const fetchAllData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchStat(),
                    fetchRevenueOverTime(),
                    fetchGrowth(),
                    fetchGrowthByYear()
                ]);
            } catch (err) {
                setToast({message:err.message, type: "error"});
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {loading ? <Loader /> : (
            <>
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: 'info' })}
            />
            <div className="grid grid-rows-[75px_1fr_auto] gap-y-[0px] gap-x-[15px] transition-[grid-template-columns] duration-300 ease-in-out min-h-screen"
            style={isDesktop ? {
                        gridTemplateColumns: isOpen ? "250px 1fr" : "70px 1fr",
                    } : {
                        gridTemplateColumns: "1fr",
                    }}
            >
                <div className="col-start-1 flex justify-between items-center p-[10px] lg:col-start-2 row-start-1">
                    {!isDesktop && (
                        <div className="">
                            <MobileSideBar isOpen={isOpen} />
                        </div>
                        ) }
                    <div className="w-full">
                        <Navbar />
                    </div>
                    
                </div>
                {isDesktop && 
                (<div className="w-full col-start-1 row-start-1 row-span-2">
                     <Sidebar update={updateIsOpen} isOpen={isOpen} />
                </div>)
                }
                <div className=" col-start-1 lg:col-start-2 row-start-2 p-[10px] overflow-hidden">
                    <div className="flex flex-col gap-[15px] h-full">
                        {/* Stats Cards */}
                        {statData && (
                            <div className="flex flex-col lg:flex-row justify-between text-white gap-[15px]">
                                <StatCard title={"Total revenue"} icon={<Banknote size={30} />} color={"bg-[#6366F1]"} data={{
                                    data1: statData.currRev,
                                    data2: statData.growthAgainstLastRev
                                }} money={true} />
                                <StatCard title={"Total Sales"} icon={<ShoppingCart size={30} />} color={"bg-[#8B5CF6]"} data={{
                                    data1: statData.currSal,
                                    data2: statData.growthAgainstLastSal
                                }} money={false} />
                                
                                {/* to be updated when e-commerce website is done */}
                                <StatCard title={"Total Orders"} icon={<PackageOpen size={30} />} color={"bg-[#4A6CF1]"} data={{
                                    data1: statData.productCount,
                                }} money={false} />

                                <StatCard title={"Total Products"} icon={<Package2 size={30} />} color={"bg-[#06B6D4]"} data={{
                                    data1: statData.productCount,
                                }} money={false} />
                                
                                <StatCard title={"Low Stock Alert"} icon={<TriangleAlert size={30} />} color={"bg-[#EF4444]"} data={{
                                    data1: statData.lowStockAmount,
                                }} money={false} />
                        </div>
                        )}
                        
                        {/* Revenue Trend Chart */}
                        <div className="flex flex-col gap-[5px] shadow-md p-[10px] md:p-[15px] rounded-md bg-[#F5F6FA]  min-h-[375px] md:min-h-[500px]">
                            <span className="font-semibold ">Revenue Over Time</span>
                            <div className="flex-1 min-h-0">
                                {revenueOverTime?.labels?.length > 0 && (
                                    <LineGraph key={`line-${chartKey}`} data={revenueOverTime} />
                                )}
                            </div>
                        </div>
                        
                        {/* Bottom Charts - Side by Side */}
                        <div className="flex flex-col md:flex-row gap-[15px] min-h-[400px]">
                            <GraphFormat title={"Revenue & Orders by Year"} data={revenueGrowthByYear} graph={<BarGraph key={`bar1-${chartKey}`} data={revenueGrowthByYear} />} />
                            <GraphFormat title={"Growth Trend"} data={revenueGrowth} graph={<BarGraph key={`bar2-${chartKey}`} data={revenueGrowth} />} />
                        </div>
                    </div>
                </div>
                <div className="col-start-1 col-span-full row-start-3">
                    <Footer />
                </div>
            </div>
            </>
            )}
        </>
    );
}

export default Home;