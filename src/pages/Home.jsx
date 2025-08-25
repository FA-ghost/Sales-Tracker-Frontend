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
    const [statData, setStatData] = useState(null)
    const [revenueOverTime, setRevenueOverTime] = useState(null)
    const [revenueGrowth, setRevenueGrowth] = useState(null)
    const [revenueGrowthByYear, setRevenueGrowthByYear] = useState(null)
    const [chartKey, setChartKey] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateIsOpen = () => {
        setIsOpen(!isOpen);
        // Force chart re-render after sidebar animation completes
        setTimeout(() => {
            setChartKey(prev => prev + 1);
        }, 350); // Match the transition duration
    };


    useEffect(() => {
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
                    backgroundColor: "rgba(141,110,235,0.8)",
                    fill: true
                },
                {
                    label: data.revenue.label,
                    data: data.revenue.data,
                    backgroundColor: "rgba(200, 162, 200,0.8)",
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
                        backgroundColor: "rgba(141,110,235,0.8)",
                        fill: true
                    },
                    {
                        label: data.revenue.label,
                        data: data.revenue.data,
                        backgroundColor: "rgba(200, 162, 200,0.8)",
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
                        backgroundColor: "rgba(141,110,235,0.8)",
                        fill: true
                    },
                    {
                        label: data.revenue.label,
                        data: data.revenue.data,
                        backgroundColor: "rgba(200, 162, 200,0.8)",
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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
    }, [])

    console.log('Render state:', { loading, error, statData, revenueOverTime, revenueGrowth, revenueGrowthByYear });
    console.log(statData)
    if (loading) {
        console.log('Showing loading state');
        return <div className="p-4">Loading...</div>;
    }
    
    if (error) {
        console.log('Showing error state:', error);
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }
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
                        {statData && (
                            <div className="flex justify-between text-white gap-[15px]">
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80 min-h-[120px]">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total revenue</span>
                                    <div className="bg-[#6366F1] p-[5px] rounded-md ">
                                        <Banknote size={30} />
                                    </div> 
                                </div>
                                <span className="font-semibold text-[20px]">{`$ ${Number(statData.currRev).toLocaleString()}`}</span>
                                <span className={`text-sm mt-1 ${statData.growthAgainstLastRev > 0 ? 'text-green-600' : 'text-red-600'}`}>{statData.growthAgainstLastRev > 0 ? "+" : '' } {`${statData.growthAgainstLastRev}% vs last month`}</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Orders</span>
                                    <div className="bg-[#8B5CF6] p-[5px] rounded-md">
                                        <ShoppingCart size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">{`${Number(statData.currSal).toLocaleString()}`}</span>
                                <span className={`text-sm mt-1 ${statData.growthAgainstLastSal > 0 ? 'text-green-600' : 'text-red-600'}`}>{statData.growthAgainstLastSal > 0 ? "+" : '' } {`${statData.growthAgainstLastSal}% vs last month`}</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Products</span>
                                    <div className="bg-[#06B6D4] p-[5px] rounded-md">
                                        <Package2 size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">{statData.productCount}</span>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Low Stock Alert</span>
                                    <div className="bg-[#EF4444] p-[5px] rounded-md">
                                        <TriangleAlert size={30} />
                                    </div>
                                </div>
                                <span className="font-semibold text-[20px]">{statData.lowStockAmount}</span>
                            </div>
                        </div>
                        )}
                        
                        {/* Revenue Trend Chart */}
                        <div className="flex flex-col gap-[5px] shadow-md p-[15px] rounded-md bg-[#E0E0E6] min-h-[500px]">
                            <span className="font-semibold">Revenue Over Time</span>
                            <div className="flex-1 min-h-0">
                                {revenueOverTime?.labels?.length > 0 && (
                                    <LineGraph key={`line-${chartKey}`} data={revenueOverTime} />
                                )}
                            </div>
                        </div>
                        
                        {/* Bottom Charts - Side by Side */}
                        <div className="flex gap-[15px] min-h-[400px]">
                            <div className="flex flex-col gap-[5px] flex-1 p-[15px] rounded-md bg-[#E0E0E6] min-h-0">
                                <span className="font-semibold">Revenue & Orders by Year</span>
                                <div className="flex-1 min-h-0">
                                    {revenueGrowthByYear?.labels?.length > 0 && (
                                        <BarGraph key={`bar1-${chartKey}`} data={revenueGrowthByYear} />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px] flex-1 p-[15px] rounded-md bg-[#E0E0E6] min-h-0">
                                <span className="font-semibold">Growth Trend</span>
                                <div className="flex-1 min-h-0">
                                    {revenueGrowth?.labels?.length > 0 && (
                                        <BarGraph key={`bar2-${chartKey}`} data={revenueGrowth} />
                                    )}
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