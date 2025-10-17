import React from "react";
import { useState, useEffect } from "react";
import BarGraph from "../components/BarGraph.jsx";
import LineGraph from "../components/LineGraph.jsx";
import StatCard from "../components/StatCard.jsx";
import { Banknote, Package2, ShoppingCart, TriangleAlert, PackageOpen } from "lucide-react";
import GraphFormat from "../components/GraphFormat.jsx";
import { useOutletContext } from "react-router-dom";

function Home(){
    const {setLoading, setToast } = useOutletContext()
    const [statData, setStatData] = useState(null);
    const [revenueOverTime, setRevenueOverTime] = useState(null);
    const [revenueGrowth, setRevenueGrowth] = useState(null);
    const [revenueGrowthByYear, setRevenueGrowthByYear] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [toast, setToast] = useState({message: "", type: "info"});


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
    }, [])

    return (
        <>

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
                        <LineGraph data={revenueOverTime} />
                    )}
                </div>
            </div>
            
            {/* Bottom Charts - Side by Side */}
            <div className="flex flex-col md:flex-row gap-[15px] min-h-[400px]">
                <GraphFormat title={"Revenue & Orders by Year"} data={revenueGrowthByYear} graph={<BarGraph data={revenueGrowthByYear} />} />
                <GraphFormat title={"Growth Trend"} data={revenueGrowth} graph={<BarGraph data={revenueGrowth} />} />
            </div>
        </div>
    </>
    );
}

export default Home;