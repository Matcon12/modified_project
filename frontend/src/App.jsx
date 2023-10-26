import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import CustomerMasterForm from "./components/CustomerMasterForm";
import POForm from "./components/POForm";
import InvoiceProcessing from "./components/InvoiceProcessing";
import Inw_Del_Challan from "./components/Inw_Del_Challan";
import PartMaster from "./components/PartMaster";
import DataEntry from "./components/DataEntry";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={<Login/>} />
        <Route exact path="/data-entry"  element={<DataEntry/>} />
        <Route exact path="/invoice-processing" element={<InvoiceProcessing/>} />
        <Route exact path="/po-form" element={<POForm/>} />
        <Route exact path="/cm-form" element={<CustomerMasterForm/>} />
        <Route exact path="/pm-form" element={<PartMaster/>} />
        <Route exact path="/inw-form" element={<Inw_Del_Challan/>} />
        <Route exact path ="/home" element={<Home/>}/>
        <Route exact path ="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

