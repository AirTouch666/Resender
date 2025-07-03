'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// 函数用于隐藏API密钥中间部分
const maskApiKey = (apiKey: string | null): string => {
  if (!apiKey || apiKey === '未配置') return '未配置';
  if (apiKey === '已配置') return '已配置';
  
  // 如果API密钥长度小于8，只显示第一个和最后一个字符
  if (apiKey.length < 8) {
    return `${apiKey.substring(0, 1)}${'x'.repeat(apiKey.length - 2)}${apiKey.substring(apiKey.length - 1)}`;
  }
  
  // 显示前4个字符和后4个字符，中间用x代替
  const maskedLength = apiKey.length - 8;
  return `${apiKey.substring(0, 4)}${'x'.repeat(maskedLength)}${apiKey.substring(apiKey.length - 4)}`;
};

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 获取环境变量信息（仅用于显示）
    const fetchEnvVars = async () => {
      setIsLoading(true);
      try {
        // 在实际应用中，这些值会从环境变量中获取
        // 这里我们只是模拟显示
        setApiKey(process.env.NEXT_PUBLIC_RESENDER_API_KEY || 'test_api_key_12345678');
        setApiEndpoint(process.env.NEXT_PUBLIC_RESENDER_API_ENDPOINT || 'https://api.resend.com/emails');
      } catch (error) {
        console.error('获取配置信息失败', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnvVars();
  }, []);

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">设置</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API 配置</CardTitle>
          <CardDescription>
            当前配置信息（从环境变量读取）
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p>加载配置信息中...</p>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">API 密钥</h3>
                <p className="text-sm text-muted-foreground">
                  {maskApiKey(apiKey)}
                </p>
                <p className="text-xs text-muted-foreground">
                  环境变量名: RESENDER_API_KEY
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">API 端点</h3>
                <p className="text-sm text-muted-foreground">
                  {apiEndpoint || '未配置'}
                </p>
                <p className="text-xs text-muted-foreground">
                  环境变量名: RESENDER_API_ENDPOINT
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>配置说明</CardTitle>
          <CardDescription>
            如何配置 Resender
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">本地或 Docker 运行</h3>
              <p className="text-sm text-muted-foreground mb-2">
                在项目根目录创建 <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> 文件，添加以下环境变量:
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                RESENDER_API_KEY=your_api_key_here<br/>
                RESENDER_API_ENDPOINT=https://api.resend.com/emails
              </pre>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Vercel 部署</h3>
              <p className="text-sm text-muted-foreground mb-2">
                在 Vercel 项目设置中，添加以下环境变量:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                <li>RESENDER_API_KEY</li>
                <li>RESENDER_API_ENDPOINT</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">发件人邮箱</h3>
              <p className="text-sm text-muted-foreground">
                发件人邮箱可以在写邮件时直接填写，无需在环境变量中配置。请确保使用的是在 Resend 验证过的域名邮箱。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 