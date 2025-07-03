'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  MdOutlineSend, 
  MdOutlineDrafts, 
  MdOutlineDelete, 
  MdOutlineSettings,
  MdAdd
} from 'react-icons/md';

const sidebarItems = [
  { icon: <MdOutlineSend size={20} />, label: '已发送', path: '/sent' },
  { icon: <MdOutlineDrafts size={20} />, label: '草稿箱', path: '/drafts' },
  { icon: <MdOutlineDelete size={20} />, label: '已删除', path: '/trash' },
  { icon: <MdOutlineSettings size={20} />, label: '设置', path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`bg-muted/30 h-full flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r`}>
      <div className="p-4">
        <Button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground" asChild>
          <Link href="/compose">
            <MdAdd size={20} />
            {!isCollapsed && <span>写邮件</span>}
          </Link>
        </Button>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={index}>
                <Link 
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full flex justify-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '›' : '‹'}
        </Button>
      </div>
    </div>
  );
} 