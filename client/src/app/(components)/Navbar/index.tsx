"use client";
import Link from "next/link";
import { Menu, Moon, Settings } from "lucide-react";

import { Search, Sun, Bell } from "lucide-react";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setisDarkMode, setisSidebarCollapsed } from "../../../state";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setisSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setisDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 ">
      {/* Left */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-green-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            className="pl-10 px-4 py-2 w-50 md:w-60 rounded-full bg-gray-100 focus:outline-none"
            placeholder="Start typing to search..."
          />
          <button
            className=" flex absolute right-0 top-0 px-2 py-2 bg-gray-100 rounded-full hover:bg-green-100"
            onClick={() => {}}
          >
            <Search/>
          </button>
        </div>
      </div>
      {/* Right */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500 " size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500 " size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500 " size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-dark-100 bg-red-400 rounded-full  ">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className=" w-9 h-9">
            <UserButton />
            </div>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
