import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from, to, subject, html } = body;

    // 从.env文件中读取API密钥和端点
    const apiKey = process.env.RESENDER_API_KEY;
    const apiEndpoint = process.env.RESENDER_API_ENDPOINT || 'https://api.resend.com/emails';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API密钥未配置，请在.env文件中设置RESENDER_API_KEY' },
        { status: 500 }
      );
    }

    if (!from || !to || !subject || !html) {
      return NextResponse.json(
        { error: '邮件信息不完整，请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 调用Resend API发送邮件
    const response = await axios.post(
      apiEndpoint,
      {
        from,
        to,
        subject,
        html,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('发送邮件失败:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || error.message || '发送邮件失败' },
      { status: error.response?.status || 500 }
    );
  }
} 