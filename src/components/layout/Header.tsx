'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MdSearch, MdRefresh, MdOutlineSettings, MdOutlineHelp, MdMenu } from 'react-icons/md';

export default function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 border-b flex items-center px-4 bg-background">
      <div className="flex items-center gap-4 w-full">
        {toggleSidebar && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <MdMenu size={24} />
          </Button>
        )}
        
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">Resender</span>
        </Link>
        
        <div className="flex-1 max-w-2xl mx-auto relative">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="搜索邮件"
              className="pl-10 bg-muted/30 focus-visible:bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="刷新">
            <MdRefresh size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="设置" asChild>
            <Link href="/settings">
              <MdOutlineSettings size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" title="帮助" asChild>
            <Link href="/help">
              <MdOutlineHelp size={20} />
            </Link>
          </Button>
          <div className="ml-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            U
          </div>
        </div>
      </div>
    </header>
  );
} 