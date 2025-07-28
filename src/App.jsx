import React from 'react'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import ProductIntro from './sections/ProductIntro'
import Features from './sections/Features'
import CallToAction from './sections/CallToAction'
import About from './sections/About'
import SocialGallery from './sections/SocialGallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductIntro />
      <Features />
      <CallToAction />
      <About />
      <SocialGallery />
      <Footer />
    </div>
  )
}

export default App
