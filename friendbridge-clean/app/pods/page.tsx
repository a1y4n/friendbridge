import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import PodsList from '@/components/pods/PodsList'
import CreatePodModal from '@/components/pods/CreatePodModal'

export default async function PodsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interest Pods</h1>
            <p className="text-gray-600">Join communities around shared interests and cultural backgrounds</p>
          </div>
          <CreatePodModal />
        </div>

        <PodsList />
      </div>
    </DashboardLayout>
  )
}
