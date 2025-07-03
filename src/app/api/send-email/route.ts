import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, content, cc, bcc, from } = body;

    // 验证必要的字段
    if (!to || !subject || !content || !from) {
      return NextResponse.json(
        { error: '收件人、主题、内容和发件人为必填项' },
        { status: 400 }
      );
    }

    // 使用环境变量获取API密钥和端点
    const apiKey = process.env.RESENDER_API_KEY;
    const apiEndpoint = process.env.RESENDER_API_ENDPOINT || 'https://api.resend.com/emails';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API密钥未配置，请在环境变量中设置RESENDER_API_KEY' },
        { status: 500 }
      );
    }

    // 构建邮件数据
    const emailData = {
      from,
      to,
      subject,
      html: content,
    };

    // 添加可选字段
    if (cc) emailData.cc = cc;
    if (bcc) emailData.bcc = bcc;

    // 发送邮件请求
    const response = await axios.post(apiEndpoint, emailData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: '邮件发送成功',
      data: response.data 
    });
    
  } catch (error) {
    console.error('发送邮件时出错:', error);
    return NextResponse.json(
      { error: '发送邮件时出错', details: error.message },
      { status: 500 }
    );
  }
} 