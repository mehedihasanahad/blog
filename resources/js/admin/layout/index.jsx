import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from './Header.jsx';
import Sidebar from "./Sidebar.jsx";

function toggleSidebar() {
    const fixedSidebar = document.querySelector('.fixedSidebar');
    const sidebar = document.querySelector('.sidebar');
    const humburger = document.querySelector('.humburger');

    // fake sidebar handling
    sidebar.classList.toggle('lg:w-[300px]');
    sidebar.classList.toggle('lg:w-0');

    // sidebar open btn handling
    humburger.classList.toggle('lg:hidden');

    // fixed sidebar handling
    fixedSidebar?.classList?.toggle('lg:w-[255px]');
    fixedSidebar?.classList?.toggle('lg:w-0');

    // fixed sidebar handling on small screen
    fixedSidebar?.classList?.toggle('w-0');
    fixedSidebar?.classList?.toggle('w-[260px]');
}

export default function Layout() {
    return (
        <div className="flex transition-all duration-300 h-[100vh]">
            <Sidebar onClickFn={toggleSidebar}/>
            <div className="w-full">
                <Header onClickFn={toggleSidebar}/>
                <main className="bg-[#EEF3F8] p-7 min-h-[100vh]">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    )
}
