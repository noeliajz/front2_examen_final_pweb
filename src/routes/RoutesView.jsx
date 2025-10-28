import React from 'react'
import HomePage from '../page/HomePage'
import AboutPage from '../page/AboutPage'
import ErrorPage from '../page/ErrorPage'
import { Routes, Route} from 'react-router-dom'
import LoginPage from '../page/LoginPage'
import RegisterPage from '../page/RegisterPage'
import DoctorUserPage from '../page/DoctorUserPage'
import AmedicalSpecialty from '../page/AmedicalSpecialty'
import TurnsPage from '../page/TurnsPage'
import Hospital from '../page/hospital'
import MoreInformation from '../page/MoreInformation'
import MoreInformation2 from '../page/MoreInformation2'
import MoreInformation3 from '../page/MoreInformation3'
import MoreInformation4 from '../page/MoreInformation4'
import MoreInformation5 from '../page/MoreInformation5'
import MoreInformation6 from '../page/MoreInformation6'
import MoreInformation7 from '../page/MoreInformation7'
import MoreInformation8 from '../page/MoreInformation8'
import DoctorsPage from '../page/DoctorsPage'
import AdminPage from '../page/AdminPage'
import AdminDoctorsPage from '../page/AdminDoctorsPage'
import AdminHospitalPage from '../page/AdminHospitalPage'
import AdminUserPage from '../page/AdminUserPage'
import EditDoctor from '../page/EditDoctor'
import EditHospital from '../page/EditHospital'
import EditUser from '../page/EditUser'
import NewUser from '../page/NewUser'
import Prueba from '../page/Prueba'
import Prueba2 from '../page/prueba2'
import NewDoctor from '../page/NewDoctor'
import NewDoctorUser from '../page/NewDoctorUser'
import NewHospital from '../page/NewHospital'
import HospitalUser from '../page/HospitalUser'
import AllDoctors from '../page/AllDoctors'
import AdminTurnos from '../page/AdminTurnos'
import AdminNuevoTurnos from '../page/AdminNuevoTurnos'
import Reportes from '../page/Reportes'

const RoutesView = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/doctorUser' element={<DoctorUserPage/>}/>
      <Route path='/amedicalspecialty' element={<AmedicalSpecialty/>}/>
      <Route path='/turnsPage' element={<TurnsPage/>}/>
      <Route path='/hospital' element={<Hospital/>}/>
      <Route path='/moreInformation' element={<MoreInformation/>}/>
      <Route path='/moreInformation2' element={<MoreInformation2/>}/>
      <Route path='/moreInformation3' element={<MoreInformation3/>}/>
      <Route path='/moreInformation4' element={<MoreInformation4/>}/>
      <Route path='/moreInformation5' element={<MoreInformation5/>}/>
      <Route path='/moreInformation6' element={<MoreInformation6/>}/>
      <Route path='/moreInformation7' element={<MoreInformation7/>}/>
      <Route path='/moreInformation8' element={<MoreInformation8/>}/>
      <Route path='/doctorsPage' element={<DoctorsPage/>}/>
      <Route path='/adminPage' element={<AdminPage/>}/>
      <Route path='/adminUserPage' element={<AdminUserPage/>}/>
      <Route path='/adminDoctorsPage' element={<AdminDoctorsPage/>}/>
      <Route path='/adminHospitalPage' element={<AdminHospitalPage/>}/>
      <Route path='/editDoctor/:id' element={<EditDoctor/>}/>
      <Route path='/editHospital/:id' element={<EditHospital/>}/>
      <Route path='/editUser/:id' element={<EditUser/>}/>
      <Route path='/newUser' element={<NewUser/>}/>
      <Route path='/newHospital' element={<NewHospital/>}/>
      <Route path='/newDoctor' element={<NewDoctor/>}/>
      <Route path='/newDoctorUser' element={<NewDoctorUser/>}/>
      <Route path='/hospitalUser' element={<HospitalUser/>}/>
      <Route path='/allDoctorsUser' element={<AllDoctors/>}/>
      <Route path="/AdminTurnos/:id" element={<AdminTurnos />} />
      <Route path="/AdminNuevoTurnos/:id" element={<AdminNuevoTurnos />} />
      <Route path="/Reportes" element={<Reportes/>} />

      <Route path='/prueba' element={<Prueba/>}/>
      <Route path='/prueba2' element={<Prueba2/>}/>

    </Routes>
  )
}

export default RoutesView
