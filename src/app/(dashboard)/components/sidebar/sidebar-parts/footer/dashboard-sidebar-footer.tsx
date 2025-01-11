import { SidebarFooter } from '@/components/ui/sidebar'
import UserProfile from '@/components/user/UserProfile'
import React from 'react'

const DashboardSidebarFooter = () => {
  return (
    <SidebarFooter>
        <div className='flex items-center w-full gap-2 border border-border px-5 py-2 rounded-lg'>
          <UserProfile className='w-full' />
        </div>
    </SidebarFooter>
  )
}

export default DashboardSidebarFooter