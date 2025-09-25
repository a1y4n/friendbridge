'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  Trophy, 
  Target,
  CheckCircle,
  Coffee,
  BookOpen,
  Camera,
  Heart,
  Filter,
  Search,
  ArrowLeft
} from 'lucide-react'

interface Person {
  id: string
  name: string
  country: string
  major: string
  year: string
  compatibility: number
  challengesCompleted: number
  totalChallenges: number
  lastActivity: string
  activities: string[]
  status: 'online' | 'offline' | 'busy'
  avatar: string
  interests: string[]
  languages: string[]
}

const people: Person[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    country: 'Pakistan',
    major: 'Computer Science',
    year: 'Junior',
    compatibility: 95,
    challengesCompleted: 3,
    totalChallenges: 5,
    lastActivity: '2 hours ago',
    activities: ['Coffee Connection', 'Study Buddy', 'Mirror Lake Walk'],
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    interests: ['Programming', 'Cricket', 'Photography'],
    languages: ['English', 'Urdu', 'Hindi']
  },
  {
    id: '2',
    name: 'Fatima Ali',
    country: 'India',
    major: 'Business',
    year: 'Sophomore',
    compatibility: 92,
    challengesCompleted: 4,
    totalChallenges: 5,
    lastActivity: '1 hour ago',
    activities: ['Coffee Connection', 'Study Buddy', 'Mirror Lake Walk', 'Wexner Center Visit'],
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    interests: ['Finance', 'Dancing', 'Cooking'],
    languages: ['English', 'Hindi', 'Gujarati']
  },
  {
    id: '3',
    name: 'Hassan Sheikh',
    country: 'Bangladesh',
    major: 'Engineering',
    year: 'Senior',
    compatibility: 88,
    challengesCompleted: 1,
    totalChallenges: 2,
    lastActivity: '3 hours ago',
    activities: ['Study Buddy'],
    status: 'offline',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    interests: ['Robotics', 'Soccer', 'Music'],
    languages: ['English', 'Bengali']
  },
  {
    id: '4',
    name: 'Priya Sharma',
    country: 'India',
    major: 'Finance',
    year: 'Sophomore',
    compatibility: 95,
    challengesCompleted: 2,
    totalChallenges: 3,
    lastActivity: '30 minutes ago',
    activities: ['Coffee Connection', 'Food Truck Adventure'],
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    interests: ['Finance', 'Bollywood', 'Photography'],
    languages: ['English', 'Hindi', 'Punjabi']
  },
  {
    id: '5',
    name: 'Wei Chen',
    country: 'China',
    major: 'Engineering',
    year: 'Junior',
    compatibility: 87,
    challengesCompleted: 1,
    totalChallenges: 2,
    lastActivity: '1 day ago',
    activities: ['Study Buddy'],
    status: 'offline',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    interests: ['Machine Learning', 'Badminton', 'Gaming'],
    languages: ['English', 'Mandarin']
  },
  {
    id: '6',
    name: 'Maria Santos',
    country: 'Brazil',
    major: 'Finance',
    year: 'Senior',
    compatibility: 92,
    challengesCompleted: 3,
    totalChallenges: 4,
    lastActivity: '2 hours ago',
    activities: ['Coffee Connection', 'Study Buddy', 'Wexner Center Visit'],
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    interests: ['Finance', 'Soccer', 'Dancing'],
    languages: ['English', 'Portuguese', 'Spanish']
  }
]

const filters = [
  { id: 'all', name: 'All People', icon: <Users className="w-4 h-4" /> },
  { id: 'online', name: 'Online', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'high-compatibility', name: 'High Match', icon: <Star className="w-4 h-4" /> },
  { id: 'recent', name: 'Recent Activity', icon: <Clock className="w-4 h-4" /> }
]

export default function PeoplePage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const filteredPeople = people.filter(person => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'online' && person.status === 'online') ||
      (selectedFilter === 'high-compatibility' && person.compatibility >= 90) ||
      (selectedFilter === 'recent' && person.lastActivity.includes('hour'))
    
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.country.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-gray-400'
      case 'busy': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
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
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">People</h1>
          <p className="text-[#00CFC1] text-lg">Connect with students and track your friendships</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* People List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Search and Filters */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search people..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                    />
                  </div>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedFilter === filter.id
                          ? 'bg-[#00CFC1] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.icon}
                      <span className="ml-2">{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* People Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPeople.map((person) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedPerson?.id === person.id
                        ? 'border-[#00CFC1] bg-[#00CFC1]/5'
                        : 'border-gray-200 hover:border-[#00CFC1]/50'
                    }`}
                    onClick={() => setSelectedPerson(person)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(person.status)}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-[#0A2540] truncate">{person.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(person.compatibility)}`}>
                            {person.compatibility}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{person.major} • {person.year}</p>
                        <p className="text-sm text-gray-500 mb-2">{person.country}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Trophy className="w-3 h-3 mr-1" />
                            <span>{person.challengesCompleted}/{person.totalChallenges}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{person.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Person Details Sidebar */}
          <div className="space-y-6">
            {selectedPerson ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={selectedPerson.avatar}
                      alt={selectedPerson.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getStatusColor(selectedPerson.status)}`}></div>
                  </div>
                  <h2 className="text-xl font-bold text-[#0A2540] mt-3">{selectedPerson.name}</h2>
                  <p className="text-gray-600">{selectedPerson.major} • {selectedPerson.year}</p>
                  <p className="text-sm text-gray-500">{selectedPerson.country}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#0A2540] mb-2">Compatibility</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#00CFC1] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedPerson.compatibility}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 font-semibold text-[#00CFC1]">{selectedPerson.compatibility}%</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0A2540] mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerson.interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#00CFC1]/10 text-[#00CFC1] rounded-full text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0A2540] mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerson.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#0A2540]/10 text-[#0A2540] rounded-full text-xs font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0A2540] mb-2">Completed Activities</h3>
                    <div className="space-y-2">
                      {selectedPerson.activities.map((activity, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-[#00CFC1] hover:bg-[#00B2A5] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Connect
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Person</h3>
                  <p className="text-gray-500 text-sm">Click on someone to see their details and activities</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Your Network</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Connections</span>
                  <span className="font-semibold text-[#00CFC1]">{people.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">
                    {people.filter(p => p.status === 'online').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Compatibility</span>
                  <span className="font-semibold text-purple-600">
                    {people.filter(p => p.compatibility >= 90).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recent Activity</span>
                  <span className="font-semibold text-orange-600">
                    {people.filter(p => p.lastActivity.includes('hour')).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
