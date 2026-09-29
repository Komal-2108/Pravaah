import React, { useState } from 'react';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { DemoDirectorBar } from './DemoDirectorBar';

export const AppShell = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-clay-bg text-clay-forest font-sans">
      
      {/* 1. Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        <SidebarNav />
      </div>

      {/* 2. Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-clay-forest/50 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full bg-clay-cream z-10 shadow-2xl">
            <SidebarNav onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* 3. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto pb-24">
          {children}
        </main>
      </div>

      {/* Floating Demo Bar */}
      <DemoDirectorBar />
    </div>
  );
};
