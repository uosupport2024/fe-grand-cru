import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function MainLayout() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-brand-primary-dark relative">
      {/* Scrollable page content */}
      <div className="flex-1 w-full pb-16 ">
        <Outlet />
      </div>
      {/* Static bottom navbar that doesn't animate */}
      <BottomNav />
    </div>
  )
}
