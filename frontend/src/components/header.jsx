import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"

export default function Header({isLoggedIn}){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <div className='w-[97vw] flex justify-between py-3 shadow-lg px-2'>
            <h1 className="font-extrabold text-xl text-orange-400">IGNIS</h1>
            <div className='flex justify-between w-[30%]'>
                <NavLink to={'/events'}
                         className={({isActive}) => (
                         (isActive)? 'text-orange-500': 'text-slate-600'
                        )}>
                    Events
                </NavLink>
                <NavLink to={'/likedevents'}
                         className={({isActive}) => (
                            (isActive)? 'text-orange-500': 'text-slate-600'
                        )}>
                        Liked-Events
                </NavLink>
                <NavLink to={'/yourevents'}
                         className={({isActive}) => (
                            (isActive)? 'text-orange-500': 'text-slate-600'
                        )}>
                        Your-Events
                </NavLink>
                {isLoggedIn?
                <p>{user.username}</p>:
                <NavLink to={'/login'}
                className={({isActive}) => (
                    (isActive)? 'text-orange-500': 'text-slate-600'
                )}>
                login
                </NavLink>}
                {isLoggedIn&&<p
                className='cursor-pointer'
                onClick={()=>{
                setUser(null);
                navigate('/events')
                }}>logout</p>}
            </div>
        </div>
    )
}