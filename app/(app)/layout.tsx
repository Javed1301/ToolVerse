import React from "react";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. MAIN WRAPPER: "lg:drawer-open" keeps it open on desktop
    <div className="drawer lg:drawer-open">
      
      {/* 2. THE HIDDEN CHECKBOX (Crucial for Mobile) */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* 3. PAGE CONTENT */}
      <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden p-4 pb-0">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </label>
        </div>

        {/* Main Children */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
        </main>
      </div> 

      {/* 4. THE SIDEBAR (Drawer Side) */}
      <div className="drawer-side z-50">
        {/* Overlay to close sidebar when clicking outside on mobile */}
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        
        {/* Sidebar Container */}
        <aside className="w-64 h-full bg-base-200 text-base-content">
            <Sidebar />
        </aside>
      </div>
    </div>
  );
}