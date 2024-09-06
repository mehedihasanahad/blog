import DataTables from "@/admin/components/dataTable";

export default function Blog() {
    const config = {
        header: [
            'SL',
            'Title',
            'Slug',
            'Categories',
            'Tags',
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
                            <p className="text-sm text-slate-500"> { item['title'] } </p>
                        </td>
                        <td className="px-3 py-2">
                            <p className="text-sm text-slate-500"> { item?.slug } </p>
                        </td>
                        <td className="px-3 py-2">
                            <div className="text-sm text-slate-500">
                                {
                                    item?.categories && item?.categories.map( (category) => {
                                        return (
                                            <div className={"w-fit p-1 border rounded mt-1 ml-1 inline-block bg-gray-600 text-white"} key={category?.id}>
                                                {category?.name}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </td>
                        <td className="px-3 py-2">
                            <div className="text-sm text-slate-500">
                                {
                                    item?.tags && item?.tags.map( (tag) => {
                                        return (
                                            <div className={"w-fit p-1 border rounded mt-1 ml-1 inline-block bg-yellow-600 text-white"} key={tag?.id}>
                                                {tag?.name}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </td>
                        <td className="px-3 py-2">
                            {
                                item?.is_published ?
                                <div className="px-3 py-[2px] border rounded bg-green-600 text-white inline-block">Published</div> :
                                <div className="px-3 py-[2px] border rounded bg-red-600 text-white inline-block">Hidden</div>
                            }
                        </td>
                        <td className="p-4 py-5">
                            <button className="px-3 py-1 border rounded bg-pink-600 text-white">Edit</button>
                        </td>
                    </tr>
                );
            });
        }
    }

    return (
        <DataTables endPoint="posts" config={config}/>
    )
}
