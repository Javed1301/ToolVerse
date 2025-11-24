import React from "react";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar (Fixed on desktop, hidden on mobile) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
         <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Mobile Header to toggle Sidebar */}
        <div className="lg:hidden mb-6">
           <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
           </label>
        </div>
        
        {children}
      </main>

      {/* Mobile Drawer (Optional: you can hook this up to the same Sidebar component if you want a drawer effect) */}
       <div className="drawer-side lg:hidden z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <Sidebar />
      </div>
    </div>
  );
}