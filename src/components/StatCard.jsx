function StatCard(props){
    return (
        <>
            <div className="flex flex-col gap-[5px] flex-1 rounded-md p-[10px] bg-[#3B38A0]/80 min-h-[120px]">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">{props.title}</span>
                    <div className={`${props.color} p-[5px] rounded-md `}>
                        {props.icon}
                    </div> 
                </div>
                <span className="font-semibold text-[20px]">{`${props.money ? '$' : ''} ${Number(props.data.data1).toLocaleString()}`}</span>
                {props.data.data2 && <span className={`text-sm mt-1 ${props.data.data2 > 0 ? 'text-green-600' : 'text-red-600'}`}>{props.data.data2 > 0 ? "+" : '' } {`${props.data.data2}% vs last month`}</span>}
            </div>
        </>
    )
}

export default StatCard