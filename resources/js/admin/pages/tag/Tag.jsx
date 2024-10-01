import DataTables from "@/admin/components/dataTable";
import {Link} from "react-router-dom";
import { usePermissionCheck } from "../../../helper";

export default function Tag() {
    const hasPermission = usePermissionCheck();
    const config = {
        header: [
            'SL',
            'Name',
            'Slug',
            'Status',
        ],
        handler: function(data) {
            hasPermission("tag-edit") && (this.header.includes('Actions') ?  '': this.header.push('Actions'));
            return data && data.map( (item, index) => {
                return (
                    <tr className="hover:bg-slate-50 border-b border-slate-200" key={item?.id}>
                        <td className="px-3 py-2">
                            <p className="block font-semibold text-sm text-slate-800"> { index + 1 } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.name } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.slug } </p>
                        </td>
                        <td className="px-3 py-2">
                            {
                                item?.status ?
                                    <div className="px-3 py-[2px] border rounded bg-green-600 text-white inline-block">Active</div> :
                                    <div className="px-3 py-[2px] border rounded bg-red-600 text-white inline-block">Inactive</div>
                            }
                        </td>

                        {
                            hasPermission("tag-edit") &&
                            <td className="p-4 py-5">
                                <Link to={'/admin/tags/edit/' + item?.id} state={item} className="px-3 py-1 border rounded bg-pink-600 text-white">Edit</Link>
                            </td>
                        }
                        
                    </tr>
                );
            });
        }
    }

    return (
        <>
            {
                hasPermission("tag-create") &&
                <div className="flex justify-end mb-2">
                    <Link to="/admin/tags/create" className="custom-btn-sky-600">Create Tag</Link>
                </div>
            }
            <DataTables endPoint="tags" config={config}/>
        </>
    )
}
