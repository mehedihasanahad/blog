import {useRef, useState} from "react";

export default function Pagination( { data, onClick } ) {
    const [currentPage, setCurrentPage] = useState(1);
    const btnListWrapper = useRef("");

    function handlePageClickFn(currentIndex) {
        [].forEach.call(btnListWrapper.current.children, (btn, index) => {
            if (index === (currentIndex + 1)) {
                btn.classList.remove('text-slate-500', 'bg-white', 'border-slate-200', 'hover:bg-slate-50', 'hover:border-slate-400');
                btn.classList.add('text-white', 'bg-slate-800', 'border-slate-800', 'hover:bg-slate-600','hover:border-slate-600');
            } else {
                btn.classList.add('text-slate-500', 'bg-white', 'border-slate-200', 'hover:bg-slate-50', 'hover:border-slate-400');
                btn.classList.remove('text-white', 'bg-slate-800', 'border-slate-800', 'hover:bg-slate-600','hover:border-slate-600');
            }
        });
        onClick((currentIndex + 1), data.per_page);

        setCurrentPage((currentIndex + 1));
    }

    function handleNextPrev(btnType) {
        let page = (btnType === 'prev') ? (currentPage - 2) : currentPage;

        handlePageClickFn(page);
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
                data?.last_page ? [...Array(data?.last_page)].map((page, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal border
                            ${(index === 0) ? 'text-white bg-slate-800 border-slate-800 hover:bg-slate-600 hover:border-slate-600' :
                                'text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-400'}
                                rounded transition duration-200 ease`}
                            onClick={ (e) => handlePageClickFn(index)}
                        >
                            {index + 1}
                        </button>
                    );
                }) : null
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
