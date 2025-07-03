import { NextResponse } from 'next/server';

export async function GET() {
  // 从.env文件中读取配置
  const apiKey = process.env.RESENDER_API_KEY || null;
  const apiEndpoint = process.env.RESENDER_API_ENDPOINT || 'https://api.resend.com/emails';

  // 返回配置信息，但不直接返回完整的API密钥
  return NextResponse.json({
    apiKey: apiKey ? true : false, // 只返回是否配置了API密钥
    apiKeyPreview: apiKey ? `${apiKey.slice(0, 4)}xxxx${apiKey.slice(-4)}` : null,
    apiEndpoint,
  });
} 