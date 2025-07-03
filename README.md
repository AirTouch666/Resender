# Resender

Resender 是一个简单易用的发送邮件应用，使你的 resend 可以在网页发邮件，提供了类似 Gmail 的用户界面。

## 功能特点

- [x] 📧 通过网页界面发送邮件
- [ ] 📁 查看已发送的邮件记录
- [ ] 🗑 查看已删除的邮件记录
- [ ] 📂 查看草稿箱
- [x] 🔄 类似 Gmail 的用户界面
- [ ] 🌙 支持深色模式
- [x] 📱 响应式设计，适配移动端和桌面端
- [x] 🔒 安全存储 API 密钥

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Resend](https://resend.com/) - 邮件发送服务

## 配置方式

### 本地或 Docker 运行

1. 在项目根目录创建 `.env.local` 文件，添加以下环境变量：

```
RESENDER_API_KEY=your_api_key_here
RESENDER_API_ENDPOINT=https://api.resend.com/emails
```

### Vercel 部署

1. 在 Vercel 项目设置中，添加以下环境变量：
   - `RESENDER_API_KEY` - 您的邮件发送 API 密钥
   - `RESENDER_API_ENDPOINT` - API 端点（默认为 https://api.resend.com/emails）

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 使用方法

1. 在 [Resend](https://resend.com) 注册账号并获取 API 密钥
2. 根据您的部署方式配置环境变量
3. 点击"写邮件"按钮开始发送邮件
4. 在写邮件页面填写发件人邮箱（必须是在Resend验证过的域名邮箱）
5. 填写收件人、主题和内容，然后发送邮件

## 许可证

MIT
