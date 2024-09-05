export default function Table({ data }) {
    return (
        <table className="w-full text-left table-auto min-w-max">
        <thead>
        <tr>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    SL
                </p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    Title
                </p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    Slug
                </p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    Categories
                </p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    Tags
                </p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                    Actions
                </p>
            </th>
        </tr>
        </thead>
        <tbody>
        {
            data ? data.map( (item, index) => {
                return (
                    <tr className="hover:bg-slate-50 border-b border-slate-200" key={item?.id}>
                        <td className="p-4 py-5">
                            <p className="block font-semibold text-sm text-slate-800"> { index + 1 } </p>
                        </td>
                        <td className="p-4 py-5">
                            <p className="text-sm text-slate-500"> { item?.title } </p>
                        </td>
                        <td className="p-4 py-5">
                            <p className="text-sm text-slate-500"> { item?.slug } </p>
                        </td>
                        <td className="p-4 py-5">
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
                        <td className="p-4 py-5">
                            <div className="text-sm text-slate-500">
                                {
                                    item?.tags && item?.tags.map( (tag) => {
                                        return (
                                            <div className={"w-fit p-1 border rounded mt-1 ml-1 inline-block bg-green-600 text-white"} key={tag?.id}>
                                                {tag?.name}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </td>
                        <td className="p-4 py-5">
                            <button className="px-3 py-1 border rounded bg-pink-600 text-white">Edit</button>
                        </td>
                    </tr>
                );
            }) : null
        }
        </tbody>
    </table>
    );
}
