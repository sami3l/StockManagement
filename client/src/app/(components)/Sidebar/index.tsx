"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/redux";
import { Archive, CircleDollarSign, Layout, LucideIcon, Menu, SlidersHorizontal ,Clipboard,  } from "lucide-react";
import Link  from "next/link";
import { setisSidebarCollapsed } from "../../../state";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import logo from '../../logo.png'



interface SidebarLinkProps{
  href : string;
  icon : LucideIcon;
  label : string;
  isCollapsed : boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed
} : SidebarLinkProps)=>{
  
  const pathname = usePathname();
  const isActive = pathname === href || pathname === "/" && href === "/dashboard";

  return(
    <Link href={href}>
       <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
          hover:text-green-500 hover:bg-green-100 gap-3 transition-colors ${isActive ? "bg-green-500 text-white" : ""}`}>
         <Icon className="w-6 h-6 !text-gray-700"/>

         <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
          {label}
         </span>
       </div>
    </Link> 
  )
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setisSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16 " : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >  
      <Image
      src={logo}
      width={35}
      height={35}
      alt="Picture of the author"
    />
         
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          ManageStock
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      {/* NAVIGATION LINK */}
      <div className="flex-grow mt-8">
        <SidebarLink href='/dashboard ' icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href='/products ' icon={Archive} label="Products" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href='/stock ' icon={Clipboard} label="Stock" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href='/expenses ' icon={CircleDollarSign} label="Expences" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href='/settings ' icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed} />
        
         {/* <SidebarLink href='/users ' icon={User} label="Users" isCollapsed={isSidebarCollapsed} /> */}
      </div>
    
      {/* BOTTOM */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
        © 2024 Sami Elhadraoui
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
