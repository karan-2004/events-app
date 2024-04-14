import { useState, useContext } from "react"
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api-token-auth/',
        {method : 'post',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
         body: JSON.stringify({
            'username':username,
            'password':password
        })}
        ).then(res => res.json())
        .then(data => {
            setUser(data.user_id);
            navigate('/events')
        })
    }

    return (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-[40%] p-auto">
            <form className="flex flex-col p-4 w-[40%] bg-orange-400 mx-[30%] my-[18%] italic rounded-sm">
                <label htmlFor="username">username:</label>
                <input 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                type="text" 
                id="username" />
                <label htmlFor="password">password:</label>
                <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                id="password" />
                <button 
                type="submit"
                onClick={handleSubmit}>login</button>
            </form>
        </div>
    )
}