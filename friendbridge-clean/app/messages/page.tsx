'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile, 
  Paperclip,
  Clock,
  CheckCircle,
  CheckCircle2,
  Star,
  Flag,
  ArrowLeft
} from 'lucide-react'

interface Message {
  id: string
  text: string
  timestamp: string
  isOwn: boolean
  status: 'sent' | 'delivered' | 'read'
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  status: 'online' | 'offline' | 'busy'
  messages: Message[]
  country: string
  major: string
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    lastMessage: 'Hey! Saw you\'re from Pakistan too. Want to grab coffee at Mirror Lake?',
    timestamp: '2 hours ago',
    unreadCount: 2,
    isOnline: true,
    status: 'online',
    country: 'Pakistan',
    major: 'Computer Science',
    messages: [
      {
        id: '1',
        text: 'Hey! Saw you\'re from Pakistan too. Want to grab coffee at Mirror Lake?',
        timestamp: '2:30 PM',
        isOwn: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'That sounds great! I\'m free tomorrow afternoon',
        timestamp: '2:32 PM',
        isOwn: true,
        status: 'read'
      },
      {
        id: '3',
        text: 'Perfect! How about 3 PM at Mirror Lake Cafe?',
        timestamp: '2:35 PM',
        isOwn: false,
        status: 'read'
      },
      {
        id: '4',
        text: 'See you there! 🎉',
        timestamp: '2:36 PM',
        isOwn: true,
        status: 'read'
      }
    ]
  },
  {
    id: '2',
    name: 'Fatima Ali',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    lastMessage: 'Thanks for the study session yesterday at Thompson Library!',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: true,
    status: 'online',
    country: 'India',
    major: 'Business',
    messages: [
      {
        id: '1',
        text: 'Thanks for the study session yesterday at Thompson Library!',
        timestamp: '1:15 PM',
        isOwn: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'You\'re welcome! It was really helpful. Want to meet again this week?',
        timestamp: '1:20 PM',
        isOwn: true,
        status: 'read'
      }
    ]
  },
  {
    id: '3',
    name: 'Hassan Sheikh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    lastMessage: 'Are you going to the Pakistani Student Association meeting tonight?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: false,
    status: 'offline',
    country: 'Bangladesh',
    major: 'Engineering',
    messages: [
      {
        id: '1',
        text: 'Are you going to the Pakistani Student Association meeting tonight?',
        timestamp: '11:30 AM',
        isOwn: false,
        status: 'delivered'
      }
    ]
  },
  {
    id: '4',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    lastMessage: 'The food truck adventure was amazing! We should do it again',
    timestamp: '1 day ago',
    unreadCount: 0,
    isOnline: true,
    status: 'online',
    country: 'India',
    major: 'Finance',
    messages: [
      {
        id: '1',
        text: 'The food truck adventure was amazing! We should do it again',
        timestamp: 'Yesterday 4:30 PM',
        isOwn: false,
        status: 'read'
      },
      {
        id: '2',
        text: 'Absolutely! I loved the Indian food truck. Next time let\'s try the Mexican one',
        timestamp: 'Yesterday 4:35 PM',
        isOwn: true,
        status: 'read'
      }
    ]
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        isOwn: true,
        status: 'sent'
      }
      
      // Add the message to the conversation
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
        lastMessage: newMessage,
        timestamp: 'Just now'
      }
      
      // Update the conversation in the list
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
      
      // Update the selected conversation
      setSelectedConversation(updatedConversation)
      setNewMessage('')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-gray-400" />
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-gray-400" />
      case 'read': return <CheckCircle2 className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-gray-400'
      case 'busy': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              href="/dashboard"
              className="flex items-center text-[#00CFC1] hover:text-[#00B2A5] transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">Messages</h1>
          <p className="text-[#00CFC1] text-lg">Stay connected with your friends and study partners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="max-h-96 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-[#00CFC1]/5 border-l-4 border-l-[#00CFC1]'
                        : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-[#0A2540] truncate">{conversation.name}</h3>
                          <div className="flex items-center space-x-2">
                            {conversation.unreadCount > 0 && (
                              <span className="bg-[#00CFC1] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{conversation.country}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{conversation.major}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-96 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConversation.avatar}
                        alt={selectedConversation.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(selectedConversation.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A2540]">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-500">{selectedConversation.country} • {selectedConversation.major}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#00CFC1] transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#00CFC1] transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#00CFC1] transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-[#00CFC1] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.isOwn ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.isOwn && (
                            <div className="ml-2">
                              {getStatusIcon(message.status)}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#00CFC1] transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-[#00CFC1] transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#00CFC1] hover:bg-[#00B2A5] text-white p-3 rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Conversation</h3>
                  <p className="text-gray-500">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
