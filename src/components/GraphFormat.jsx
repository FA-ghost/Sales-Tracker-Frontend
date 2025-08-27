function GraphFormat (props){
    return (
        <>
            <div className="flex flex-col gap-[5px] flex-1 p-[10px] md:p-[15px] rounded-md bg-[#E0E0E6] min-h-[400px]">
                <span className="font-semibold">{props.title}</span>
                <div className="flex-1 min-h-0">
                    {props.data?.labels?.length > 0 && (
                        props.graph
                    )}
                </div>
            </div>
            

        </>
    )
}

export default GraphFormat