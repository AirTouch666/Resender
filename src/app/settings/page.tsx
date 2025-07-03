'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

// 简单直接的API密钥掩码函数
function maskApiKey(apiKey: string | null): string {
  if (!apiKey) return '未配置';
  
  // 无论长度如何，只保留前4位和后4位，中间用4个x替代
  if (apiKey.length <= 8) {
    return apiKey; // 如果太短就直接返回
  }
  
  const firstFour = apiKey.slice(0, 4);
  const lastFour = apiKey.slice(-4);
  return `${firstFour}xxxx${lastFour}`;
}

export default function SettingsPage() {
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean>(false);
  const [apiKeyPreview, setApiKeyPreview] = useState<string | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从API获取配置信息
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/config');
        setApiKeyConfigured(response.data.apiKey);
        setApiKeyPreview(response.data.apiKeyPreview);
        setApiEndpoint(response.data.apiEndpoint);
      } catch (error) {
        console.error('获取配置信息失败', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">设置</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API 配置</CardTitle>
          <CardDescription>
            当前配置信息（从.env文件读取）
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
                  {apiKeyConfigured ? apiKeyPreview : '未配置'}
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
                在项目根目录创建 <code className="bg-muted px-1 py-0.5 rounded">.env</code> 文件，添加以下环境变量:
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