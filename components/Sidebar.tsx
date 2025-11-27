"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Image as ImageIcon, 
  Video, 
  LogOut,  
  LayoutDashboard, // New: For Gallery
  Info,            // New: For About
  Mail             // New: For Contact Us
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
// import { usePathname } from "next/navigation"; // Don't forget this import

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: Home }, // Public Landing Page
    { name: "Gallery", href: "/home", icon: LayoutDashboard }, // The User's Main Dashboard
    { name: "Social Share", href: "/social-share", icon: ImageIcon },
    { name: "Video Upload", href: "/video-upload", icon: Video },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact-us", icon: Mail }, // Note: Ensure this href matches your folder name (app/contact)
  ];

  return (
    <div className="drawer lg:drawer-open w-auto z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side h-full">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="bg-base-200 text-base-content w-64 min-h-screen flex flex-col border-r border-base-300">
          {/* Logo Area */}
          <div className="p-6 flex items-center justify-center border-b border-base-300">
            <Link href="/home" className="flex items-center gap-2 group">
              {/* Icon Box */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              
              {/* Text */}
              <span className="font-bold text-4xl tracking-tight text-base-content group-hover:text-primary transition-colors">
                ToolVerse
              </span>
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="menu p-4 flex-grow gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

         {/* Footer / Logout */}
<div className="p-4 bg-base-300 border-t border-base-100 space-y-4">

     {/* Theme Toggle Row */}
        
        <div className="flex items-center justify-between px-4">
            <span className="font-medium text-sm">Theme</span>
            {/* 'dropdown-top' forces it up, 'dropdown-end' aligns it to the right */}
            <ThemeToggle className="dropdown-top dropdown-end" />
        </div>

        <SignOutButton>
            <button className="btn btn-ghost w-full flex items-center justify-start gap-4 text-error hover:bg-error/10">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
            </button>
        </SignOutButton>
    </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;