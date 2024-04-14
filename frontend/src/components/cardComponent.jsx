
export default function Card({eventName, datetime, location, imgSrc}){
    return (
    <div className="w-[20vw] h-72 shadow-lg rounded-md overflow-hidden">
        <div className="h-[50%]">
            <img crossOrigin="anonymous" src={imgSrc} alt="img" className='object-fill h-full' width='100%' />
        </div>
        <div className="mt-2 p-2">
            <p className="text-slate-700 font-extrabold">{eventName}</p>
            <p className="text-slate-400 italic">On: {datetime.split('T').join(',')}</p>
            <p className="text-slate-500 italic">At: {location}</p>
        </div>
    </div>
    )
}