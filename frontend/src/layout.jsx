import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./context/UserContext";

function Layout(){
    const {user} = useContext(UserContext);


    return(
            <div className="flex flex-col">
                <Header isLoggedIn={user}/>
                <Outlet />
            </div>
    )
}

export default Layout;
