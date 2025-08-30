import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import MobileSideBar from "../components/MobileSideBar.jsx";
import Loader from "../components/Loader.jsx";

function Suppliers (){
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const updateIsOpen = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)
        

        const fetchAllData = async () => {
            try {
                setLoading(true);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    
    if (loading) {
        console.log('Showing loading state');
        return <Loader />;
    }
    
    if (error) {
        console.log('Showing error state:', error);
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }
    return (
        <>
            {loading ? <Loader /> : (
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
                    <div>
                        <Navbar />
                    </div>
                    
                </div>
                {isDesktop && 
                (<div className="w-full col-start-1 row-start-1 row-span-2">
                     <Sidebar update={updateIsOpen} isOpen={isOpen} />
                </div>)
                }
                <div className=" col-start-1 lg:col-start-2 row-start-2 p-[10px] overflow-hidden">
                    
                        <h1>Suppliers</h1>
                </div>
                <div className="col-start-1 col-span-full row-start-3">
                    <Footer />
                </div>
            </div>
            )}
        </>
    )
}

export default Suppliers