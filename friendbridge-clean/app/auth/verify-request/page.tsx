'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-10 h-10 text-primary-600" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          
          <p className="text-gray-600 mb-6">
            We've sent you a verification link. Please check your email and click the link to complete your account setup.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>Don't see the email?</strong> Check your spam folder or try signing in again.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="btn-outline w-full flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Resend Email
            </button>

            <Link
              href="/auth/signin"
              className="btn-secondary w-full flex items-center justify-center"
            >
              Back to Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Having trouble? Contact us at{' '}
              <a href="mailto:support@friendbridge.app" className="text-primary-600 hover:text-primary-700">
                support@friendbridge.app
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
