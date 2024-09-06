export default function Table({ data, config }) {
    return (
        <table className="w-full text-left table-auto min-w-max">
        <thead>
            <tr>
                {config?.header && config.header.map((head, index) => {
                    return (
                        <th className="p-4 border-b border-slate-200 bg-slate-50" key={index}>
                            <p className="text-sm font-normal leading-none text-slate-500">
                                {head}
                            </p>
                        </th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
            {config?.handler && config.handler(data)}
        </tbody>
    </table>
    );
}
