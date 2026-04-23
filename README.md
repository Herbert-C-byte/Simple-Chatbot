# Simple Chatbot Widget

A lightweight AI-powered chat widget built for customer support. Features a
fallback system across 3 AI models — if one fails, the next takes over
automatically.

**Stack:** React + Tailwind CSS (frontend) · Node.js + Express (backend) ·
OpenRouter API (AI layer)

---

## Features

- Real-time chat interface
- AI fallback system (3 models in sequence)
- Loading states and smooth auto-scroll
- Easy to embed and configure

---

## Setup

### Prerequisites
- Node.js installed
- An [OpenRouter](https://openrouter.ai) API key

### Installation

```bash
git clone https://github.com/Herbert-C-byte/simple-chatbot
cd simple-chatbot
npm install
```

### Environment

Create a `.env` file in the root:
OPENROUTER_API_KEY=your_key_here
### Running

Open two terminals:

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — backend
npm run server
```

App runs at `http://localhost:5173`

---

## Project Structure
simple-chatbot/
├── server/
│   └── index.js        # Express server + AI integration
├── src/
│   ├── components/
│   │   └── chat-widget.jsx
│   └── App.jsx
└── .env                # Not committed — create locally
---

## Issues

Found a bug? Open an issue and I'll look into it.