# AI-Powered Chat Application Demo

> A demonstration application for the course "Build AI-Powered Fullstack
> Applications with Next.js"

## 🚀 Overview

This application showcases the integration of AI capabilities into a modern web
application using Next.js, AI SDK, and Sentry for monitoring. It features a
dynamic chat interface powered by large language models and demonstrates best
practices for error tracking and performance monitoring.

## 📚 Course Milestones

### 1. Introduction

- Overview of course objectives
- Introduction to AI SDK and LLMs
- Setting up the development environment

### 2. Building the Base Application

- Integration of LLMs
- Implementation of AI SDK Core
- Text generation fundamentals
- Basic application structure setup

### 3. Initial Deployment & Error Tracking

- Initial application deployment
- Sentry integration basics
- Setting up error tracking
- Configuring performance monitoring

### 4. Building & Deploying an AI-Powered Chat Interface

- Chat interface construction
- AI SDK UI components implementation
- Deployment with chat features
- Sentry monitoring for chat functionality

### 5. Styling the Application

- Tailwind CSS implementation
- Radix UI component integration
- Responsive design principles
- Deploying styled application

### 6. Performance Optimization

- React Server Components implementation
- Advanced routing techniques
- Performance bottleneck identification
- Sentry performance monitoring

### 7. Final Deployment & Monitoring

- Full application deployment
- Advanced Sentry configuration
- Continuous monitoring setup
- Error tracking optimization

### 8. Wrapping Up

- Course recap
- Best practices review
- Future application considerations
- Next steps and resources

## ✨ Features

- 💬 AI-powered chat interface
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🔍 Real-time error tracking with Sentry
- ⚡ Optimized performance using React Server Components
- 📱 Responsive design for all devices

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [AI SDK](https://sdk.vercel.ai/docs)
- [Sentry](https://sentry.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- OpenAI API key
- Sentry account

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-demo.git
```

2. Install dependencies:

```bash
cd ai-chat-demo
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:

```
OPENAI_API_KEY=your_api_key_here
SENTRY_DSN=your_sentry_dsn_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

| Variable         | Description             |
| ---------------- | ----------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key     |
| `SENTRY_DSN`     | Your Sentry project DSN |

## 🔧 Configuration

### Sentry Setup

This application uses Sentry for error tracking and performance monitoring. To
configure Sentry:

1. Create a project in Sentry
2. Add your DSN to the environment variables
3. Configure additional settings in `sentry.config.js`

### AI SDK Configuration

The AI SDK is configured in `app/api/chat/route.ts`. You can modify the model
and parameters according to your needs.

## 📦 Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   ├── components/
│   ├── styles/
│   └── page.tsx
├── public/
├── sentry.config.js
└── tailwind.config.js
```

## 🎯 Target Audience

- Web developers interested in integrating AI capabilities
- Developers proficient in React/Next.js looking to level up
- Individuals interested in AI-powered web experiences

## 🏗️ Course Prerequisites

- Basic understanding of JavaScript and React fundamentals
- Familiarity with Next.js application structure
- No prior AI SDK experience required

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the
[issues page](link-to-issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
