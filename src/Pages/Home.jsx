import Header from "../Components/Header";
import QuoteTable from "../Components/QuoteTable";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Description from "../Components/Description";
import Jaw from "../Components/Jaw";
import { generateQuoteTableData } from "../Util/quoteTableLogic";
import Form from "../Components/Form";


const style = {
  title: {
    fontSize: "24px",
    width: "100%",
    marginBottom: "20px",
  },
  quoteSection: {
    marginTop: "100px",
  },
  subHeading: {
    marginBottom: "20px"
  },
  checkbox: {
    borderRadius: "6px",
    // padding: "5px",
    border: "2px solid var(--Neutrals-400, #CBD2E0)",
  },
  checkboxField: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  }
};



export default function Home() {
  const [formData, setFormData] = useState({
    priceclass: "Preisgünstig/ Laufer Zahntechnik",
    hardshipcase: false,
    facebow: false,
    digital: "",
    health: "",
    implant: "",
    textarea: "",
    material: "",
    teeth: {},
    typework: "",
    upperJaw: "",
    lowerJaw: "",
    vollantom: false,
    ios: false,
  });
  const [contactFormData, setContactFormData] = useState({
    email: "",
    name: "",
    houseno: "",
    postcode: "",
    location: "",
    secondMail: "",
  });

  const [errors, setErrors] = useState({
    name: "", // Error message for name field
    // Other error messages...
  });

  const navigate = useNavigate();

  const handleChange = (newFormData) => {
   
    const tableData = generateQuoteTableData(newFormData);
    setTableData(tableData);
    setFormData(newFormData);
  };

  const handleContactFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    setContactFormData({ ...contactFormData, [name]: value });
    
    console.log(contactFormData);
  };

  const [tableData, setTableData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    let newErrors = { ...errors };

    // Validate name field
    const ctm_regex_lettes = /^[A-Za-z ]*$/;
    if (!contactFormData.name.trim()) {
      newErrors.name = "Dieses Feld ist erforderlich";
    } else if (!ctm_regex_lettes.test(contactFormData.name)) {
      newErrors.name = "Der Name darf nur Buchstaben enthalten";
    } else {
      newErrors.name = "";
    }

    if (!contactFormData.houseno.trim()) {
      newErrors.houseno = "Dieses Feld ist erforderlich";
    } else {
      newErrors.houseno = "";
    }

    if (!contactFormData.postcode.trim()) {
      newErrors.postcode = "Dieses Feld ist erforderlich";
    } else if (!/^\d+$/.test(contactFormData.postcode)) {
      newErrors.postcode = "Die Postleitzahl darf nur Zahlen enthalten";
    } else {
      newErrors.postcode = "";
    }

    if (!contactFormData.location.trim()) {
      newErrors.location = "Dieses Feld ist erforderlich";
    } else {
      newErrors.location = "";
    }

    if (!contactFormData.email.trim()) {
      newErrors.email = "Dieses Feld ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/.test(contactFormData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    } else {
      newErrors.email = "";
    }
    // Update errors state
    setErrors(newErrors);

    // Check if there are any validation errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      // If there are validation errors, don't proceed with form submission
      return;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

     console.log("Hiiii These are the form data", formData);
    // if (formData.priceclass === "Exklusiv (BEL/KASSE)") {
    //   navigate("/newpdf", { state: { formData, contactFormData, tableData } });
    // } else {
      navigate("/pdf", { state: { formData, contactFormData, tableData } });
  
}

  return (
    <div className="">
      <Header />
      <section className="breadcrum-section pt-[64px] container mx-auto px-5">
        <p style={style.title}>Wir bitten um Kostenvoranschlag</p>
        
        <div className="justify-between flex">
          <p className='<div class="text-black text-xl font-normal' style={style.subHeading}>
            1. Produktauswahl
          </p>
          {/* <div className="justify-center items-center gap-2.5 flex">
            <Link
              className="inline-block place-items-center grid w-[74px] h-[74px] bg-yellow-400 rounded-full text-white text-2xl font-semibold"
              to="/"
            >
              1
            </Link>
            <Link
              className="inline-block place-items-center grid w-[74px] h-[74px] bg-[#D1D1D1] rounded-full text-white text-2xl font-semibold"
              to="/pdf"
            >
              2
            </Link>
          </div> */}
        </div>
      </section>
      <section className="breadcrum-section pt-[64px] container mx-auto px-5">
        <form action="" className="from-value">
          <Form handleChange={handleChange} editable={true}/>
          

          

          <section style={style.quoteSection}>
          <p className='<div class="text-black text-xl font-normal' style={style.subHeading}>
            3. Ihr Kostenvoranschlag
          </p>
          <QuoteTable tableData={tableData} />
          </section>

          <div className="flex flex-col">
            <label className="text-sm mb-[8px]"> Bemerkungen</label>
            <textarea
              className="border-field h-[150px]"
              name="textarea"
              value={formData.textarea}
              onChange={handleChange}
            />
          </div>

          
        {/* </form> */}
        <div className="pt-[64px] pb-[64px]">
            <div className="flex flex-col">
            <p className='<div class="text-black text-xl font-normal' style={style.subHeading}>
              4. Angaben zur Kontaktperson</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[20px]"> {/* Update grid layout for mobile */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm mb-[8px]">Vor- und Nachname*</label>
                  <input
                    className="border-field"
                    type="text"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactFormChange}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="flex flex-col">
                  
                </div>
                <div className="flex flex-col">
                  
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="houseno" className="text-sm mb-[8px]">Hausnummer und Straße*</label>
                  <input
                    className="border-field"
                    type="text"
                    name="houseno"
                    value={contactFormData.houseno}
                    onChange={handleContactFormChange}
                  />
                  {errors.houseno && <p className="text-red-500 text-xs mt-1">{errors.houseno}</p>}
                </div>
                <div className="flex flex-col">
                  
                  </div>
                  <div className="flex flex-col">
                    
                  </div>
                <div className="flex flex-col">
                  <label htmlFor="postcode" className="text-sm mb-[8px]">Postleitzahl*</label>
                  <input
                    className="border-field"
                    type="text"
                    name="postcode"
                    value={contactFormData.postcode}
                    onChange={handleContactFormChange}
                  />
                  {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="location" className="text-sm mb-[8px]">Ort*</label>
                  <input
                    className="border-field"
                    type="text"
                    name="location"
                    value={contactFormData.location}
                    onChange={handleContactFormChange}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                                <div className="flex flex-col">
                  
                  </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm mb-[8px]">E-Mail*</label>
                  <input
                    className="border-field"
                    type="text"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="secondMail" className="text-sm mb-[8px]">Weitere E-Mail (optional)</label>
                  <input
                    className="border-field"
                    type="text"
                    name="secondMail"
                    value={contactFormData.secondMail}
                    onChange={handleContactFormChange}
                  />
                </div>
                
              </div>
              <button
                className="btn-primary w-[300px] mt-[40px]"
                onClick={handleSubmit}
              >
                Kostenvoranschlag anfragen
              </button>
              <Link
                to="/thank-you"
                className="text-black text-opacity-50 text-xs font-normal mt-5"
              >
                *Felder müssen ausgefüllt sein
              </Link>
            </div>
          </div>
          </form>
        {/* </div> */}
      </section>
    </div>
  );
}