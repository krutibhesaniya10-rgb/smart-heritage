"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, MapPin, Clock, Calendar, Navigation, Users, Loader2, Ticket, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

// Heritage places data for quick options
const heritagePlaces = [
  { id: "1", name: "Ancient Temple Complex" },
  { id: "2", name: "Royal Fortress" },
  { id: "3", name: "Palace of Mirrors" },
  { id: "4", name: "Sacred Gardens" },
  { id: "5", name: "Victory Monument" },
]

const quickQuestions = [
  { icon: Clock, text: "Best time to visit", query: "best time" },
  { icon: Calendar, text: "Upcoming events", query: "events" },
  { icon: Navigation, text: "How to reach", query: "directions" },
  { icon: Ticket, text: "Ticket prices", query: "tickets" },
  { icon: Users, text: "Crowd levels", query: "crowd" },
]

// Smart responses based on keywords
const getSmartResponse = (query: string): { text: string; links?: Array<{ text: string; href: string }> } => {
  const lowerQuery = query.toLowerCase()

  // Specific heritage place queries
  if (lowerQuery.includes("ancient temple") || lowerQuery.includes("temple complex")) {
    return {
      text: "The Ancient Temple Complex is a magnificent 12th-century temple known for its intricate carvings and spiritual significance.\n\nKey Information:\n- Entry Fee: $15 (Students: $7.50)\n- Timings: 6:00 AM - 6:00 PM\n- Best Time: 9 AM - 11 AM (Low crowd)\n- Location: Heritage Valley\n\nWould you like to explore more or plan a visit?",
      links: [{ text: "View Details", href: "/heritage/1" }]
    }
  }

  if (lowerQuery.includes("royal fortress") || lowerQuery.includes("fortress")) {
    return {
      text: "The Royal Fortress is a historic citadel perched on a hilltop with panoramic views of the surrounding landscape.\n\nKey Information:\n- Entry Fee: $20 (Students: $10)\n- Timings: 9:00 AM - 5:00 PM\n- Best Time: 3 PM - 5 PM (Moderate crowd)\n- Location: Hill District\n\nThe fortress offers guided tours every hour.",
      links: [{ text: "View Details", href: "/heritage/2" }]
    }
  }

  if (lowerQuery.includes("palace of mirrors") || lowerQuery.includes("palace") || lowerQuery.includes("mirrors")) {
    return {
      text: "The Palace of Mirrors is a stunning 17th-century palace famous for its mirror-studded walls and royal heritage.\n\nKey Information:\n- Entry Fee: $25 (Students: $12.50)\n- Timings: 10:00 AM - 7:00 PM\n- Best Time: 5 PM - 7 PM (Evening light)\n- Location: Cultural Quarter\n\nPhotography is allowed without flash.",
      links: [{ text: "View Details", href: "/heritage/3" }]
    }
  }

  if (lowerQuery.includes("sacred gardens") || lowerQuery.includes("gardens")) {
    return {
      text: "The Sacred Gardens is a serene heritage garden with ancient trees, meditation spots, and historical monuments.\n\nKey Information:\n- Entry Fee: $10 (Students: $5)\n- Timings: 5:00 AM - 8:00 PM\n- Best Time: Early morning for meditation\n- Location: Riverside\n\nPerfect for peaceful walks and photography.",
      links: [{ text: "View Details", href: "/heritage/4" }]
    }
  }

  if (lowerQuery.includes("victory monument") || lowerQuery.includes("monument")) {
    return {
      text: "The Victory Monument is a grand memorial commemorating historical victories with impressive architecture.\n\nKey Information:\n- Entry Fee: $12 (Students: $6)\n- Timings: 8:00 AM - 6:00 PM\n- Best Time: Sunset for best views\n- Location: Central Square\n\nLight and sound show every evening at 7 PM.",
      links: [{ text: "View Details", href: "/heritage/5" }]
    }
  }

  // Heritage places general
  if (lowerQuery.includes("heritage") || lowerQuery.includes("places") || lowerQuery.includes("sites") || lowerQuery.includes("monuments") || lowerQuery.includes("list")) {
    return {
      text: "We have over 500 heritage sites to explore! Here are some popular ones:\n\n1. Ancient Temple Complex - 12th-century temple\n2. Royal Fortress - Historic hilltop fortress\n3. Palace of Mirrors - Stunning 17th-century palace\n4. Sacred Gardens - Serene heritage garden\n5. Victory Monument - Grand memorial\n\nWould you like details about any specific site?",
      links: [{ text: "View Map", href: "/map" }]
    }
  }

  // Best time to visit / Crowd prediction
  if (lowerQuery.includes("best time") || lowerQuery.includes("when") || lowerQuery.includes("crowd") || lowerQuery.includes("busy")) {
    return {
      text: "For the best experience, I recommend visiting during these times:\n\nLow Crowd Hours:\n- Morning: 6 AM - 9 AM\n- Late Afternoon: 4 PM - 6 PM\n\nBest Days:\n- Monday to Thursday (40% fewer visitors)\n\nAvoid:\n- Weekends (especially 11 AM - 2 PM)\n- Public holidays\n\nCheck our Crowd Prediction page for real-time data!",
      links: [{ text: "Check Crowd Levels", href: "/crowd-prediction" }]
    }
  }

  // Events
  if (lowerQuery.includes("event") || lowerQuery.includes("festival") || lowerQuery.includes("celebration") || lowerQuery.includes("upcoming")) {
    return {
      text: "Upcoming Cultural Events:\n\n1. Heritage Festival (Next Week)\n   - Traditional dance, music & crafts\n   - Location: Various heritage sites\n\n2. Temple Ceremony (This Weekend)\n   - Sacred rituals & celebrations\n   - Location: Ancient Temple Complex\n\n3. Cultural Night (Monthly)\n   - Evening performances\n   - Location: Palace of Mirrors\n\nBook your spot early!",
      links: [{ text: "View All Events", href: "/events" }]
    }
  }

  // Directions / Location
  if (lowerQuery.includes("direction") || lowerQuery.includes("reach") || lowerQuery.includes("location") || lowerQuery.includes("how to get") || lowerQuery.includes("where")) {
    return {
      text: "Getting to Heritage Sites:\n\nTransport Options:\n- Public Bus: Routes available from Central Station\n- Metro: Heritage Line stops near major sites\n- Taxi/Ride-share: Available 24/7\n- Parking: Available at all major sites\n\nUse our interactive Map page for detailed directions to any site!",
      links: [{ text: "Open Map", href: "/map" }]
    }
  }

  // Virtual tour
  if (lowerQuery.includes("virtual") || lowerQuery.includes("tour") || lowerQuery.includes("360") || lowerQuery.includes("online") || lowerQuery.includes("gallery")) {
    return {
      text: "Explore Heritage Sites Virtually!\n\nOur Virtual Tour features:\n- High-quality heritage images\n- Detailed historical information\n- Interactive lightbox view\n- Category-based filtering\n\nPerfect for planning your visit or exploring from home!",
      links: [{ text: "Start Virtual Tour", href: "/virtual-tour" }]
    }
  }

  // Tickets / Entry fee
  if (lowerQuery.includes("ticket") || lowerQuery.includes("price") || lowerQuery.includes("entry") || lowerQuery.includes("fee") || lowerQuery.includes("cost")) {
    return {
      text: "Entry Fees for Popular Sites:\n\n- Ancient Temple Complex: $15\n- Royal Fortress: $20\n- Palace of Mirrors: $25\n- Sacred Gardens: $10\n- Victory Monument: $12\n\nDiscounts Available:\n- Students: 50% off\n- Seniors (60+): 30% off\n- Groups (10+): 20% off\n- Children under 5: Free",
    }
  }

  // Timing / Hours
  if (lowerQuery.includes("timing") || lowerQuery.includes("hours") || lowerQuery.includes("open") || lowerQuery.includes("close")) {
    return {
      text: "Opening Hours:\n\nTemples: 6:00 AM - 6:00 PM\nForts & Palaces: 9:00 AM - 5:00 PM\nGardens: 5:00 AM - 8:00 PM\nMonuments: 8:00 AM - 6:00 PM\n\nNote: Hours may vary during festivals and holidays. Check individual site pages for accurate timings.",
      links: [{ text: "View Sites", href: "/map" }]
    }
  }

  // Plan visit / Trip
  if (lowerQuery.includes("plan") || lowerQuery.includes("trip") || lowerQuery.includes("itinerary")) {
    return {
      text: "Plan Your Perfect Heritage Trip!\n\nOur Trip Planner helps you:\n- Select up to 5 heritage places\n- Auto-generate 2-3 day itinerary\n- View optimized routes\n- Get travel time estimates\n\nClick below to start planning!",
      links: [{ text: "Open Trip Planner", href: "/trip-planner" }]
    }
  }

  // Greetings
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey") || lowerQuery === "help") {
    return {
      text: "Hello! Welcome to Heritage Explorer.\n\nI can help you with:\n- Heritage place information\n- Best visiting times\n- Ticket prices\n- Directions & locations\n- Cultural events\n- Virtual tours\n- Trip planning\n\nHow can I assist you today?"
    }
  }

  // Thank you
  if (lowerQuery.includes("thank") || lowerQuery.includes("thanks")) {
    return {
      text: "You're welcome! Is there anything else I can help you with? Feel free to ask about heritage sites, events, or plan your visit."
    }
  }

  // Default response
  return {
    text: "I can help you with:\n\n- Heritage places & monuments\n- Best visiting times\n- Ticket prices & timings\n- Directions & locations\n- Cultural events\n- Virtual tours\n- Trip planning\n\nTry asking about a specific heritage place like \"Tell me about Ancient Temple\" or \"What's the ticket price?\""
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFirstInteraction, setIsFirstInteraction] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: "welcome",
        text: "Hello! I can help you explore heritage places. Select a place below to learn more, or ask me anything!",
        isBot: true,
        timestamp: new Date(),
      }])
    }
  }, [isOpen, messages.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    // Remove first interaction state after any message
    setIsFirstInteraction(false)

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay with variable timing
    const typingDelay = 800 + Math.random() * 500
    setTimeout(() => {
      const response = getSmartResponse(text)
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickQuestion = (query: string) => {
    sendMessage(query)
  }

  const handlePlaceSelect = (place: typeof heritagePlaces[0]) => {
    sendMessage(`Tell me about ${place.name}`)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#5e3417] text-white shadow-lg hover:bg-[#8c623b] transition-all hover:scale-110 flex items-center justify-center ${isOpen ? "hidden" : "flex"}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5d222c] rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="bg-[#5e3417] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8c623b] flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Tourism Assistant</h3>
              <span className="text-xs text-white/70 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online - Ready to help
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9edd2]/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${message.isBot
                    ? "bg-white text-[#5e3417] rounded-tl-none shadow-sm border border-[#d4c4a8]/50"
                    : "bg-[#5e3417] text-white rounded-tr-none"
                  }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <span className={`text-[10px] mt-1 block ${message.isBot ? "text-[#8c623b]" : "text-white/70"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Heritage Places Quick Options - Only shown on first interaction */}
          {isFirstInteraction && messages.length > 0 && !isTyping && (
            <div className="animate-fade-in">
              <p className="text-xs text-[#8c623b] mb-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Popular Heritage Places:
              </p>
              <div className="flex flex-wrap gap-2">
                {heritagePlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handlePlaceSelect(place)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#d4c4a8] text-[#5e3417] text-xs font-medium hover:bg-[#8c623b] hover:text-white hover:border-[#8c623b] transition-all shadow-sm"
                  >
                    <MapPin className="w-3 h-3" />
                    {place.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-[#d4c4a8]/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#8c623b] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#8c623b] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#8c623b] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-[#8c623b]">Typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>


        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-[#d4c4a8] bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about heritage places..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#f9edd2] text-[#5e3417] placeholder:text-[#8c623b]/50 outline-none focus:ring-2 focus:ring-[#8c623b]/30 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[#5e3417] hover:bg-[#8c623b] disabled:opacity-50"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
