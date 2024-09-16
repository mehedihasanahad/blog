import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from './Header.jsx';
import Sidebar from "./Sidebar.jsx";
import { useCallback, useEffect, useState } from "react";
import {Toaster} from "react-hot-toast";
import { userInfoContext } from "../../store/index.js";

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const toggleSidebarFn = useCallback(() => {
        toggleSidebar();
    }, []);

    useEffect(() => {
        $axios.get('get-userinfo')
        .then((response) => {
            setUserInfo(response.data.data);
        }).catch((error) => {
            console.error(error.response.message);
            navigate('/admin/login');
        });
    }, []);

    

    return (
        <div className="flex transition-all duration-300 h-[100vh]">
            <userInfoContext.Provider value={userInfo}>
                <Sidebar onClickFn={toggleSidebarFn}/>
                <div className="w-full">
                    <Header onClickFn={toggleSidebarFn}/>
                    <main className="bg-[#EEF3F8] p-7 min-h-[calc(100vh-8.75rem)]">
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                        <Outlet/>
                    </main>
                    <Footer/>
                </div>
            </userInfoContext.Provider>
        </div>
    )
}

/**
 * Toggle sidebar
 * @return void
 */
function toggleSidebar() {
    const fixedSidebar = document.querySelector('.fixedSidebar');
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');

    // fake sidebar handling
    sidebar.classList.toggle('lg:w-[300px]');
    sidebar.classList.toggle('lg:w-0');

    // sidebar open btn handling
    hamburger.classList.toggle('lg:hidden');

    // fixed sidebar handling
    fixedSidebar?.classList?.toggle('lg:w-[258px]');
    fixedSidebar?.classList?.toggle('lg:w-0');

    // fixed sidebar handling on small screen
    fixedSidebar?.classList?.toggle('w-0');
    fixedSidebar?.classList?.toggle('w-[260px]');
}
