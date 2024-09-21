import DataTables from "@/admin/components/dataTable";
import {Link} from "react-router-dom";
import { userInfoContext } from "../../../store";
import { useContext } from "react";

export default function User() {
    // const userInfo = useContext(userInfoContext);
    // console.log(userInfo);

    const config = {
        header: [
            'SL',
            'Username',
            'Email',
            'Status',
            'Actions'
        ],
        handler: (data) => {
            return data && data.map( (item, index) => {
                return (
                    <tr className="hover:bg-slate-50 border-b border-slate-200" key={item?.id}>
                        <td className="px-3 py-2">
                            <p className="block font-semibold text-sm text-slate-800"> { index + 1 } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.username } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.email } </p>
                        </td>
                        <td className="px-3 py-2">
                            {
                                (item?.status === 0) && <div className="px-3 py-[2px] border rounded bg-red-400 text-white inline-block">Inactive</div>
                            }
                            {
                                (item?.status === 1) && <div className="px-3 py-[2px] border rounded bg-green-600 text-white inline-block">Active</div>
                            }
                            {
                                (item?.status === 2) && <div className="px-3 py-[2px] border rounded bg-red-600 text-white inline-block">Blocked</div>
                            }
                        </td>
                        <td className="p-4 py-5">
                            <Link to={'/admin/users/edit/' + item?.id_enc} state={item} className="px-3 py-1 border rounded bg-pink-600 text-white">Edit</Link>
                        </td>
                    </tr>
                );
            });
        }
    }

    return (
        <>
            <div className="flex justify-end mb-2">
                <Link to="/admin/users/create" className="custom-btn-sky-600">Create User</Link>
            </div>
            <DataTables endPoint="users" config={config}/>
        </>
    )
}
