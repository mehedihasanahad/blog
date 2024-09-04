import Table from "@/admin/components/dataTable/Table";
import Pagination from "@/admin/components/dataTable/Pagination";
import TableSearch from "@/admin/components/dataTable/TableSearch";
import {useEffect, useState} from "react";

export default function DataTables({ endPoint }) {
    const [data, setData] = useState(null);

    useEffect(getBlogPostsFn, []);

    function getBlogPostsFn(page = 1, limit = 10, search = '') {
        $axios.get(`${endPoint}?page=${page}&limit=${limit}&search=${search}`)
            .then( (res) => {
                setData({
                    ...res.data.data
                });
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
                    <select className="border p-1 rounded-md" onChange={(e) => getBlogPostsFn(1, e.target.value)}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="ml-3">
                    {/*search component*/}
                    <TableSearch onInput={getBlogPostsFn}/>
                </div>
            </div>

            <div
                className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">

                {/*table component*/}
                <Table data={data?.data}/>
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500">
                        Showing <b>1-5</b> of 45
                    </div>
                    {/*pagination component*/}
                    <Pagination data={data} onClick={getBlogPostsFn}/>
                </div>
            </div>
        </div>
    );
}
