import Footer from "../components/Footer";
import AccordionStudyPage from "../components/AccordionStudyPage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponents from "../components/NavbarComponents"
import { Link } from "react-router-dom";

const StudyPage = () => {
  const [estudioMedico, setStudies] = useState([]);
  

  const getAllestudioMedico = async () => {
    const idAgenda =  localStorage.getItem('idAgenda');
    const token =  localStorage.getItem('token');
    const res = await axios.get(`http://localhost:3000/api/agenda/${idAgenda}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    
   const  {estudioMedico}= res.data.getAgenda
    setStudies(estudioMedico) 
    
    
  }
  
  useEffect(() => {
    getAllestudioMedico();
  }, []);

  console.log(getAllestudioMedico);
  return (
    <>
      <NavbarComponents/>
      <main className="AllProducts" style={{paddingTop:"40px", background:"#E1F7F5"}}>
        <h2 className="text-center p-3">Estudios médicos</h2>
        <div className="container">
          <div className="row py-4">
            <AccordionStudyPage array={estudioMedico} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StudyPage;
