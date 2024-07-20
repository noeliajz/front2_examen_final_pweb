import React from 'react'
import CarouselComponents from '../components/CarouselComponents'
import Footer from '../components/Footer'
import CardServicioHome from '../components/CardServicioHome'
import NavbarComponentsAdmin from '../components/NavbarComponentsAdmin'


const HomePage = () => {
  return (
    <>
     <NavbarComponentsAdmin/>
     <div style={{background:"#E1F7F5"}}>
     <CarouselComponents/>
     <h1 className='text-center py-5'>Bienvenidos a Salud organizada! </h1>
     <h3 className='p-5'>Te ofremos:</h3>
     <CardServicioHome/>
     </div>
     <Footer/>
    </>
   
  )
}

export default HomePage
