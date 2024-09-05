import {useRef, useState, useEffect} from "react";

export default function Pagination( { data, onClick, currentPage } ) {
    const btnListWrapper = useRef("");

    useEffect(() => {
        data && handlePageClickFn(currentPage);
    }, [currentPage]);

    function handlePageClickFn(page) {
        [].forEach.call(btnListWrapper.current.children, (btn, index) => {
            if (index === (page)) {
                btn.classList.remove('text-slate-500', 'bg-white', 'border-slate-200', 'hover:bg-slate-50', 'hover:border-slate-400');
                btn.classList.add('text-white', 'bg-slate-800', 'border-slate-800', 'hover:bg-slate-600','hover:border-slate-600');
            } else {
                btn.classList.remove('text-white', 'bg-slate-800', 'border-slate-800', 'hover:bg-slate-600','hover:border-slate-600');
                btn.classList.add('text-slate-500', 'bg-white', 'border-slate-200', 'hover:bg-slate-50', 'hover:border-slate-400');
            }
        });
    }

    function handleNextPrev(btnType) {
        (btnType === 'prev') ? onClick(() => currentPage - 1) : onClick(() => currentPage + 1);
    }

    return (
        <div className="flex space-x-1" ref={btnListWrapper}>
            <button
                onClick={ () => handleNextPrev('prev')}
                disabled={currentPage === 1}
                className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
            </button>
            {
                data?.last_page && [...Array(data?.last_page)].map((page, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal border
                            ${(index === 0) ? 'text-white bg-slate-800 border-slate-800 hover:bg-slate-600 hover:border-slate-600' :
                                'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-400'}
                                rounded transition duration-200 ease`}
                            onClick={ (e) => onClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    );
                })
            }
            <button
                onClick={ () => handleNextPrev('next')}
                disabled={currentPage === data?.last_page}
                className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
            </button>
        </div>
    );
}
