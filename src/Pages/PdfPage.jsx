import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import PrintData from '../Components/PrintData';
import { useLocation } from "react-router-dom";


export default function PdfPage() {
const location = useLocation();
const { contactFormData } = location.state || {};


  return (
    <div>
      <Header />
      
      <section className="breadcrum-section container mx-auto px-5">
        {/* <div className="py-[40px]"> */}
         
          
        {/* </div> */}
      {/* <Counter /> */}
      <PrintData />
 
      </section>

    </div>
  );
}
