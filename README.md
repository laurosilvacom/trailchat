# AI Fullstack Applications with Next.js Demo App

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

- shadcn/ui
- Responsive design principles

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

## 🌟 Core Principles

### 1. Debuggability-First Development

We embrace Sentry's philosophy that monitoring alone isn't enough. Throughout
this course, you'll learn to:

- 🔍 Implement proactive error detection
- 📊 Gather actionable context for rapid issue resolution
- 🚀 Optimize performance with real-time insights

### 2. End-to-End Tracing

In our distributed AI-powered application, we'll demonstrate:

- 📈 Transaction tracking across the full stack
- 🔗 Correlation between AI operations and user interactions
- 🕵️ Root cause analysis in complex scenarios

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [AI SDK](https://sdk.vercel.ai/docs)
- [Sentry](https://sentry.io/)

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
