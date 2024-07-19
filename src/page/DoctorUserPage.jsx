import React from 'react'
import CardDoctorU from '../components/CardDoctorUser'
import FormUserDoctorUser from '../components/FormUserDoctorUser'
import Footer from '../components/Footer'
import NavbarComponents from "../components/NavbarComponents";

const DoctorUserPage = () => {
  return (
    <> 
     <NavbarComponents/>
     <FormUserDoctorUser/>
     <CardDoctorU/> 
     <Footer/>     
    </>
  )
}

export default DoctorUserPage
