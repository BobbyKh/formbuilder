import { Clipboard, Pencil, Trash } from "lucide-react";

const Campaign = () => {

    const demoData = [  
        {
            sn: 1,
            date: "2022-10-20",
            position: "Software Engineer",
            url: "https://example.com",
            department: "Engineering",
            status: "Active",
        },
        {
            sn: 2,
            date: "2022-10-21",
            position: "UI/UX Designer",
            url: "https://example.com",
            department: "Design",
            status: "Inactive",
        },
        {
            sn: 3,
            date: "2022-10-22",
            position: "Product Manager",    
            url: "https://example.com",
            department: "Management",
            status: "Active",
        }
    ]

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-black">Campaigns</h1>
            <table className="min-w-full divide-y divide-gray-200 mt-3">
                <thead className="bg-gray-50">
                    <tr>
                        {["S.N", "Date", "Position", "URL", "Department", "Status", "Actions"].map((header) => (
                            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-1/3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {demoData.map((data) => (
                        <tr key={data.sn}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900">
                                        {data.sn}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {data.date}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {data.position}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    <a href={data.url} className="text-indigo-600 hover:text-indigo-900">
                                        View
                                    </a>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {data.department}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {data.status}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 flex">
                                    <button className="text-indigo-600 hover:text-indigo-900">
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button className="ml-2 text-red-600 hover:text-red-900">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                    <button className="ml-2 text-blue-600 hover:text-blue-900">
                                        <Clipboard className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default Campaign;

