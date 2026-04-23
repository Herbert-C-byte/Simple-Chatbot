import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
]

async function callAI(messages, modelIndex = 0) {
  if (modelIndex >= MODELS.length) {
    throw new Error('All models failed')
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: MODELS[modelIndex],
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant. Be concise and friendly.' },
        ...messages
      ]
    })
  })

  const data = await response.json()

  if (data.error) {
    console.log(JSON.stringify(data, null, 2))
    console.log(`Model ${MODELS[modelIndex]} failed, trying next...`)
    return callAI(messages, modelIndex + 1)
  }

  return data.choices[0].message.content
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  try {
    const reply = await callAI(messages)
    res.json({ reply })
  } catch (error) {
    res.status(500).json({ error: 'All models unavailable. Try again later.' })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))