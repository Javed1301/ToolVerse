"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Video, 
  Info, 
  Mail, 
  LogOut,
  Sparkles
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Gallery", href: "/home", icon: LayoutDashboard },
    { name: "Social Share", href: "/social-share", icon: ImageIcon },
    { name: "Video Upload", href: "/video-upload", icon: Video },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    // 1. CHANGED: h-full (Forces it to fill the Drawer height)
    // 2. CHANGED: w-full (Fills the parent <aside> width)
    <div className="flex flex-col h-full w-full bg-base-200 text-base-content border-r border-base-300">
      
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-center border-b border-base-300 shrink-0">
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-primary-content" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-base-content group-hover:text-primary transition-colors">
            ToolVerse
          </span>
        </Link>
      </div>

      {/* Menu Items */}
      {/* flex-grow pushes the footer down, BUT ONLY if parent has h-full */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <ul className="menu p-0 gap-2"> {/* Added DaisyUI menu class for better spacing */}
            {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
                <li key={item.href}>
                <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                    ${
                        isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-300 hover:text-primary"
                    }
                    `}
                >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                </Link>
                </li>
            );
            })}
        </ul>
      </div>

      {/* Footer / Logout */}
      {/* shrink-0 ensures this doesn't get squished if screen is tiny */}
      <div className="p-4 bg-base-200 border-t border-base-300 space-y-4 shrink-0">
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-between px-4">
            <span className="font-medium text-sm opacity-70">Theme</span>
            <ThemeToggle className="dropdown-top dropdown-end" />
        </div>

        <SignOutButton>
            <button className="btn btn-ghost w-full flex items-center justify-start gap-4 text-error hover:bg-error/10">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
            </button>
        </SignOutButton>
      </div>

    </div>
  );
};

export default Sidebar;