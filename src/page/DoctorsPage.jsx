import Footer from "../components/Footer";
import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {arrayDoctors} from "../data/arrayDoctors";
import NavbarComponents from "../components/NavbarComponents";



const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([])
  
  const getAllDoctor = async () => {
    const idAgenda =  localStorage.getItem('idAgenda');
  const idDoctor =localStorage.getItem('idDoctor')
    console.log(idAgenda)
    const token =  localStorage.getItem('token');
    const res = await axios.get(`http://localhost:3000/api/agenda/${idAgenda}`, {
      headers: {
        authorization: 'Bearer ' + token
      }
    })
    
   const  {doctors}= res.data.getAgenda
    setDoctors(doctors) 
    
    
  }
    
    useEffect(() => {
        getAllDoctor()
    }, [])
   
    console.log(doctors)

return (
  <>
    <NavbarComponents/>
    <main className='AllProducts' style={{paddingTop:"40px", background:"#E1F7F5"}}>
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

