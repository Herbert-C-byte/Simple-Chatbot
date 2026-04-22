# 💬 Simple Chatbot

A modern and responsive customer support chatbot built with React + Vite on the frontend and Express.js on the backend. Uses AI API integration for intelligent response generation.

## 🌟 Features

- ✨ **Modern responsive interface** - Floating chat widget with intuitive design
- 🤖 **AI integration** - Powered by advanced language models
- 📱 **Mobile-first** - Fully optimized for mobile devices
- 🎨 **Tailwind CSS** - Modern and customizable styling
- ⚡ **Vite** - Fast build and hot module replacement (HMR)
- 🔒 **CORS configured** - Security in frontend-backend communication
- 🚀 **Easy to use** - Simple setup and rapid development

## 📋 Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **API Key** (for AI service integration)

## 🚀 Installation

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**
   Create a `.env` file in the project root.

## 💻 Development

### Run frontend and backend together

```bash
npm run dev:all
```

### Run frontend only

```bash
npm run dev
```

### Run backend only

```bash
npm run server
```

## API

### POST `/api/chat`

Send a message to the chatbot and receive a response.

**Request:**

```json
{
  "messages": [{ "role": "user", "content": "Hello, how can I help?" }]
}
```

**Response:**

```json
{
  "reply": "Hello! I'm here to help with your inquiries."
}
```

## 🎨 Customization

Modify the chatbot behavior by editing the server configuration and adjusting the system prompts as needed.

## 🚀 Deployment

### Frontend

```bash
npm run build
```

### Backend

Deploy to your preferred hosting platform with proper environment configuration.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Contributions

Contributions are welcome!
