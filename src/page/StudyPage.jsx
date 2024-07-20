import Footer from "../components/Footer";
import AccordionStudyPage from "../components/AccordionStudyPage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponents from "../components/NavbarComponents"
import { Link } from "react-router-dom";

const StudyPage = () => {
  const [studies, setStudies] = useState([]);
  const getAllestudioMedico = async () => {
    const res = await axios.get("http://localhost:8080/api/estudioMedico");
    const { allestudioMedico } = res.data;
    setStudies(allestudioMedico);
  };

  useEffect(() => {
    getAllestudioMedico();
  }, []);

  console.log(studies);
  return (
    <>
      <NavbarComponents/>
      <main className="AllProducts" style={{paddingTop:"40px", background:"#E1F7F5"}}>
        <h2 className="text-center p-3">Estudios médicos</h2>
        <Link to='/newStudyUser' style={{margin:"30px"}} className="btn btn-info">Nuevo Estudio Médico</Link>
        <div className="container">
          <div className="row py-4">
            <AccordionStudyPage array={studies} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StudyPage;
