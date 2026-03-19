"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const getSmartResponse = (_query: string) => {
  return {
    text: "I can help you with heritage places, tickets, directions, and more. Try asking something like “Best time to visit”.",
  }
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: "Hello! I can help you explore heritage places. Ask me anything!",
          isBot: true,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [isOpen])

  if (!mounted) return null

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getSmartResponse(text)

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 900)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition",
          "bg-[#5e3417] hover:bg-[#4b2912] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9b68c] focus-visible:ring-offset-2",
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed right-6 bottom-24 z-50 w-[22rem] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border bg-background shadow-2xl",
          "origin-bottom-right transition duration-200",
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Smart Heritage Chat"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-[#5e3417] px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Smart Heritage</div>
              <div className="text-xs text-white/80">Ask about places, tickets, directions</div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-md transition",
              "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-80">
          <div className="space-y-3 p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.isBot ? "justify-start" : "justify-end")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-xs",
                    msg.isBot ? "bg-muted text-foreground" : "bg-[#5e3417] text-white",
                  )}
                >
                  <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                  <div className={cn("mt-1 text-[11px] leading-none", msg.isBot ? "text-muted-foreground" : "text-white/70")}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground shadow-xs">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/70" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/50 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/30 [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(inputValue)
          }}
          className="flex items-center gap-2 border-t bg-background p-3"
        >
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question…"
            className="h-10"
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 bg-[#5e3417] text-white hover:bg-[#4b2912]"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </>
  )
}
