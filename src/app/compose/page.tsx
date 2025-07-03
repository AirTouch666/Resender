'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MdSend, MdDelete, MdArrowBack } from 'react-icons/md';

interface EmailFormValues {
  from: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  content: string;
}

export default function ComposePage() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<EmailFormValues>({
    defaultValues: {
      from: '',
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    try {
      setIsSending(true);
      
      // 处理收件人格式 (支持多个收件人，用逗号分隔)
      const formatRecipients = (recipients: string) => {
        return recipients.split(',').map(email => email.trim()).filter(Boolean);
      };
      
      const emailData = {
        from: data.from,
        to: formatRecipients(data.to),
        subject: data.subject,
        content: data.content,
      };
      
      // 添加抄送和密送（如果有）
      if (data.cc) {
        emailData.cc = formatRecipients(data.cc);
      }
      
      if (data.bcc) {
        emailData.bcc = formatRecipients(data.bcc);
      }

      // 发送请求到我们的API端点
      const response = await axios.post('/api/send-email', emailData);
      
      toast.success('邮件发送成功！');
      router.push('/sent');
    } catch (error) {
      console.error('发送邮件失败:', error);
      const errorMessage = error.response?.data?.error || '发送邮件失败，请重试';
      toast.error(errorMessage);
      
      // 如果是API密钥未配置的错误，提示用户
      if (errorMessage.includes('API密钥未配置')) {
        toast.error('请确保已在环境变量中配置API密钥');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <MdArrowBack size={20} />
        </Button>
        <h1 className="text-2xl font-bold ml-2">写邮件</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>新邮件</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>发件人</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="您的邮箱地址（必须是在Resend验证过的域名邮箱）" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>收件人</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="收件人邮箱，多个收件人请用逗号分隔" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>抄送</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="抄送邮箱，多个收件人请用逗号分隔" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bcc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密送</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="密送邮箱，多个收件人请用逗号分隔" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>主题</FormLabel>
                    <FormControl>
                      <Input placeholder="邮件主题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>内容</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="在此输入邮件内容..." 
                        className="min-h-[200px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                >
                  <MdDelete className="mr-2" size={16} />
                  取消
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSending}
                >
                  <MdSend className="mr-2" size={16} />
                  {isSending ? '发送中...' : '发送'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 