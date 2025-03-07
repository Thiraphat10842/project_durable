import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* Admin */
import Adminlayout from '../Components/Layouts/adminLayout';
import UserLayout from '../Components/Layoutsuser/userLayout';
import Homeadmin from './Homes/Frmadminhome';
import Users from './Users/Frmusers';
import Offices from './Offices/Frmoffice';
import Durable from './Computers/Frmdurable';
import Lending from './Lendings/Frmlending';
import Returnequipment from './Returnequipments/frmreturnequipment';
import Reportaproblem from './Reportaproblems/frmreportaproblem';
import Informrepair from './Informrepair/frminformrepair';
import Notfoundredirect from './NotFoundRedirect/NotFoundRedirect';
import Login from '../Logins/Frmlogin';
import Workload from './Workload/frmworkload' 
import Jobdescription from './Jobdescription/frmJobdescription'
import Informrepairuser from './Informrepairuser/frminformrepairuser';
import Reportaproblemuser from './Reportaproblemsuser/frmreportaproblemuser';
import Lendinguser from './Lendingsuser/Frmlendinguser';
import Returnequipmentuser from './Returnequipmentsuser/frmreturnequipmentuser';
import FrmProfile from './profile/FrmProfile';

/* ITmen  */
import DurableITmen from './ITmen/Computers/FrmdurableITmen';
import InformrepairITmen from './ITmen/InformrepairITmen/frminformrepairITmen';
import LendingITmen from './ITmen/LendingsITmen/FrmlendingITmen';
import OfficeITmen from './ITmen/OfficesITmen/FrmofficeITmen';
import ReportaproblemITmen from './ITmen/ReportaproblemsITmen/frmreportaproblemITmen';
import ReturnequipmentITmen from './ITmen/ReturnequipmentsITmen/frmreturnequipmentITmen';
import UsersITmen from './ITmen/UsersITmen/FrmusersITmen';
// import RegisterITmen from './ITmen/UsersITmen/Frmregister';
import HomeITmen from './HomesITmen/Frmadminhome';
import ITmenLayout from '../Components/LayoutsuserITmen/userLayout';
import JobdescriptionITmen from './ITmen/JobdescriptionITmen/frmJobdescriptionITmen';
import Homeuser from './Homesuser/Frmadminhome';

const Main: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Admin" element={<Adminlayout/>}>
          <Route path="/Admin" element={<Homeadmin/>} />
          <Route path="/Admin/User" element={<Users/>} />
          <Route path="/Admin/Office" element={<Offices/>} />
          <Route path="/Admin/Computer" element={<Durable/>} />
          <Route path='/Admin/Lending' element={<Lending/>} />
          <Route path='/Admin/Returnequipments' element={<Returnequipment/>} />
          {/* <Route path='/Admin/Return' element={''} /> */}
          <Route path="/Admin/Reportaproblem" element={<Reportaproblem />} />
          <Route path="/Admin/Informrepair" element={<Informrepair />} />
          <Route path="/Admin/Workload" element={<Workload />} />
          <Route path="/Admin/Jobdescription" element={<Jobdescription/>} />
          <Route path="/Admin/FrmProfile" element={<FrmProfile/>} />
          
        </Route>
        <Route path="/User" element={<UserLayout />}>
          <Route path="/User" element={<Homeuser/>} />
          {/* <Route path="/User/Informrepair" element={''} /> */}
          <Route path="/User/Informrepairuser" element={<Informrepairuser/>} />
          <Route path="/User/Reportaproblemuser" element={<Reportaproblemuser/>} />
          <Route path='/User/Lendinguser' element={<Lendinguser/>} />
          <Route path='/User/Returnequipmentuser' element={<Returnequipmentuser/>} />   
          <Route path='/User/FrmProfile' element={<FrmProfile/>} />     
        </Route>
        <Route path="/ITmen" element={<ITmenLayout/>}>
          <Route path="/ITmen" element={<HomeITmen/>} />
          <Route path="/ITmen/UsersITmen" element={<UsersITmen/>} />
          <Route path="/ITmen/OfficeITmen" element={<OfficeITmen/>} />
          <Route path="/ITmen/DurableITmen" element={<DurableITmen/>} />
          <Route path='/ITmen/LendingITmen' element={<LendingITmen/>} />
          <Route path='/ITmen/ReturnequipmentITmen' element={<ReturnequipmentITmen/>} />
          {/* <Route path='/Admin/Return' element={''} /> */}
          <Route path="/ITmen/ReportaproblemITmen" element={<ReportaproblemITmen />} />
          <Route path="/ITmen/InformrepairITmen" element={<InformrepairITmen />} />
          <Route path="/ITmen/JobdescriptionITmen" element={<JobdescriptionITmen/>} />
          <Route path='/ITmen/FrmProfile' element={<FrmProfile/>} /> 
        </Route>
        {/* <Route path='/not_found' element={<PathNotFound />} />*/}
        <Route path='*' element={<Notfoundredirect />} /> 
      </Routes>
    </BrowserRouter >
  )
}

export default Main