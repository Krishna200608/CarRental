import React from 'react'
import Hero from '../componets/Hero'
import FeatureSection from '../componets/FeatureSection'
import Banner from '../componets/Banner'
import Testimonial from '../componets/Testimonial'
import Newsletter from '../componets/Newsletter'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeatureSection/>
        <Banner/>
        <Testimonial/>
        <Newsletter/>
    </>
  )
}

export default Home