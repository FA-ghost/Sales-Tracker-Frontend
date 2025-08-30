import logo from "../assets/logo2.jpg";
import "../App.css"

function Loader(){
    return (
        <>
            <div className="w-full h-[100vh] flex justify-center items-center transition-all duration-700 ease-out ">
                <img src={logo} alt="Loader Image" className="w-[300px] h-[300px] rounded-full transition-all duration-300 ease-in-out animate-fade" />
            </div>
        </>
    )
}

export default Loader