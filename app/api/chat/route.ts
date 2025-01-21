import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { message } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a knowledgeable Islamic scholar assistant. Provide accurate and respectful answers based on authentic Islamic sources.'
      },
      {
        role: 'user',
        content: message
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
