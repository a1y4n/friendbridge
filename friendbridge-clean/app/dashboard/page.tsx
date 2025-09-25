import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import WelcomeCard from '@/components/dashboard/WelcomeCard'
import MatchesCard from '@/components/dashboard/MatchesCard'
import PodsCard from '@/components/dashboard/PodsCard'
import EventsCard from '@/components/dashboard/EventsCard'
import QuickActions from '@/components/dashboard/QuickActions'

export default async function DashboardPage() {
  // Demo mode - skip database connection
  console.log('Demo mode: showing dashboard')
  
  // Mock user data for demo
  const mockUser = {
    name: "Demo User",
    email: "demo@example.com",
    image: null,
    isVerified: true
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white min-h-screen p-6">
        <WelcomeCard user={mockUser} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MatchesCard />
          <PodsCard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EventsCard />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
