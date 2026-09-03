'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Itinerary, AssistantMessage } from '@/lib/types'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

interface AssistantChatProps {
  itinerary: Itinerary
}

export default function AssistantChat({ itinerary }: AssistantChatProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: AssistantMessage = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], itinerary }),
      })
      if (!res.ok) {
        throw new Error('Assistant request failed')
      }
      const data = await res.json()
      const assistantMsg: AssistantMessage = { role: 'assistant', content: data.reply }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6 flex flex-col h-[400px]">
      <h3 className="text-xl font-semibold mb-4">AI Travel Assistant</h3>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <p className="text-white/50">Ask me anything about your trip, like &quot;What should I do tomorrow?&quot;</p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-brand-teal/20' : 'bg-white/10'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-xl">
              <LoadingSpinner size="sm" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="input-field flex-1"
          placeholder="Ask about your trip..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} className="btn-primary" disabled={loading}>
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}