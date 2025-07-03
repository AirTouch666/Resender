'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MdArrowBack, MdDelete, MdForward } from 'react-icons/md';

// 模拟已发送邮件数据
const sentEmails = [
  {
    id: 's1',
    recipient: 'client@example.com',
    recipientName: '客户',
    subject: '关于项目进度的更新',
    content: `<p>尊敬的客户，</p>
              <p>我想向您提供关于我们项目的最新进展。</p>
              <p>我们已经完成了第一阶段的开发工作，包括：</p>
              <ul>
                <li>用户界面设计</li>
                <li>核心功能实现</li>
                <li>初步测试</li>
              </ul>
              <p>下一步，我们将开始第二阶段的开发，预计将在两周内完成。</p>
              <p>如果您有任何问题或建议，请随时联系我。</p>
              <p>谢谢！</p>`,
    date: '2023-11-15T10:30:00Z',
  },
  {
    id: 's2',
    recipient: 'team@company.com',
    recipientName: '团队成员',
    subject: '周会议安排',
    content: `<p>各位团队成员，</p>
              <p>请注意，本周的团队会议将在周四下午3点举行。</p>
              <p>会议议程：</p>
              <ol>
                <li>项目进度更新</li>
                <li>问题讨论</li>
                <li>下周计划</li>
              </ol>
              <p>请准时参加。</p>
              <p>谢谢！</p>`,
    date: '2023-11-14T15:45:00Z',
  },
  {
    id: 's3',
    recipient: 'support@vendor.com',
    recipientName: '供应商支持',
    subject: '服务问题咨询',
    content: `<p>您好，</p>
              <p>我们最近在使用您的服务时遇到了一些问题。具体表现为：</p>
              <ul>
                <li>连接不稳定</li>
                <li>数据同步延迟</li>
              </ul>
              <p>请问您能提供一些帮助吗？</p>
              <p>谢谢！</p>`,
    date: '2023-11-12T09:20:00Z',
  },
];

export default function EmailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [email, setEmail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟从API获取邮件数据
    const fetchEmail = () => {
      setLoading(true);
      
      // 查找匹配的邮件
      const foundEmail = sentEmails.find(e => e.id === params.id);
      
      if (foundEmail) {
        setEmail(foundEmail);
      }
      
      setLoading(false);
    };
    
    fetchEmail();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <p>加载中...</p>
      </div>
    );
  }
  
  if (!email) {
    return (
      <div className="p-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <MdArrowBack size={20} />
          </Button>
          <h1 className="text-2xl font-bold ml-2">邮件不存在</h1>
        </div>
        <p>找不到请求的邮件。可能已被删除或ID无效。</p>
      </div>
    );
  }
  
  const handleDelete = () => {
    // 实际应用中应调用API删除邮件
    router.push('/sent');
  };
  
  const handleForward = () => {
    router.push(`/compose?forward=${email.id}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <MdArrowBack size={20} />
        </Button>
        <h1 className="text-xl font-bold ml-2 truncate">{email.subject}</h1>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{email.subject}</h2>
            <p className="text-sm text-muted-foreground">
              发送至: {email.recipientName} &lt;{email.recipient}&gt;
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(email.date)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleForward} title="转发">
              <MdForward size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} title="删除" className="text-destructive">
              <MdDelete size={20} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div 
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: email.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
} 