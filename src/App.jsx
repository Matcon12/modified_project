import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import CMForm from "./components/CMForm";
import POForm from "./components/POForm";
import InvoiceProcessing from "./components/InvoiceProcessing";
import Inw_Del_Challan from "./components/Inw_Del_Challan";
import PartMaster from "./components/PartMaster";
import Homepage from "./components/HomePage";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={<Homepage/>} />
        <Route exact path="/po-form" element={<POForm/>} />
        <Route exact path="/cm-form" element={<CMForm/>} />
        <Route exact path="/pm-form" element={<PartMaster/>} />
        <Route exact path="/inw-form" element={<Inw_Del_Challan/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

