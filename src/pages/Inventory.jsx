import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import MobileSideBar from "../components/MobileSideBar.jsx";
import Loader from "../components/Loader.jsx";
import Table from "../components/Table.jsx";
import { PlusCircle, X } from "lucide-react";
import Toast from "../components/Toast.jsx";

const tableHeading = {
    heading1: ["Name", "Total Products", "Total Sales (Last Month)", "Total Revenue (Last Month)"],
    heading2: ["Name", "Total Products", "Total Sales (This Month)", "Total Revenue (This Month)"],
}


function Inventory (){
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    
    // to add a category name
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    
    //to update category name
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [categoryToUpdateId, setCategoryToUpdateId] = useState('')
    const [updateCategoryName, setUpdateCategoryName] = useState('')

    //To perform search query
    const [searchCategory, setSearchCategory] = useState('')

    // for getting data
    const [topCategories, setTopCategories] = useState()
    const [allCategories, setAllCategories] = useState()

    // for deleting
    const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
    const [categoryToDeleteId, setCategoryToDeleteId] = useState('')
    const [deleteCategoryName, setDeleteCategoryName] = useState('')
    const [deleteCategoryNameCheck, setDeleteCategoryNameCheck] = useState('')

    //for toaster
    const [toast, setToast] = useState({message: "", type: "info"})

    const updateIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const fetchTopCategory = async () =>{
            try{
                const response = await fetch("/api/v1/managerInventory/topCategory")

                if (!response.ok){
                    throw Error("Error getting data")
                }
                const data = await response.json()
                setTopCategories(data)
                

            } catch (error){
                setToast({message:error.message, type: "error"})
            }
        }

    const fetchAllCategory = async () =>{
        try{
            const response = await fetch("/api/v1/managerInventory/allCategory")

            if (!response.ok){
                throw Error("Error getting data")
            }
            const data = await response.json()
            setAllCategories(data)
            

        } catch (error){
            setToast({message:error.message, type: "error"})
        }
    }

    const handleAddCategory = async (e) =>{
        e.preventDefault();
         
        try{
            setLoading(true)
            
            const addResponse = await fetch(`/api/v1/managerInventory/newCategory`, {
                method:"POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName: categoryName
                })
            })

            const data = await addResponse.json()

            if (addResponse.ok){
                setToast({ message: data.message, type: 'success' });
                await fetchAllCategory()
                await fetchTopCategory()
                setLoading(false)
                setIsAddFormOpen(false)
            }else{
                setToast({ message: data.error || data.message || "Update failed", type: 'error' });
                setLoading(false)
                setIsAddFormOpen(false)
            }

        } catch (error){
            setToast({message:error.message, type: "error"})
        }
    }

    const handleUpdateCategory = async (e) =>{
         e.preventDefault();
         if (!categoryToUpdateId) {
            setToast({ message: "No category selected for update", type: "error" });
            return;
        }

        try{
            setLoading(true)
            
            const updatesResponse = await fetch(`/api/v1/managerInventory/updateCategory/${categoryToUpdateId}`, {
                method:"PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName: updateCategoryName
                })
            })

            const data = await updatesResponse.json()

            if (updatesResponse.ok){
                setToast({ message: data.message, type: 'success' });
                await fetchAllCategory()
                await fetchTopCategory()
                setLoading(false)
                setIsUpdateFormOpen(false)
            }else{
                setToast({ message: data.error || data.message || "Update failed", type: 'error' });
                setLoading(false)
                setIsUpdateFormOpen(false)
            }

        } catch (error){
            setToast({message:error.message, type: "error"})
        }
    }
    
    const handleDeleteCategory = async (e) =>{
         e.preventDefault();
         if (!categoryToDeleteId) {
            setToast({ message: "No category selected for delete", type: "error" });
            return;
        }else if (deleteCategoryNameCheck !== deleteCategoryName){
            setToast({ message: "Category names don't match", type: "error" });
            setIsDeleteFormOpen(false)
            return;
        }

        try{
            setLoading(true)
            
            const updatesResponse = await fetch(`/api/v1/managerInventory/deleteCategory/${categoryToDeleteId}`, {
                method:"DELETE",
            })

            const data = await updatesResponse.json()

            if (updatesResponse.ok){
                setToast({ message: data.message, type: 'success' });
                await fetchAllCategory()
                await fetchTopCategory()
                setLoading(false)
                setIsDeleteFormOpen(false)
            }else{
                setToast({ message: data.error || data.message || "Update failed", type: 'error' });
                setLoading(false)
                setIsDeleteFormOpen(false)
            }

        } catch (error){
            setToast({message:error.message, type: "error"})
        }
    }

    const handleSearch = async (query) =>{
        
        if (searchCategory === "") {
            await fetchAllCategory()
            return;
        }

        try{
            const response = await fetch(`/api/v1/managerInventory/searchCategory?search=${query}`, {
                method:"GET",
            })

            const data = await response.json()

            if (response.ok){
                setAllCategories(data)
            }else{
                setToast({ message: data.error || data.message || "Update failed", type: 'error' });
                await fetchAllCategory()
            }

        } catch (error){
            setToast({message:error.message, type: "error"})
        }
    }

    // mount effect
    useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);

    const fetchAllData = async () => {
        try {
        setLoading(true);
        await Promise.all([fetchTopCategory(), fetchAllCategory()]);
        } catch (err) {
        setToast({ message: err.message, type: "error" });
        } finally {
        setLoading(false);
        }
    };

    fetchAllData();

    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

    // debounced search effect
    useEffect(() => {
        if (!searchCategory.trim()) {
            fetchAllCategory();
            return;
        }

        const timer = setTimeout(() => {
            handleSearch(searchCategory);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchCategory]);

    return (
        <>

        {loading ? <Loader /> : (
        <>
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: 'info' })}
        />
        <div className="grid grid-rows-[75px_1fr_auto] gap-y-[0px] gap-x-[15px] transition-[grid-template-columns] duration-300 ease-in-out min-h-screen relative"
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

                {isAddFormOpen && (
                    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
                        <form onSubmit={handleAddCategory} className={`flex flex-col gap-[20px] w-[30%] min-w-[350px] bg-[#F5F6FA] shadow-md p-[15px] rounded-md transition-transform duration-300 ease-in-out ${isAddFormOpen ? "translate-y-0" : "-translate-y-full" }`}>
                            <div className="flex justify-between items-center">
                                <h2 className="text-[18px]">Add Category</h2>
                                <button className="p-[5px] rounded-sm hover:bg-gray-300 hover:text-white" onClick={() => {
                                    setIsAddFormOpen(false)
                                    setCategoryName("")
                                }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" className="bg-white h-[40px] p-[10px] mb-[10px] rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400" placeholder="Add a category..." value={categoryName} onChange={(e) =>{
                                    setCategoryName(e.target.value)
                                }} />
                                {/* functionality to be worked on */}
                                <button type="submit" className="bg-[#4A6CF7] text-white p-[5px] rounded-md hover:bg-[#3B38A0]">Add</button>
                            </div>
                        </form>
                    </div>
                )}
                <div className="col-start-1 lg:col-start-2 row-start-2 p-[10px] overflow-hidden flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[20px]">
                        <h2 className="text-[18px] font-medium">Top Categories</h2>
                        <Table mainData={false} heading={tableHeading.heading1} categoryData={topCategories} parent={"inventory"} />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex flex-col md:flex-row justify-between">
                            <h3 className="text-[16px] font-medium">Categories</h3>
                            <div className="flex gap-[15px] items-center">
                                <input type="text" placeholder="Search Category" onChange={(e) => setSearchCategory(e.target.value)} value={searchCategory} className="w-[80%] bg-white h-[45px] p-[10px] mb-[10px] shadow-md rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400" />
                                <button className="w-[20%] min-w-[85px] flex gap-[15px] items-center bg-[#4A6CF7] text-white p-[10px] rounded-md hover:bg-[#3B38A0] hover:shadow-md" onClick={() => setIsAddFormOpen(true)}>
                                    <span>Add</span>
                                    <PlusCircle size={20} />
                                </button>
                            </div>
                        </div>

                        {isUpdateFormOpen && (
                            <div className="fixed inset-0  bg-black/60 flex justify-center items-center">
                                <form onSubmit={handleUpdateCategory} className={`flex flex-col gap-[20px] w-[30%] min-w-[350px] bg-[#F5F6FA] shadow-md p-[15px] rounded-md transition-transform duration-300 ease-in-out ${isAddFormOpen ? "translate-y-0" : "-translate-y-full" }`}>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-[18px]">Update Category</h2>
                                        <button className="p-[5px] rounded-sm hover:bg-gray-300 hover:text-white" onClick={() => {
                                            setIsUpdateFormOpen(false)
                                            setUpdateCategoryName("")
                                        }}>
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col">
                                        <input type="text" className="bg-white h-[40px] p-[10px] mb-[10px] rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400" placeholder="Update a category..." value={updateCategoryName} onChange={(e) =>{
                                            setUpdateCategoryName(e.target.value)
                                        }} />
                                        {/* functionality to be worked on */}
                                        <button type="submit" className="bg-[#4A6CF7] text-white p-[5px] rounded-md hover:bg-[#3B38A0]">Update</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {isDeleteFormOpen && (
                            <div className="fixed inset-0  bg-black/60 flex justify-center items-center">
                                <form onSubmit={handleDeleteCategory} className={`flex flex-col gap-[20px] w-[30%] min-w-[350px] bg-[#F5F6FA] shadow-md p-[15px] rounded-md transition-transform duration-300 ease-in-out ${isAddFormOpen ? "translate-y-0" : "-translate-y-full" }`}>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-[18px]">Delete Category</h2>
                                        <button className="p-[5px] rounded-sm hover:bg-gray-300 hover:text-white" onClick={() => {
                                            setIsDeleteFormOpen(false)
                                            setDeleteCategoryName("")
                                        }}>
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label>Type "{deleteCategoryNameCheck}" to confrim process</label>
                                        <input type="text" className="bg-white h-[40px] p-[10px] mb-[10px] rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400" placeholder="Delete a category..." value={deleteCategoryName} onChange={(e) =>{
                                            setDeleteCategoryName(e.target.value)
                                        }} />
                                        {/* functionality to be worked on */}
                                        <button type="submit" className="bg-red-500 text-white p-[5px] rounded-md hover:bg-red-700">Delete</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <Table mainData={true} heading={tableHeading.heading2} categoryData={allCategories} parent={"inventory"} getIdToUpdate={setCategoryToUpdateId} getCurrentDataToUpdate={setUpdateCategoryName} updateFormOpen={setIsUpdateFormOpen} deleteFormOpen={setIsDeleteFormOpen} getIdToDelete={setCategoryToDeleteId} getCurrentDataToDelete={setDeleteCategoryNameCheck} />
                    </div>
                </div>
                <div className="col-start-1 col-span-full row-start-3">
                    <Footer />
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default Inventory