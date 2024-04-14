import Card from "./cardComponent"
import { useState, useEffect } from "react"

export default function Public(){
    let [data, setData] = useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/events').
        then((res)=>res.json().
        then((res)=>setData(res)))
    },[])

    const cardItems = data.map((cardData)=>{
        return (
            <Card 
             key = {cardData.id}
             eventName={cardData.eventName.toUpperCase()}
             datetime={cardData.dateTime}
             location={cardData.location}
             imgSrc={cardData.coverPicture}/>
        )
    })
    return(
        <div className='py-12 px-10 grid grid-cols-4 w-[97vw] h-[88vh] gap-5 overflow-auto'>
            {cardItems}
        </div>
    )
}