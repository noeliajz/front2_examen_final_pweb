import Footer from "../components/Footer";
import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {arrayDoctors} from "../data/arrayDoctors";
import NavbarComponents from "../components/NavbarComponents";



const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([])
    const getAllDoctor = async () => {
      const res = await axios.get('http://localhost:8080/api/doctor')
      const  {allDoctores}= res.data
      setDoctors(allDoctores) 
      
    }
      
      useEffect(() => {
          getAllDoctor()
      }, [])
     
      console.log(doctors)
  
  return (
    <>
      <NavbarComponents/>
      <main className='AllProducts'>
      <h2 className='text-center p-3'>Médicos a los que acudis</h2> 
      <div className='container'>
          <div className="row py-4">
              <Card array={doctors}/>
           </div>
      </div>
      </main>
      <Footer/>
    </>
  )
};

export default DoctorsPage;