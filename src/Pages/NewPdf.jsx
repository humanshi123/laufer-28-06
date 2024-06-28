import {useState, useEffect, useRef} from "react";
import Header from "../Components/Header";
import logo from "../assets/laufer.png"
import footer from "../assets/Footer.png";
import { useLocation } from "react-router-dom";
import QuoteTable from "../Components/QuoteTable";
import html2pdf from "html2pdf.js";
import Form from "../Components/Form";
import { PDFDocument } from 'pdf-lib';
import Jaw from "../Components/Jaw";
import * as pdfJS from "pdfjs-dist";
import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
pdfJS.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;


//--------------------
const NewPdf = ()  => {
    const location = useLocation();
   // const formData = location.state;
    const { formData, contactFormData, tableData } = location.state || {};

    const imageList = {
        "Ausführung der Verblendung": [
        { src: '/public/Images/group1.png', alt: 'Image 1', name: 'image1', id: 'img1' },
        { src: '/public/Images/group2.png', alt: 'Image 2', name: 'image2', id: 'img2' },
        { src: '/public/Images/group3.png', alt: 'Image 3', name: 'image3', id: 'img3' },
        { src: '/public/Images/group4.png', alt: 'Image 4', name: 'image4', id: 'img4' },
        { src: '/public/Images/group5.png', alt: 'Image 5', name: 'image5', id: 'img5' },
        { src: '/public/Images/group6.png', alt: 'Image 6', name: 'image6', id: 'img6' },
        { src: '/public/Images/group7.png', alt: 'Image 7', name: 'image7', id: 'img7' }
        ],
        "Appr. Kontakt": [
        { src: '/public/Images/group8.png', alt: 'Image 8', name: 'image8', id: 'img8' },
        { src: '/public/Images/group9.png', alt: 'Image 9', name: 'image9', id: 'img9' },
        { src: '/public/Images/group10.png', alt: 'Image 10', name: 'image10', id: 'img10' }
        // Add more images as needed
        ],
        "Okkl. Kontakt": [
        { src: '/public/Images/group11.png', alt: 'Image 11', name: 'image11', id: 'img11' },
        { src: '/public/Images/group12.png', alt: 'Image 12', name: 'image12', id: 'img12' },
        { src: '/public/Images/group13.png', alt: 'Image 13', name: 'image13', id: 'img13' }
        ],
        "Brückenglied": [
        { src: '/public/Images/group14.png', alt: 'Image 14', name: 'image14', id: 'img14' },
        { src: '/public/Images/group15.png', alt: 'Image 15', name: 'image15', id: 'img15' },
        { src: '/public/Images/group16.png', alt: 'Image 16', name: 'image16', id: 'img16' },
        { src: '/public/Images/group17.png', alt: 'Image 17', name: 'image17', id: 'img17' }
        ]
      };

 const Title = ({ text }) => <h3>{text}</h3>;
      const ImageCheckbox = ({ src, alt, name, id }) => (
        <div className="img-checkbox text-center">
          <img src={src} alt={alt} name={name} id={id} />
          <input type="checkbox" name={name} id={id} />
        </div>
      );
      const Section = ({ title, items }) => (
        <div className="section">
          <Title text={title} />
          <div className="items flex">
            {items.map((item, index) => (
              <ImageCheckbox 
                key={index}
                src={item.src}
                alt={item.alt}
                id={item.id}
                name={item.name}
              />
            ))}
          </div>
        </div>
      );
//----------- copy
console.log("these are new fields.", formData)


return (
    <div>
    <Header />

{formData ? (

<div>
{ true && (<div>

  <div>
<div className="container mx-auto">
        <div className="flex">
          <p className="w-[20%]">Praxis:</p>
          <p>Patient:.........................</p>
        </div>
        <div className="flex justify-between">
            <div className="w-[60%] ">
            <div className="content-form max-w-[200px] ml-auto">
          <div className="from-value flex flex-col ">
            <p> Legierung</p>
            <label className="cursor">
              <input type="checkbox" name="Hochgold" value="Hochgold" />
              Hochgold
            </label>
            <label className="cursor">
              <input type="checkbox" name="NEM" value="NEM" />
              NEM
            </label>
            <label className="cursor">
              <input type="checkbox" name="Titan" value="Titan" />Hochgold
            </label>
            <label className="cursor">
              <input type="checkbox" name="Hochgold" value="Hochgold" />
              
            </label>
          </div>
        </div>
        
        <p>Bitte unbedingt gewünschte Ausführung ankreuzen!</p>
        <div className="flex justify-between items-center gap-10">
            <div className="flex max-w-[250px]">
                <img src={logo} alt="" />
                <input type="checkbox" id="vitapan" />
            </div>
            <div className=" max-w-[250px]">
              <div className="flex">
                <img src={logo} alt="" />
                <input type="checkbox" name="Exklusiv (BEL/KASSE)" id="vitapan" value="Exklusiv (BEL/KASSE)"
                 checked={formData.pricerange === "Exklusiv (BEL/KASSE)"} />
                </div>
            <p>{formData.pricerange}</p>
                <h3 className="text-[#F7CF47] font-bold">Exclusive</h3>
            </div>
        </div>
        </div>
        <div className="w-[30%]">
    
        <div className="select-section flex flex-wrap gap-5"> 
    {Object.keys(imageList).map((section, index) => (
      <Section
        key={index}
        title={section}
        items={imageList[section]}
      />
    ))}
    <div className="section">
 
     <Title text="Zahnfarbe" />
      <div className="items grid">
        <label>
          <input type="checkbox" id="vitapan" />
          Vitapan
        </label>
        <label>
          <input type="checkbox" id="biodent" />
          Biodent
        </label>
        <label>
          <input type="checkbox" id="3d-master" />
          3D Master
        </label>
      </div>
    </div>
    <div className="section">
      <Title text="Papillen" />
<div className="flex">
<div className="items">
      <img src="/public/Images/group18.png" alt="" />
      <label>
        offent
          <input type="checkbox" id="offent"/>
        </label>
      </div>
      <div className="items">
      <img src="/public/Images/group19.png" alt="" />
      <label>
      geschlossen
          <input type="checkbox" id="geschlossen" />
        </label>
      </div>
</div>
      </div>
      <img src="/public/Images/group20.png" alt="" />
  </div>
        </div>
      </div>
  <div className="my-5">
  <Jaw formData={formData} editable={false}/>
  </div>

  <div>
    <h3>Termine:</h3>
    <table className="newpdf-table w-[100%]">
      <thead>
        <tr>
          <th>FU-Löffel</th>
          <th> Bißnahme</th>
          <th> Einprobe 1</th>
          <th> Einprobe 2</th>
          <th className="bg-[#fdebb2]"> Fertigstellung</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="bg-[#fdebb2]"></td>
        </tr>
      </tbody>
    </table>
    <div className=" mt-[60px]">
      <p>Der Auftrag wird zu den Allgemeinen Geschäfts-, Lieferungs- und Zahlungsbedingungen des Zahntechniker-Handwerks ausgeführt.
      Eine gesonderte Bestätigung des Auftrages erfolgt nicht.</p>
      <h2 className="font-bold">Bitte mit Kugelschreiber beschriften und ausreichend aufdrücken</h2>
      <div className="flex mt-[60px] gap-8">
        <div> <p>Loufer Zahntechnik GmbH</p>
        <p>Saarburger Ding 30.6229 Mannheim</p></div>
        <div className="col-2 border-solid border-[#f8d438] border-x-[1px] px-[20px]">
          <p>Freecall 0800-7788 123</p>
          <p>Telefon 0700-4848 5001</p>
        </div>
        <div><p>Sitz: Mannheim Handelsregister Mannheim</p>
        <p>HRB 6755-Geschäftsführer: Andreas Laufer</p></div>
      </div>
    </div>
  </div>
      </div>
</div> 


  </div> )}

  </div>
      ) : (
        <p>Keine Daten verfügbar</p>
      )}
          </div>
        );
      };
      
      export default NewPdf;