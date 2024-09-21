import { memo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

function Sidebar({ onClickFn }) {
    const location = useLocation();
    const currentPath = location.pathname.substring(7);
    const [userDropdown, setUserDropdown] = useState(false);

    return (
        <>
            <div className="fixed w-[0px] overflow-hidden top-0 h-[100vh] lg:static transition-all duration-300 lg:w-[300px] sidebar"></div>
            <aside className="fixed top-0 left-0 bottom-0 z-[9999] shadow-lg w-[0px] lg:w-[258px] transition-all duration-300 overflow-hidden bg-white fixedSidebar">
                <div className="h-[80px] px-4 py-2 flex justify-between items-center outline outline-[1px] outline-gray-200">
                    <div>
                        <img className="w-28" src="https://themesflat.co/html/remos/images/logo/logo.png" />
                    </div>
                    <div onClick={onClickFn} className="cursor-pointer">
                        <i className="fa-regular fa-circle-left text-2xl transition-all duration-300 text-gray-400 hover:text-blue-400"></i>
                    </div>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
                    <div className="mb-10 mt-4">
                        <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
                            Main
                        </h3>

                        <Link to="/admin/dashboard"
                              className={'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                                  ((currentPath === 'dashboard') && ' !bg-gray-200')
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                            Dashboard
                        </Link >

                        <Link to="/admin/categories" className={
                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                            (
                                (
                                    (currentPath === 'categories') ||
                                    (currentPath === 'categories/create')
                                ) && ' !bg-gray-200'
                            )
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            Categories
                        </Link>

                        <Link to="/admin/tags" className={
                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                            (
                                (
                                    (currentPath === 'tags') ||
                                    (currentPath === 'tags/create')
                                ) && ' !bg-gray-200'
                            )
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            Tags
                        </Link>

                        <Link to="/admin/posts" className={
                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                            (
                                (
                                    (currentPath === 'posts') ||
                                    (currentPath === 'posts/create')
                                ) && ' !bg-gray-200'
                            )
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            Posts
                        </Link>

                        {/* dropwodn menu */}
                        <ul className="mt-0 flex flex-col">
                            <li className="relative transition">
                                <input className="peer hidden" type="checkbox" id="menu-1" />
                                <div className="relative m-2 flex items-center rounded-xl border-b-4 border-gray-300 bg-gray-50 py-3 pl-5 text-sm text-gray-500">
                                    <span className="mr-5 flex w-5 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="currentColor" d="M13 19h6V9.978l-7-5.444-7 5.444V19h6v-6h2v6zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z" />
                                        </svg>
                                    </span>
                                    User Management
                                    <label htmlFor="menu-1" className="absolute inset-0 h-full w-full cursor-pointer"></label>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="peer-checked:rotate-180 absolute right-0 top-6 mr-5 ml-auto h-4 text-gray-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                <ul className="duration-400 peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden transition-all duration-300">
                                    <li className="cursor-pointer rounded-xl py-2 text-sm text-gray-500">
                                        <Link to="/admin/users" className={
                                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                                            (
                                                (
                                                    (currentPath === 'users') ||
                                                    (currentPath === 'users/create')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            Users
                                        </Link>
                                    </li>

                                    <li className="cursor-pointer rounded-xl pb-2 text-sm text-gray-500">
                                        <Link to="/admin/roles" className={
                                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                                            (
                                                (
                                                    (currentPath === 'roles') ||
                                                    (currentPath === 'roles/create')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            Roles
                                        </Link>
                                    </li>

                                    <li className="cursor-pointer rounded-xl pb-2 text-sm text-gray-500">
                                        <Link to="/admin/permissions" className={
                                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                                            (
                                                (
                                                    (currentPath === 'permissions') ||
                                                    (currentPath === 'permissions/create')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                            </svg>
                                            Permissions
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Most commented
                        </a>

                    </div>
                    <div className="mb-10">
                        <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
                            Library
                        </h3>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            Favorites
                        </a>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Watch later
                        </a>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            History
                        </a>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Scheduled
                        </a>

                    </div>
                    <div className="mb-10">
                        <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
                            Following
                        </h3>

                        <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
                            <img src="https://picsum.photos/200" alt="" className="w-7 h-7 rounded-full mr-2"/>
                                MD Riaz
                        </a>

                    </div>

                </div>
            </aside>
        </>
    );
}

export default memo(Sidebar);
