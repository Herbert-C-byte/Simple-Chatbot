import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: 'google/gemma-4-26b-a4b-it:free',
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant. Be concise and friendly.' },
        ...messages
      ]
    })
  })

  const data = await response.json()
  console.log(JSON.stringify(data, null, 2))
  const reply = data.choices[0].message.content
  res.json({ reply })
})

app.listen(3001, () => console.log('Server running on port 3001'))