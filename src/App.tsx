import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import PageTransition from '@/components/PageTransition'
import MainLayout from '@/components/MainLayout'
import SplashPage from '@/pages/Splash'
import OnboardingPage from '@/pages/Onboarding'
import LoginPage from '@/pages/Login'
import SignUpPage from '@/pages/SignUp'
import HomePage from '@/pages/Home'
import ItineraryPage from '@/pages/Itinerary'
import DestinationDetailPage from '@/pages/DestinationDetail'
import BookingPage from '@/pages/Booking'
import MembershipPage from '@/pages/Membership'
import ProfilePage from '@/pages/Profile'
import GuidelinesPage from '@/pages/Guidelines'
import FavoritesPage from '@/pages/Favorites'
import CreateTripPlanPage from '@/pages/CreateTripPlan'
import TripPlanDetailPage from '@/pages/TripPlanDetail'
import InquiryPage from '@/pages/Inquiry'
import PackageDetailPage from '@/pages/PackageDetail'
import ChatPage from '@/pages/Chat'
import SearchPage from '@/pages/Search'

function AnimatedRoutes() {
  const location = useLocation()
  
  // Pages inside the MainLayout should share a layout key to prevent the navbar from animating
  const isMainLayout = ['/home', '/itinerary', '/favorites', '/membership', '/profile', '/chat'].includes(location.pathname)
  const routeKey = isMainLayout ? 'app-main-layout' : location.pathname

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<PageTransition><SplashPage /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
        
        {/* Main layout nested routes sharing a static layout key */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/itinerary" element={<PageTransition><ItineraryPage /></PageTransition>} />
          <Route path="/favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
          <Route path="/membership" element={<PageTransition><MembershipPage /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          <Route path="/chat" element={<PageTransition><ChatPage /></PageTransition>} />
        </Route>

        <Route path="/destination-detail" element={<PageTransition><DestinationDetailPage /></PageTransition>} />
        <Route path="/booking" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/inquiry" element={<PageTransition><InquiryPage /></PageTransition>} />
        <Route path="/package-detail" element={<PageTransition><PackageDetailPage /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
        <Route path="/create-trip-plan" element={<PageTransition><CreateTripPlanPage /></PageTransition>} />
        <Route path="/trip-plan-detail" element={<PageTransition><TripPlanDetailPage /></PageTransition>} />
        <Route path="/guide" element={<PageTransition><GuidelinesPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}


