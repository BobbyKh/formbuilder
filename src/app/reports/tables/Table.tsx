"use client";

import { ClipboardIcon, ClockIcon, Pencil, Share, Trash } from "lucide-react";
import React, { useState } from "react";

const ReportTable = () => {
    // State to track which row's dropdown is open
    const [openMenu, setOpenMenu] = useState(null);

    // Toggle the dropdown for a specific row
    const actionMenu = (sn: any) => {
        setOpenMenu(openMenu === sn ? null : sn); // Toggle the menu for the clicked row
    };

    const demoData = [
        {
            sn: 1,
            date: "2023-10-01",
            position: "Software Engineer",
            name: "John Doe",
            phoneNumber: "123-456-7890",
            address: "123 Main St, Anytown, USA 12345",
            department: "Engineering",
            resume: "Link to Resume",
            experience: "5 years"
        },
        {
            sn: 2,
            date: "2023-10-02",
            position: "UI/UX Designer",
            name: "Jane Smith",
            phoneNumber: "987-654-3210",
            address: "456 Elm St, Othertown, USA 54321",
            department: "Design",
            resume: "Link to Resume",
            experience: "3 years"
        }
    ];

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200 mt-3">
                <thead className="bg-gray-50">
                    <tr>
                        {["S.N", "Date", "Position", "Name", "Phone Number", "Address", "Department", "Resume", "Experience", "Actions"].map((header) => (
                            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-1/3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {demoData.map((data) => (
                        <tr key={data.sn}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.sn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.position}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.phoneNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.resume}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.experience}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => actionMenu(data.sn)} // Pass row's unique identifier
                                            aria-haspopup="true"
                                            aria-expanded={openMenu === data.sn ? "true" : "false"}
                                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                            id="options-menu"
                                        >
                                            <span className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full">
                                                <span className="sr-only">Open options menu</span>
                                                ...
                                            </span>
                                        </button>
                                    </div>

                                    {openMenu === data.sn && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <div className="py-1">
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 items-center" role="menuitem">
                                                    <Share className="h-4 w-4 mr-2" /> Sortlist
                                                </a>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 items-center" role="menuitem">
                                                    <ClockIcon className="h-4 w-4 mr-2" /> Reject
                                                </a>
                                                <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center" role="menuitem">
                                                    <ClipboardIcon className="h-4 w-4 mr-2" /> Hold
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
