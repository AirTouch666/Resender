'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleMobileSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* 移动端侧边栏 */}
        <div 
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden ${
            isMobileSidebarOpen ? 'block' : 'hidden'
          }`}
          onClick={toggleMobileSidebar}
        />
        
        <div 
          className={`fixed inset-y-0 left-0 z-50 md:relative md:z-0 md:block transition-transform duration-300 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar />
        </div>
        
        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* 全局通知组件 */}
      <Toaster position="top-right" />
    </div>
  );
} 