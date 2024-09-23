import DataTables from "@/admin/components/dataTable";
import {Link} from "react-router-dom";
import { userInfoContext } from "../../../store";
import { useContext, useState } from "react";
import { useFormData } from "@/helper";
import toast from 'react-hot-toast';

export default function Permission() {
    // const userInfo = useContext(userInfoContext);
    // console.log(userInfo);

    function handleDelete(id) {
        toast.loading('Loading...');
        $axios.post(`permissions/${id}`, useFormData({
            _method: 'DELETE'
        })).then(res => {
            toast.dismiss();
            toast.success(res?.data.message ?? 'Success');
        })
        .catch(e => {
            toast.dismiss();
            toast.error(e?.response?.data?.message);
            e?.response?.data?.errors && setErrors({...e.response.data.errors});
        })
    }

    const config = {
        header: [
            'SL',
            'Name',
            'Guard Name',
            'Actions'
        ],
        handler: (data) => {
            return data && data.map( (item, index) => {
                return (
                    <tr className="hover:bg-slate-50 border-b border-slate-200" key={item?.id_enc}>
                        <td className="px-3 py-2">
                            <p className="block font-semibold text-sm text-slate-800"> { index + 1 } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.name } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.guard_name } </p>
                        </td>
                        <td className="p-4 py-5">
                            <Link to={'/admin/permissions/edit/' + item?.id_enc} state={item} className="px-3 py-1 border rounded bg-pink-600 text-white">Edit</Link>
                            <button onClick={() => handleDelete(item.id_enc)} className="px-3 py-1 border rounded bg-red-600 text-white ml-3">Delete</button>
                        </td>
                    </tr>
                );
            });
        }
    }

    return (
        <>
           <div className="flex justify-end mb-2">
                <Link to="/admin/permissions/create" className="custom-btn-sky-600">Create Permission</Link>
            </div>
            <DataTables endPoint="permissions" config={config}/>
        </>
    )
}
