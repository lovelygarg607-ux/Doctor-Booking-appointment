
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,

 
} from "react-router-dom";

import Form from "./components/Form";
import Login from "./components/Login";


import Dashboard from "./components/Doctormodel/Dashboard.jsx"

import App from "./App";
import Createdoctorprofile from "./Doctor/Createdoctorprofile.jsx";
import Editprofile from "./components/Doctormodel/Editprofile.jsx"
import Createpatientprofile from "./patient/Createpatientprofile.jsx";
import PatientDashboard from "./components/patientmodel/PatientDashboard.jsx"
import PatientEditprofile from "./components/patientmodel/PatientEditprofile.jsx"
import Doctorslist from "./components/patientmodel/Doctorlist.jsx"
import Protected from "./components/Protected.jsx";
import Addclinic from "./components/Clinicmodel/Addclinic.jsx";

import Clinicdashboard from "./components/Clinicmodel/Clinicdashboard.jsx";
import Clinicprofile from "./components/Clinicmodel/Clinicprofile.jsx";
import Cliniclist from "./components/Doctormodel/Cliniclist.jsx";
import Doctorfullprofile from "./components/patientmodel/Doctorfullprofile.jsx";
import LandingPage from "./components/Landing Page copy/Landingpage.jsx";
import Doctorlisting from "./components/Clinicmodel/Doctorlisting.jsx";
import About from "./components/Landing Page copy/About.jsx";
import Department from "./components/Landing Page copy/Department.jsx";
import Blog from "./components/Landing Page copy/Blog.jsx";
import Appoinmentlist from "./components/Doctormodel/Appoinmentlist.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>

      <Route path="/" element={<App />}>
     
     <Route index element={<LandingPage/>}/>
        {/* <Route index element={<LandingPage />} /> */}
        <Route path ="/about" element={<About/>}/>
           <Route path ="/blog" element={<Blog/>}/>
          <Route path ="/department" element={<Department/>}/>

        <Route path="/" element={<Protected />}>

          <Route path="/doctor" element={<Createdoctorprofile />} />
          <Route path="/patient" element={<Createpatientprofile />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/editprofile/:id" element={<Editprofile />} />
          <Route path="/patient" element={<Createpatientprofile />} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/patientprofile/:id" element={<PatientEditprofile />} />
          <Route path="/doctorlist" element={<Doctorslist />} />
          <Route path="/addclinic" element={<Addclinic />} />
          <Route path="/clinicdashboard" element={<Clinicdashboard />} />
          <Route path="/clinicprofile/:id" element={<Clinicprofile />} />
           <Route path="/cliniclist" element={<Cliniclist />} />
            <Route path="/cliniclist" element={<Cliniclist />} />
             <Route path="/doctorfullprofile/:id" element={<Doctorfullprofile />} />
             <Route path ="/doctorslisting" element={<Doctorlisting/>}/>
                 <Route path="/appoinmentlist" element={<Appoinmentlist />} />
            


           
















        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Form />} />

    </Route>
  )
)

export default router;




















