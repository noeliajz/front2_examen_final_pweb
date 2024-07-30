import React from 'react'
import CardAmedicalSpecialty from '../components/CardAmedicalSpecialty'
import Footer from '../components/Footer'
import NavbarComponents from '../components/NavbarComponents'
import CarouselComponentsUser from '../components/CarouselComponentsUser'


const AmedicalSpecialty = () => {
  return (
    <>
      <NavbarComponents/>
      <CarouselComponentsUser/>
      <CardAmedicalSpecialty/>
      <Footer/>    
    </>
  )
}

export default AmedicalSpecialty
