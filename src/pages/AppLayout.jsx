import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import MobileSideBar from "../components/MobileSideBar.jsx";
import Loader from "../components/Loader.jsx";
import Toast from "../components/Toast.jsx";
import { Outlet } from "react-router-dom";

function AppLayOut() {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false); // Set false so content shows
    const [toast, setToast] = useState({ message: "", type: "info" });
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    // Sidebar toggle
    const updateIsOpen = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {loading && <Loader />}

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "info" })}
            />

            <div
                className="grid grid-rows-[75px_1fr_auto] gap-y-[0px] gap-x-[15px] transition-[grid-template-columns] duration-300 ease-in-out min-h-screen"
                style={
                    isDesktop
                        ? { gridTemplateColumns: isOpen ? "250px 1fr" : "70px 1fr" }
                        : { gridTemplateColumns: "1fr" }
                }
            >
                {/* NAVBAR */}
                <div className="col-start-1 flex justify-between items-center p-[10px] lg:col-start-2 row-start-1">
                    {!isDesktop && (
                        <MobileSideBar isOpen={isOpen} />
                    )}
                    <div className="w-full">
                        <Navbar />
                    </div>
                </div>

                {/* SIDEBAR */}
                {isDesktop && (
                    <div className="w-full col-start-1 row-start-1 row-span-2">
                        <Sidebar update={updateIsOpen} isOpen={isOpen} />
                    </div>
                )}

                {/* MAIN CONTENT (children go here) */}
                <div className="col-start-1 lg:col-start-2 row-start-2 p-[10px] overflow-hidden">
                    <Outlet context={ {setToast, setLoading} } />
                </div>

                {/* FOOTER */}
                <div className="col-start-1 col-span-full row-start-3">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default AppLayOut;
