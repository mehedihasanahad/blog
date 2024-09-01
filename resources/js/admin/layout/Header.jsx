import { memo } from "react";

function Header({ onClickFn }) {
    return (
      <header className="h-[80px] sticky top-0 z-[99] bg-white">
        <div className="flex justify-between items-center px-6 h-full">
          {/* left side content */}
          <div className="flex gap-3 items-center h-full">
            <div onClick={onClickFn} className="cursor-pointer lg:hidden hamburger">
                <i className="fa-solid fa-right-to-bracket text-2xl transition-all duration-300 text-gray-400 hover:text-blue-400"></i>
            </div>

            <form className="hidden lg:block">
              <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="focus:outline-none block p-3 pl-10 w-[700px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search here..." required />
                <button type="submit" className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
          </div>

          {/* Right side content */}
          <div>
            Profile etc
          </div>
        </div>
      </header>
    );
}

export default memo(Header);
