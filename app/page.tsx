'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import PropertyTypes from '@/components/PropertyTypes'
import AboutSection from '@/components/AboutSection'
import PropertyListing from '@/components/PropertyListing'
import TeamSection from '@/components/TeamSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Spinner from '@/components/Spinner'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container-fluid bg-white m-0 p-0">
      {loading && <Spinner />}
      
      <Navbar />
      <Hero />
      <SearchBar />
      <PropertyCard />
      <PropertyTypes />
      <AboutSection />
      <PropertyListing />
      
      <TeamSection />
      <Testimonials />
      <Footer />
      
      {/* Back to Top Button */}
      <a 
        href="#" 
        className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-primary-600 transition-all"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  )
}
