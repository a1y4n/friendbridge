import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import MatchesList from '@/components/matches/MatchesList'

export default async function MatchesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
            <p className="text-gray-600">Discover students who share your interests and culture</p>
          </div>
        </div>

        <div className="w-full">
          <MatchesList />
        </div>
      </div>
    </DashboardLayout>
  )
}
