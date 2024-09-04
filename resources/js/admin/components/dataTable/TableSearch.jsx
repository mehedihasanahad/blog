export default function TableSearch( { onInput } ) {
    return (
        <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
                <input
                    className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none border-slate-400 hover:border-slate-400 shadow-md"
                    placeholder="Search"
                    onInput={(e) => onInput(1, 10, e.currentTarget.value)}
                />
            </div>
        </div>
    );
}
