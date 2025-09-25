'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const isOSUEmail = formData.email.endsWith('@buckeyemail.osu.edu') || formData.email.endsWith('@osu.edu')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!isOSUEmail) {
      setError('Please use your OSU BuckeyeMail address')
      toast.error('Please use your OSU BuckeyeMail address')
      setIsLoading(false)
      return
    }

    if (!formData.dateOfBirth) {
      setError('Please enter your date of birth')
      toast.error('Please enter your date of birth')
      setIsLoading(false)
      return
    }

    const age = calculateAge(formData.dateOfBirth)
    if (age < 16 || age > 50) {
      setError('You must be between 16 and 50 years old to join')
      toast.error('You must be between 16 and 50 years old to join')
      setIsLoading(false)
      return
    }

    try {
      // Demo mode - directly sign in with credentials
      const result = await signIn('credentials', {
        email: formData.email,
        password: 'demo123', // Demo password
        redirect: false,
      })

      if (result?.error) {
        setError('Failed to create account')
        toast.error('Failed to create account')
      } else {
        toast.success('Account created successfully! Welcome to FriendBridge!')
        router.push('/onboarding')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#00CFC1] rounded-full mx-auto mb-5 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">FB</span>
          </div>
          <h2 className="text-3xl font-bold text-[#0A2540] mb-2">
            Join FriendBridge
          </h2>
          <p className="text-gray-600">
            Find friends, share culture, belong.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#0A2540] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent transition-colors"
                  placeholder="John Doe"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0A2540] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent transition-colors ${
                    isOSUEmail ? 'border-green-500' : formData.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="name.number@buckeyemail.osu.edu"
                  required
                />
                {isOSUEmail && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>
              {formData.email && !isOSUEmail && (
                <p className="text-red-500 text-xs mt-1">Please use your OSU BuckeyeMail address</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#0A2540] mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:border-transparent transition-colors"
                  autoComplete="off"
                  required
                />
              </div>
              {formData.dateOfBirth && (
                <p className="text-sm text-gray-600 mt-1">
                  Age: {calculateAge(formData.dateOfBirth)} years old
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isOSUEmail || !formData.dateOfBirth}
              className="w-full bg-[#00CFC1] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#00B2A5] focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#00CFC1] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By joining, you agree to our{' '}
            <Link href="/terms" className="text-[#00CFC1] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#00CFC1] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}