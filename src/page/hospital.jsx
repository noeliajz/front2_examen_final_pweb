import React from 'react'
import CardHospital from '../components/CardHospital'
import Footer from '../components/Footer'
import NavbarComponents from "../components/NavbarComponents"

const hospital = () => {
  return (
    <>
      <NavbarComponents/>
      <CardHospital/>
      <Footer/> 
    </>
  )
}

export default hospital
