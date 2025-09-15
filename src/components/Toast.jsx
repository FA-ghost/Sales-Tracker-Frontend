import { useEffect } from "react";

function Toast({type="success", message, onClose}){

    if (!message) return null

    useEffect(() =>{
        const Timer = setTimeout(() => onClose(), 3000)

        return () => clearTimeout(Timer)
    }, [onClose])


    const baseStyles = `fixed bottom-6 right-6 px-6 py-4 rounded-xl z-50 transition-all duration-300 font-semibold text-sm`;
    const glassStyles = `backdrop-blur-md bg-opacity-70 shadow-lg`;

    const typeStyles = {
        success: "bg-green-600 text-white border border-green-300",
        error: "bg-red-600 text-white border border-red-300",
    };

    return (
        <>
            <div className={`${baseStyles} ${glassStyles} ${typeStyles[type]}`}>
                {message}
            </div>
        </>
    )
}

export default Toast;