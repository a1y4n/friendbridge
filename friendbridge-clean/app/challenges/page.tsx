'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Trophy, 
  Target, 
  MapPin, 
  Users, 
  BookOpen, 
  Dumbbell, 
  Coffee, 
  Camera,
  Star,
  CheckCircle,
  Clock,
  Award,
  ArrowLeft
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  category: 'campus' | 'academic' | 'social' | 'physical' | 'cultural'
  location: string
  distance: string
  completed: boolean
  participants: number
  icon: React.ReactNode
  difficulty: 'easy' | 'medium' | 'hard'
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Mirror Lake Walk',
    description: 'Take a peaceful walk around Mirror Lake and enjoy the campus scenery',
    points: 50,
    category: 'campus',
    location: 'Mirror Lake',
    distance: '0.2 miles',
    completed: true,
    participants: 1247,
    icon: <MapPin className="w-5 h-5" />,
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Coffee Connection',
    description: 'Meet someone new over coffee at Mirror Lake Cafe',
    points: 50,
    category: 'social',
    location: 'Mirror Lake Cafe',
    distance: '0.1 miles',
    completed: true,
    participants: 892,
    icon: <Coffee className="w-5 h-5" />,
    difficulty: 'easy'
  },
  {
    id: '3',
    title: 'Study Buddy',
    description: 'Find a study partner at Thompson Library',
    points: 60,
    category: 'academic',
    location: 'Thompson Library',
    distance: '0.3 miles',
    completed: true,
    participants: 1567,
    icon: <BookOpen className="w-5 h-5" />,
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Buckeye Spirit',
    description: 'Attend a football game and show your Buckeye pride',
    points: 100,
    category: 'cultural',
    location: 'Ohio Stadium',
    distance: '0.4 miles',
    completed: false,
    participants: 2341,
    icon: <Trophy className="w-5 h-5" />,
    difficulty: 'hard'
  },
  {
    id: '5',
    title: 'Food Truck Adventure',
    description: 'Try a new cuisine at the food truck court',
    points: 75,
    category: 'cultural',
    location: 'Food Truck Court',
    distance: '0.2 miles',
    completed: false,
    participants: 678,
    icon: <Camera className="w-5 h-5" />,
    difficulty: 'medium'
  },
  {
    id: '6',
    title: 'Wexner Center Visit',
    description: 'Explore art and culture at the Wexner Center',
    points: 75,
    category: 'cultural',
    location: 'Wexner Center',
    distance: '0.3 miles',
    completed: true,
    participants: 445,
    icon: <Star className="w-5 h-5" />,
    difficulty: 'medium'
  },
  {
    id: '7',
    title: 'Oval Stroll',
    description: 'Take a walk around the historic Oval',
    points: 40,
    category: 'campus',
    location: 'The Oval',
    distance: '0.1 miles',
    completed: false,
    participants: 1890,
    icon: <MapPin className="w-5 h-5" />,
    difficulty: 'easy'
  },
  {
    id: '8',
    title: 'RPAC Workout',
    description: 'Get active at the Recreation and Physical Activity Center',
    points: 80,
    category: 'physical',
    location: 'RPAC',
    distance: '0.4 miles',
    completed: false,
    participants: 1123,
    icon: <Dumbbell className="w-5 h-5" />,
    difficulty: 'medium'
  }
]

const categories = [
  { id: 'all', name: 'All Activities', icon: <Target className="w-4 h-4" /> },
  { id: 'campus', name: '🏛️ Physical', icon: <MapPin className="w-4 h-4" /> },
  { id: 'social', name: '☕ Social', icon: <Coffee className="w-4 h-4" /> },
  { id: 'academic', name: '📚 Academic', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'physical', name: '💪 Physical', icon: <Dumbbell className="w-4 h-4" /> },
  { id: 'cultural', name: '🎨 Cultural', icon: <Star className="w-4 h-4" /> }
]

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userStats] = useState({
    totalPoints: 1250,
    completedChallenges: 4,
    totalChallenges: 8,
    currentStreak: 3
  })

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'campus': return 'bg-blue-100 text-blue-700'
      case 'social': return 'bg-green-100 text-green-700'
      case 'academic': return 'bg-purple-100 text-purple-700'
      case 'physical': return 'bg-orange-100 text-orange-700'
      case 'cultural': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">Challenges</h1>
          <p className="text-[#00CFC1] text-lg">Complete challenges to earn points and make friends!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Points</p>
                <p className="text-2xl font-bold text-[#00CFC1]">{userStats.totalPoints}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{userStats.completedChallenges}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <p className="text-2xl font-bold text-[#0A2540]">{userStats.completedChallenges}/{userStats.totalChallenges}</p>
              </div>
              <Target className="w-8 h-8 text-[#00CFC1]" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Streak</p>
                <p className="text-2xl font-bold text-orange-600">{userStats.currentStreak} days</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#0A2540] mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-[#00CFC1] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#00CFC1] hover:text-[#00CFC1]'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
                challenge.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:border-[#00CFC1]'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${
                      challenge.completed ? 'bg-green-100' : 'bg-[#00CFC1]/10'
                    }`}>
                      {challenge.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-[#0A2540]">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">{challenge.location}</p>
                    </div>
                  </div>
                  {challenge.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{challenge.distance}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{challenge.participants}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="font-semibold text-[#00CFC1]">{challenge.points} pts</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </div>
                </div>

                {challenge.completed && (
                  <div className="mt-4 bg-green-100 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-700 font-medium">
                        ✓ Completed by you with 3 people
                      </span>
                    </div>
                  </div>
                )}

                {!challenge.completed && (
                  <button className="w-full mt-4 bg-[#00CFC1] hover:bg-[#00B2A5] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Start Challenge
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
