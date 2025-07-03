'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MdRefresh, MdOutlineDelete } from 'react-icons/md';

// 空的邮件列表
const mockSentEmails = [];

// 格式化日期函数
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
  }
}

export default function SentPage() {
  const [emails, setEmails] = useState(mockSentEmails);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  
  const toggleSelectEmail = (id: string) => {
    setSelectedEmails(prev => 
      prev.includes(id) 
        ? prev.filter(emailId => emailId !== id)
        : [...prev, id]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };
  
  const deleteSelected = () => {
    setEmails(prev => prev.filter(email => !selectedEmails.includes(email.id)));
    setSelectedEmails([]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">已发送</h1>
        <Button variant="outline" size="sm" onClick={() => {}} className="flex items-center gap-1">
          <MdRefresh size={16} />
          <span>刷新</span>
        </Button>
      </div>
      
      {selectedEmails.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-muted/30 rounded-md">
          <span className="text-sm text-muted-foreground">
            已选择 {selectedEmails.length} 封邮件
          </span>
          <div className="flex-1"></div>
          <Button variant="ghost" size="sm" onClick={deleteSelected} className="text-destructive">
            <MdOutlineDelete size={16} className="mr-1" />
            删除
          </Button>
        </div>
      )}
      
      <Card className="overflow-hidden">
        <div className="border-b p-2 flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-3 h-4 w-4"
              checked={selectedEmails.length === emails.length && emails.length > 0}
              onChange={toggleSelectAll}
              aria-label="全选邮件"
              disabled={emails.length === 0}
            />
            <span className="text-sm text-muted-foreground">全选</span>
          </label>
        </div>
        
        <div className="divide-y">
          <div className="p-8 text-center text-muted-foreground">
            没有已发送的邮件
          </div>
        </div>
      </Card>
    </div>
  );
} 