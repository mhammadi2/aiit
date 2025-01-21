'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
  Send,
  Sparkles,
  Book,
  MessageCircle,
  Info,
  Settings,
  Download,
  Copy,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('general')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `As an AI assistant, I'm here to help answer your questions about Islamic topics with respect and accuracy. Please note that for specific religious rulings, it's best to consult with qualified scholars.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Islamic
                <span className='block text-emerald-300'>AI Assistant</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Get instant answers to your Islamic questions with our
                AI-powered assistant, backed by authentic sources.
              </p>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/ai-assistant.jpg'
                  alt='AI Assistant'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='grid lg:grid-cols-4 gap-8'>
            {/* Sidebar */}
            <div className='lg:col-span-1 space-y-6'>
              {/* Topics Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Topics</CardTitle>
                  <CardDescription>Choose a topic to discuss</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a topic' />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 text-sm text-gray-600'>
                    {guidelines.map((guideline, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <Info className='w-4 h-4 mt-1 text-emerald-600' />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main Chat Interface */}
            <div className='lg:col-span-3'>
              <Card className='h-[800px] flex flex-col'>
                <CardHeader>
                  <CardTitle>AI Assistant Chat</CardTitle>
                  <CardDescription>
                    Ask questions about Islamic topics
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col'>
                  {/* Messages Container */}
                  <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`text-xs mt-2 ${
                              message.role === 'user'
                                ? 'text-emerald-100'
                                : 'text-gray-400'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className='flex justify-start'>
                        <div className='bg-white border border-gray-200 rounded-lg p-4'>
                          <div className='flex items-center space-x-2'>
                            <div className='w-2 h-2 bg-emerald-500 rounded-full animate-bounce' />
                            <div className='w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100' />
                            <div className='w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200' />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className='flex gap-4'>
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder='Type your question here...'
                      className='flex-1'
                    />
                    <Button
                      type='submit'
                      className='bg-emerald-500 hover:bg-emerald-600'
                      disabled={isLoading}
                    >
                      <Send className='w-4 h-4 mr-2' />
                      Send
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const topics = [
  { id: 'general', name: 'General Questions' },
  { id: 'quran', name: 'Quran & Tafsir' },
  { id: 'hadith', name: 'Hadith Studies' },
  { id: 'fiqh', name: 'Islamic Law (Fiqh)' },
  { id: 'aqeedah', name: 'Islamic Beliefs' },
  { id: 'history', name: 'Islamic History' },
  { id: 'ethics', name: 'Islamic Ethics' },
]

const guidelines = [
  'Ask clear and specific questions',
  'Responses are based on authentic sources',
  'For complex rulings, consult scholars',
  'Be respectful and patient',
  'Verify information independently',
]
