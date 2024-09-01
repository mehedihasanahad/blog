import { memo } from "react";

function Sidebar({ onClickFn }) {
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
            </aside>
        </>
    );
}

export default memo(Sidebar);
