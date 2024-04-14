import UserContext from "../context/UserContext";
import Card from "./cardComponent";
import { useEffect, useState, useContext } from "react";

export default function YourEvents(){
    let [data, setData] = useState([]);
    let {user} = useContext(UserContext);
    const url = "http://127.0.0.1:8000/events?postedBy="+user.id;

    useEffect(()=>{
        fetch(url).
        then((res)=>res.json().
        then((res)=>setData(res)))
    },[])

    console.log(data)

    const cardItems = data&&data.map((cardData)=>{
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
