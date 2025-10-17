import { Outlet, useOutletContext } from "react-router-dom";

function InventoryLayout(){
    const {setToast, setLoading} = useOutletContext()
    return (
        <Outlet context={{setToast, setLoading}} />
    )
}

export default InventoryLayout;