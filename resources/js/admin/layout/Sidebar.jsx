import { memo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

function Sidebar({ onClickFn }) {
    const location = useLocation();
    const currentPath = location.pathname.substring(7);

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
                                    (currentPath === 'categories/create') ||
                                    currentPath.includes('categories/edit')
                                ) && ' !bg-gray-200'
                            )
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Iconly/Curved/Category">
                                    <g id="Category">
                                        <path id="Stroke 1" fillRule="evenodd" clipRule="evenodd" d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Stroke 3" fillRule="evenodd" clipRule="evenodd" d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Stroke 5" fillRule="evenodd" clipRule="evenodd" d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Stroke 7" fillRule="evenodd" clipRule="evenodd" d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </g>
                            </svg>
                            Categories
                        </Link>

                        <Link to="/admin/tags" className={
                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                            (
                                (
                                    (currentPath === 'tags') ||
                                    (currentPath === 'tags/create') ||
                                    currentPath.includes('tags/edit')
                                ) && ' !bg-gray-200'
                            )
                        }>
                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 3H11.5118C12.2455 3 12.6124 3 12.9577 3.08289C13.2638 3.15638 13.5564 3.27759 13.8249 3.44208C14.1276 3.6276 14.387 3.88703 14.9059 4.40589L20.5 10M7.5498 10.0498H7.5598M9.51178 6H8.3C6.61984 6 5.77976 6 5.13803 6.32698C4.57354 6.6146 4.1146 7.07354 3.82698 7.63803C3.5 8.27976 3.5 9.11984 3.5 10.8V12.0118C3.5 12.7455 3.5 13.1124 3.58289 13.4577C3.65638 13.7638 3.77759 14.0564 3.94208 14.3249C4.1276 14.6276 4.38703 14.887 4.90589 15.4059L8.10589 18.6059C9.29394 19.7939 9.88796 20.388 10.5729 20.6105C11.1755 20.8063 11.8245 20.8063 12.4271 20.6105C13.112 20.388 13.7061 19.7939 14.8941 18.6059L16.1059 17.3941C17.2939 16.2061 17.888 15.612 18.1105 14.9271C18.3063 14.3245 18.3063 13.6755 18.1105 13.0729C17.888 12.388 17.2939 11.7939 16.1059 10.6059L12.9059 7.40589C12.387 6.88703 12.1276 6.6276 11.8249 6.44208C11.5564 6.27759 11.2638 6.15638 10.9577 6.08289C10.6124 6 10.2455 6 9.51178 6ZM8.0498 10.0498C8.0498 10.3259 7.82595 10.5498 7.5498 10.5498C7.27366 10.5498 7.0498 10.3259 7.0498 10.0498C7.0498 9.77366 7.27366 9.5498 7.5498 9.5498C7.82595 9.5498 8.0498 9.77366 8.0498 10.0498Z" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Tags
                        </Link>

                        <Link to="/admin/posts" className={
                            'flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group' +
                            (
                                (
                                    (currentPath === 'posts') ||
                                    (currentPath === 'posts/create') ||
                                    currentPath.includes('posts/edit')
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                            </path>
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
                                                    (currentPath === 'users/create') ||
                                                    currentPath.includes('users/edit')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <g id="add-user-left-6" transform="translate(-2 -2)">
                                                    <path id="primary" d="M11,3.41A5.11,5.11,0,0,1,13,3a5,5,0,1,1-4.59,7" fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                    <path id="primary-2" data-name="primary" d="M7,5H3M5,7V3m9,10H12a7,7,0,0,0-7,7H5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1h0A7,7,0,0,0,14,13Z" fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                </g>
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
                                                    (currentPath === 'roles/create') ||
                                                    currentPath.includes('roles/edit')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
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
                                                    (currentPath === 'permissions/create') ||
                                                    currentPath.includes('permissions/edit')
                                                ) && ' !bg-gray-200'
                                            )
                                        }>
                                            <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                            Permissions
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-10">
                        {/* settings */}
                    </div>
                </div>
            </aside>
        </>
    );
}

export default memo(Sidebar);
