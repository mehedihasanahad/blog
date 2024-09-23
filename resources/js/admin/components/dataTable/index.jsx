import Table from "@/admin/components/dataTable/Table";
import Pagination from "@/admin/components/dataTable/Pagination";
import TableSearch from "@/admin/components/dataTable/TableSearch";
import {Vortex} from 'react-loader-spinner'
import {useEffect, useState} from "react";

export default function DataTables({ endPoint, config, reRender }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState('10');
    const [search, setSearch] = useState('');

    useEffect(getBlogPostsFn, [limit, page, search, reRender]);

    function getBlogPostsFn() {
        setLoading(true);
        $axios.get(`${endPoint}?page=${page}&limit=${limit}&search=${search}`)
            .then( (res) => {
                setData({
                    ...res.data.data
                });
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                alert(error?.message)
            });
    }

    return (
        <div className="mx-auto">
            <div className="w-full flex justify-between items-center mb-3 mt-1">
                <div>
                    <select className="border p-1 rounded-md" onChange={(e) => {
                        setLimit(() => e.target.value);
                        setPage(() => 1);
                    }}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="ml-3">
                    {/*search component*/}
                    <TableSearch onInput={setSearch} value={search} handlePage={setPage}/>
                </div>
            </div>

            <div
                className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">

                {
                    loading &&
                        <>
                            <div className="absolute bg-gray-50 opacity-70 h-full w-full"></div>
                            <div className="absolute top-[calc(50%-40px)] left-[calc(50%-40px)]">
                                <Vortex
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="vortex-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="vortex-wrapper"
                                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                />
                            </div>
                        </>
                }

                {/*table component*/}
                <Table data={data?.data} config={config}/>
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500 mb-4 sm:mb-0">
                        Showing {(data?.from || data?.to) ? <b>{data?.from}-{data.to}</b> : 0} of {data?.total}
                    </div>
                    {/*pagination component*/}
                    <Pagination data={data} onClick={setPage} currentPage={page}/>
                </div>
            </div>
        </div>
    );
}
