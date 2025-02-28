'use client';

import { ChartBarIcon, ClipboardIcon, ClockIcon, FormInputIcon, LayoutDashboard, ListIcon, MessageCircleIcon, UserIcon, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-64"
        }`}
        id="sidebar"
      >
        <div className="flex items-center justify-between text-white">
          <button
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger icon */}
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
          </button>
        </div>

        <nav className="mt-4 space-y-4">
          <ul className="space-y-2 flex flex-col">
            <li className="text-white flex justify-center">
              <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" alt="Logo" className="h-24 w-auto rounded-lg" />
            </li>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="h-6 w-6 mr-2" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/profile" className="flex items-center">
                <UserIcon className="h-6 w-6 mr-2" />
                <span>My Account</span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/pages" className="flex items-center">
                <ListIcon className="h-6 w-6 mr-2" />
                <span>Pages</span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/forms" className="flex items-center">
                <FormInputIcon className="h-6 w-6 mr-2" />
                <span>Forms</span>
              </Link>
            </li>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/campaigns" className="flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2" />
                <span>Campaigns</span>
              </Link>
            </li>
            <div className="border-t border-gray-600 my-4"></div>
            <ul className="space-y-2">
              <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
                <Link href="/reports" className="flex items-center">
                  <ClipboardIcon className="h-6 w-6 mr-2" />
                  <span>Reports</span>
                </Link>
              </li>
              <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
                <Link href="/meetings" className="flex items-center">
                  <ClockIcon className="h-6 w-6 mr-2" />
                  <span>Meetings</span>
                </Link>
              </li>
              <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
                <Link href="/interviews" className="flex items-center">
                  <Video className="h-6 w-6 mr-2" />
                  <span>Interviews</span>
                </Link>
              </li>
              <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
                <Link href="/customer-supports" className="flex items-center">
                  <MessageCircleIcon className="h-6 w-6 mr-2" />
                  <span>Customer Supports</span>
                </Link>
              </li>
            </ul>
            <li className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-gray-500 py-2">
              <Link href="/profile" className="flex items-center">
                <UserIcon className="h-6 w-6 mr-2" />
                <span>Profile</span>
              </Link>
            </li>
              <Link href="/login">
                <button className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg">
                  <span className="text-center text-white">Logout</span>
                </button>
              </Link>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <button
          className="lg:hidden fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
        >
          {/* Icon for hamburger menu */}
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
        </button>

        {/* Replace with actual content */}
        {children}
      
      </div>
    </div>
  );
};

export default Sidebar;
