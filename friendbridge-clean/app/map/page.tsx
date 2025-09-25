'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Coffee, 
  BookOpen, 
  Dumbbell, 
  Camera,
  Filter,
  Search,
  Navigation,
  Target,
  ArrowLeft
} from 'lucide-react'

interface Location {
  id: string
  name: string
  type: 'campus' | 'social' | 'academic' | 'physical' | 'cultural'
  distance: string
  activities: number
  activeUsers: number
  coordinates: { x: number; y: number }
  description: string
  icon: React.ReactNode
  color: string
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Mirror Lake',
    type: 'campus',
    distance: '0.2 miles',
    activities: 3,
    activeUsers: 45,
    coordinates: { x: 200, y: 150 },
    description: 'Peaceful lake perfect for walks and reflection',
    icon: <MapPin className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Mirror Lake Cafe',
    type: 'social',
    distance: '0.1 miles',
    activities: 2,
    activeUsers: 23,
    coordinates: { x: 180, y: 170 },
    description: 'Cozy cafe for coffee and conversations',
    icon: <Coffee className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Thompson Library',
    type: 'academic',
    distance: '0.3 miles',
    activities: 4,
    activeUsers: 67,
    coordinates: { x: 300, y: 200 },
    description: 'Main library for study sessions and research',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Ohio Stadium',
    type: 'cultural',
    distance: '0.4 miles',
    activities: 1,
    activeUsers: 12,
    coordinates: { x: 400, y: 100 },
    description: 'Home of the Buckeyes - football games and events',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-red-500'
  },
  {
    id: '5',
    name: 'Food Truck Court',
    type: 'cultural',
    distance: '0.2 miles',
    activities: 2,
    activeUsers: 34,
    coordinates: { x: 250, y: 250 },
    description: 'Diverse food options from around the world',
    icon: <Camera className="w-5 h-5" />,
    color: 'bg-orange-500'
  },
  {
    id: '6',
    name: 'Wexner Center',
    type: 'cultural',
    distance: '0.3 miles',
    activities: 3,
    activeUsers: 28,
    coordinates: { x: 350, y: 180 },
    description: 'Art and cultural center for exhibitions',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-pink-500'
  },
  {
    id: '7',
    name: 'The Oval',
    type: 'campus',
    distance: '0.1 miles',
    activities: 2,
    activeUsers: 56,
    coordinates: { x: 150, y: 200 },
    description: 'Historic center of campus for events and gatherings',
    icon: <MapPin className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    id: '8',
    name: 'RPAC',
    type: 'physical',
    distance: '0.4 miles',
    activities: 5,
    activeUsers: 89,
    coordinates: { x: 450, y: 300 },
    description: 'Recreation and Physical Activity Center',
    icon: <Dumbbell className="w-5 h-5" />,
    color: 'bg-orange-500'
  }
]

const filters = [
  { id: 'all', name: 'All Activities', icon: <Target className="w-4 h-4" /> },
  { id: 'campus', name: '🏛️ Campus', icon: <MapPin className="w-4 h-4" /> },
  { id: 'social', name: '☕ Social', icon: <Coffee className="w-4 h-4" /> },
  { id: 'academic', name: '📚 Academic', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'physical', name: '💪 Physical', icon: <Dumbbell className="w-4 h-4" /> },
  { id: 'cultural', name: '🎨 Cultural', icon: <Star className="w-4 h-4" /> }
]

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLocations = locations.filter(location => {
    const matchesFilter = selectedFilter === 'all' || location.type === selectedFilter
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'campus': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'social': return 'bg-green-100 text-green-700 border-green-200'
      case 'academic': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'physical': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'cultural': return 'bg-pink-100 text-pink-700 border-pink-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
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
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">Campus Map</h1>
          <p className="text-[#00CFC1] text-lg">Discover activities and connect with people around campus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0A2540]">Interactive Campus Map</h2>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-[#00CFC1]" />
                  <span className="text-sm text-gray-600">Live Activity</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent"
                />
              </div>

              {/* Map Visualization */}
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-96 overflow-hidden">
                {/* Campus Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-blue-200/50"></div>
                
                {/* Location Markers */}
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: Math.random() * 0.2 }}
                    className={`absolute ${location.color} rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200`}
                    style={{
                      left: `${location.coordinates.x}px`,
                      top: `${location.coordinates.y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location.icon}
                  </motion.div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend</h3>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Campus</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Social</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span>Academic</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span>Physical</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                      <span>Cultural</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Filter Activities</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter.id
                        ? 'bg-[#00CFC1] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filter.icon}
                    <span className="ml-2">{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Details */}
            {selectedLocation ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${selectedLocation.color} text-white mr-3`}>
                    {selectedLocation.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2540]">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedLocation.distance}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{selectedLocation.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Activities</span>
                    <span className="font-semibold text-[#00CFC1]">{selectedLocation.activities}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="font-semibold text-green-600">{selectedLocation.activeUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedLocation.type)}`}>
                      {selectedLocation.type}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-[#00CFC1] hover:bg-[#00B2A5] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  View Activities
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Location</h3>
                  <p className="text-gray-500 text-sm">Click on a location marker to see details and activities</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Campus Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Locations</span>
                  <span className="font-semibold text-[#00CFC1]">{locations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="font-semibold text-green-600">
                    {locations.reduce((sum, loc) => sum + loc.activeUsers, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Activities</span>
                  <span className="font-semibold text-purple-600">
                    {locations.reduce((sum, loc) => sum + loc.activities, 0)}
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
