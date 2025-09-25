import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import MatchFilters from '@/components/matches/MatchFilters'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2540]">Account Settings</h1>
            <p className="text-[#00CFC1]">Manage your profile and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Match Preferences Block */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#00CFC1] p-8">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-[#00CFC1] rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-[#0A2540]">Match Preferences</h2>
              </div>
              <div className="bg-[#00CFC1]/15 rounded-xl p-6 border border-[#00CFC1]/30">
                <MatchFilters />
              </div>
            </div>
            
            {/* Profile Information Block */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#00B2A5] p-8">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-[#00B2A5] rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-[#0A2540]">Profile Information</h2>
              </div>
              <div className="bg-[#00B2A5]/15 rounded-xl p-6 border border-[#00B2A5]/30">
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-3">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-[#00B2A5] rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">A</span>
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="profile-picture"
                        />
                        <label
                          htmlFor="profile-picture"
                          className="bg-[#00B2A5] hover:bg-[#00CFC1] text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                        >
                          Upload Photo
                        </label>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-[#00B2A5]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B2A5] focus:border-[#00B2A5] transition-all duration-200"
                      defaultValue={session.user?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                      defaultValue={session.user?.email || ''}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-3">
                      University
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                      defaultValue="Ohio State University"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Block */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#0A2540] p-8">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-[#0A2540] rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-[#0A2540]">Quick Actions</h2>
              </div>
              <div className="bg-[#0A2540]/15 rounded-xl p-6 border border-[#0A2540]/30">
                <div className="space-y-4">
                  <button className="w-full bg-[#00CFC1] hover:bg-[#00B2A5] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:ring-offset-2 transform hover:scale-105">
                    Update Profile
                  </button>
                  <button className="w-full bg-[#00CFC1]/10 hover:bg-[#00CFC1]/20 text-[#00CFC1] font-semibold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-[#00CFC1]/30 hover:border-[#00CFC1]/50 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:ring-offset-2 transform hover:scale-105">
                    Change Password
                  </button>
                  <button className="w-full bg-[#00CFC1]/10 hover:bg-[#00CFC1]/20 text-[#00CFC1] font-semibold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-[#00CFC1]/30 hover:border-[#00CFC1]/50 focus:outline-none focus:ring-2 focus:ring-[#00CFC1] focus:ring-offset-2 transform hover:scale-105">
                    Privacy Settings
                  </button>
                  <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-red-200 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
