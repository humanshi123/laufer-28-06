import React, { useState, useEffect } from "react";
import logo from "../assets/image 7.png";
import footer from "../assets/Footer.png";
import { useLocation } from "react-router-dom";
import QuoteTable from "./QuoteTable";
 //import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import Form from "./Form";
import { PDFDocument } from "pdf-lib";
import { useRef } from "react";

import Jaw from "./Jaw";
// import pdfjsLib from "pdfjs-dist/build/pdf";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";

import * as pdfJS from "pdfjs-dist";
import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
pdfJS.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

// pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker
// import pdfjsWorker from "../../lib/pdfjs.min.mjs"
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// // import the worker entry point

// Manually set the workerSrc to use the CDN

const styles = {
  right: {
    textAlign: "right",
  },
  page1DateContainerGrid: {
    alignItems: "flex-end",
  },
  headerRightInfoContainer: {
    alignItems: "flex-end",
  },
  headerRightInfoText: {
    // marginTop: "150px",
    textAlign: "right",
    // padding
    // marginBottom: "20px"
  },
  pageTitle: {
    fontSize: 20,
    lineHeight: "32px",
    height: 20,
  },
  kvaHeaderContainer: {
    // marginBottom: "60px"
  },
  downloadButton: {
    marginBottom: "20px",
    float: "right",
  },
  page2HeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  page2HeaderContainerLeft: {
    flexDirection: "column",
    display: "flex",
    flex: 1,
  },
  page2HeaderContainerRight: {
    flex: 1,
  },
  spitzenTechnikSpan: {
    backgroundColor: "#FFD402",
    width: "100%",
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 12,
    // padding: 2,
    lineHeight: "24px",
  },
  lauferAddressSpan: {
    fontSize: 8,
  },
  shippingTimeContainer: {
    marginBottom: "20px",
  },
};

function removeTextLayerOffset() {
  const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
  textLayers.forEach((layer) => {
    const { style } = layer;
    style.top = "0";
    style.left = "0";
    style.transform = "";
  });
}

const PDFHeader = () => (
  <div className="grid grid-cols-2 PDFRow">
    <div className="p-5">
      <p style={styles.spitzenTechnikSpan}>Spitzentechnik aus Meisterhand</p>
      <p style={styles.lauferAddressSpan}>
        Laufer Zahntechnik GmbH - Saarburger Ring 30 - 68229 Mannheim
      </p>
    </div>
    <div style={styles.right}>
      <img className="max-w-[200px] ml-auto " src={logo} alt="" />
    </div>
  </div>
);

const PDFFooter = () => (
  <div>
    <img src={footer} alt="" />
  </div>
);

export default function PrintData() {
  const location = useLocation();
  const { formData, contactFormData, tableData } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showHtml, setShowHtml] = useState(true);

  const pdfContainerRef = useRef();
  useEffect(() => {
    generatePDFData();
  }, []);

  const addImageToPdf = (pdf, canvas, page) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = pdf.internal.pageSize.getHeight();
    // const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(
      imgData,
      "PNG",
      0,
      page * imgHeight,
      imgWidth,
      page * imgHeight + imgHeight
    );
  };

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "myDocument.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDFData = async () => {
    // const userConfirmed = window.confirm("Do you want to download the PDF?");
    // if (userConfirmed) {
    const div1 = document.getElementById("pdf-content");
    const div2 = document.getElementById("pdf-content2");
    const div3 = document.getElementById("pdf-content3");
    div1.style.display = "block";
    div2.style.display = "block";
    if (formData.priceclass === "Exklusiv (BEL/KASSE)") {
      div3.style.display = "block";
    }
    // Function to clone the content and include input values
    const cloneWithInputValues = (element) => {
      const clone = element.cloneNode(true);
      const inputs = element.querySelectorAll("input, textarea, select");
      const clonedInputs = clone.querySelectorAll("input, textarea, select");

      inputs.forEach((input, index) => {
        if (input.type === "checkbox" || input.type === "radio") {
          clonedInputs[index].checked = input.checked;
        } else {
          clonedInputs[index].value = input.value;
        }
      });

      return clone;
    };

    // // Create a temporary container to hold both divs
    // const container = document.createElement('div');
    // // container.style.display = 'flex';
    // container.style.margin = 'auto';
    // // container.style.flexDirection = 'column';
    // // container.style.alignItems = 'center';

    // Create a temporary container to hold both divs
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent= "start";

    // Function to wrap content in a scaled container
    const createScaledContainer = (content) => {
      const wrapper = document.createElement("div");
      wrapper.style.transform = "scale(0.7)"; // Adjust the scale as needed
      wrapper.style.transformOrigin = "top center";
      wrapper.style.width = "130%"; // Compensate for the scale down
      //wrapper.style.pageBreakAfter = "always";
      wrapper.appendChild(cloneWithInputValues(content));
      return wrapper;
    };

    // container.appendChild(createScaledContainer(div1));
    // const pageBreak = document.createElement("div");
    // pageBreak.style.pageBreakAfter = "always";
    // container.appendChild(pageBreak);
    // container.appendChild(createScaledContainer(div2));

    // container.appendChild(pageBreak);
    // container.appendChild(createScaledContainer(div3));
    // Generate the PDF and convert it to a blob

    container.appendChild(createScaledContainer(div1));
    container.appendChild(createScaledContainer(div2));
    if (formData.priceclass === "Exklusiv (BEL/KASSE)") {
      container.appendChild(createScaledContainer(div3));
    }

    const options = {
      margin: 0.5,
      filename: "myDocument.pdf",
      image: { type: "jpeg", quality: 2.0 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf()
      .set(options)
      .from(container)
      .toPdf()
      .output("blob")
      .then((data) => {
        return data;
      });

    removeTextLayerOffset();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);

    // Hide the HTML content
    setShowHtml(false);

    // Render the PDF in a canvas
    // const pdfBytes = await pdfBlob.arrayBuffer();
    // const pdfDoc = await PDFDocument.load(pdfBytes);
    // const page = pdfDoc.getPages()[0];
    // const { width, height } = page.getSize();
    // console.log(width,height)

    // const canvas = document.createElement('canvas');
    // canvas.width = width;
    // canvas.height = height;
    // pdfContainerRef.current.appendChild(canvas);

    // const ctx = canvas.getContext('2d');
    // const viewport = {
    //   width: canvas.width,
    //   height: canvas.height
    // };

    // const renderContext = {
    //   canvasContext: ctx,
    //   viewport: viewport
    // };
    // pdfContainerRef.current.style.display = "none"
    // // const pdfjsLib = window["pdfjs-dist/build/pdf"];
    // // console.log(pdfjsLib)
    // const pdf = await pdfjsLib.getDocument(pdfBytes).promise;
    // const pdfPage = await pdf.getPage(1);
    // pdfPage.render(renderContext);
    const pdfBytes = await pdfBlob.arrayBuffer();
    const pdfDoc = await pdfJS.getDocument(pdfBytes).promise;
    const page = await pdfDoc.getPage(1);
    const viewport = page.getViewport({ scale: 1 });

    // const canvas = document.createElement("canvas");
    // canvas.width = viewport.width;
    // canvas.height = viewport.height;
    // pdfContainerRef.current.appendChild(canvas);
    // const context = canvas.getContext("2d");
    // canvas.width = viewport.width;
    // canvas.height = viewport.height;
    // pdfContainerRef.current.appendChild(canvas);

    
    const ctx = canvas.getContext("2d");
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };
  const imageList = {
    "Ausführung der Verblendung": [
      {
        src: "/public/Images/group1.png",
        alt: "Image 1",
        name: "image1",
        id: "img1",
      },
      {
        src: "/public/Images/group2.png",
        alt: "Image 2",
        name: "image2",
        id: "img2",
      },
      {
        src: "/public/Images/group3.png",
        alt: "Image 3",
        name: "image3",
        id: "img3",
      },
      {
        src: "/public/Images/group4.png",
        alt: "Image 4",
        name: "image4",
        id: "img4",
      },
      {
        src: "/public/Images/group5.png",
        alt: "Image 5",
        name: "image5",
        id: "img5",
      },
      {
        src: "/public/Images/group6.png",
        alt: "Image 6",
        name: "image6",
        id: "img6",
      },
      {
        src: "/public/Images/group7.png",
        alt: "Image 7",
        name: "image7",
        id: "img7",
      },
    ],
    "Appr. Kontakt": [
      {
        src: "/public/Images/group8.png",
        alt: "Image 8",
        name: "image8",
        id: "img8",
      },
      {
        src: "/public/Images/group9.png",
        alt: "Image 9",
        name: "image9",
        id: "img9",
      },
      {
        src: "/public/Images/group10.png",
        alt: "Image 10",
        name: "image10",
        id: "img10",
      },
      // Add more images as needed
    ],
    "Okkl. Kontakt": [
      {
        src: "/public/Images/group11.png",
        alt: "Image 11",
        name: "image11",
        id: "img11",
      },
      {
        src: "/public/Images/group12.png",
        alt: "Image 12",
        name: "image12",
        id: "img12",
      },
      {
        src: "/public/Images/group13.png",
        alt: "Image 13",
        name: "image13",
        id: "img13",
      },
    ],
    Brückenglied: [
      {
        src: "/public/Images/group14.png",
        alt: "Image 14",
        name: "image14",
        id: "img14",
      },
      {
        src: "/public/Images/group15.png",
        alt: "Image 15",
        name: "image15",
        id: "img15",
      },
      {
        src: "/public/Images/group16.png",
        alt: "Image 16",
        name: "image16",
        id: "img16",
      },
      {
        src: "/public/Images/group17.png",
        alt: "Image 17",
        name: "image17",
        id: "img17",
      },
    ],
  };

  const Title = ({ text }) => <h3 className="mb-[15px]">{text}</h3>;
  const ImageCheckbox = ({ src, alt, name, id }) => (
    <div className="img-checkbox text-center">
      <img src={src} alt={alt} name={name} id={id} />
      <input type="checkbox" name={name} id={id} />
    </div>
  );
  const Section = ({ title, items }) => (
    <div className="section">
      <Title text={title} />
      <div className="items flex gap-2">
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

  return (
    <section className="pt-[64px] container mx-auto px-5">
      <div style={styles.kvaHeaderContainer}>
        <p className="text-black text-2xl font-normal">Ihr Kostenvoranschlag</p>
        <br></br>
        <h2>
          Ihr Kostenvoranschlag wurde erfolgreich generiert und an folgende
          Email Adressen geschickt:
        </h2>
        <br></br>
        <p>{contactFormData.email}</p>
        <p>{contactFormData.secondMail}</p>
        <button
          onClick={handleDownloadClick}
          className="button margin-left"
          style={styles.downloadButton}
        >
          PDF Herunterladen
        </button>
      </div>
      {formData ? (
        <div>
          {true && (
            <div>
              {/* PAGE 1 */}
              <div
                id="pdf-content"
                className="text-[#888989] main relative"
                style={{ display: "none" }}
              >
                <PDFHeader></PDFHeader>
                <div
                  className="pt-28 grid grid-cols-2 "
                  style={styles.page1DateContainerGrid}
                >
                  <div className="left">
                    <p className="font-medium" style={styles.pageTitle}>
                      {" "}
                      <span className="bg-[#FFD402] yellow-square inline-block "></span>
                      Wir bitten um Kostenvoranschlag
                    </p>
                    <div className="box h-[200px] my-10 border-solid border-[grey] border-[2px] p-4">
                      <p>{contactFormData.name}</p>
                      <p>{contactFormData.houseno}</p>
                      <p>{contactFormData.postcode}</p>
                      <p>{contactFormData.location}</p>
                      <br></br>
                      <p>{contactFormData.email}</p>
                    </div>
                  </div>

                  <div
                    className="right my-10"
                    style={styles.headerRightInfoContainer}
                  >
                    <p style={styles.headerRightInfoText}>{"Seite:\t1"} </p>
                    <p style={styles.headerRightInfoText}>
                      {"Beleg-Nr.:\t0001"}{" "}
                    </p>
                    <p style={styles.headerRightInfoText}>
                      {"Datum:\t" + new Date().toLocaleDateString("de-DE")}{" "}
                    </p>
                  </div>
                </div>

                <Form
                  initialFormData={formData}
                  handleChange={() => console.log}
                  editable={false}
                />
                <textarea
                  className="h-[200px] border-solid border-[grey] border-[1px] w-full p-2"
                  value={formData.textarea}
                  name=""
                  id=""
                  disabled={true}
                ></textarea>
              </div>

              {/* PAGE 2 */}
              <div
                id="pdf-content2"
                className="text-[#888989] main relative pt-[100px]"
                style={{ display: "none"}}
              >
                <PDFHeader />
                <div
                  className="pt-10 redd grid grid-cols-2 "
                  style={styles.page1DateContainerGrid}
                >
                  <div className="left">
                    <p className="font-medium" style={styles.pageTitle}>
                      {" "}
                      <span className="bg-[#FFD402] yellow-square mr-2 inline-block "></span>
                      Kostenvoranschlag
                    </p>
                    <div className="box h-[200px] my-10 border-solid border-[grey] border-[2px] p-4">
                      <p>{contactFormData.name}</p>
                      <p>{contactFormData.houseno}</p>
                      <p>{contactFormData.postcode}</p>
                      <p>{contactFormData.location}</p>
                      <br />
                      <p>{contactFormData.email}</p>
                    </div>
                  </div>

                  <div
                    className="right my-10"
                    style={styles.headerRightInfoContainer}
                  >
                    <p style={styles.headerRightInfoText}>{"Seite:\t2"} </p>
                    <p style={styles.headerRightInfoText}>
                      {"Beleg-Nr.:\t0001"}{" "}
                    </p>
                    <p style={styles.headerRightInfoText}>
                      {"Datum:\t" + new Date().toLocaleDateString("de-DE")}{" "}
                    </p>
                  </div>
                </div>
                <div
                  className="pt-10 grid grid-cols-2 "
                  style={styles.page1DateContainerGrid}
                >
                  <div className="left">
                    <p>{"Arbeitsart:\t" + formData.typework} </p>
                  </div>
                </div>
                <QuoteTable tableData={tableData} />
                <div
                  className="grid grid-cols-2 "
                  style={styles.page1DateContainerGrid}
                >
                  <div className="left" style={styles.shippingTimeContainer}>
                    <p>
                      {"Lieferzeit:\t" +
                        tableData.shippingTime +
                        " Arbeitstage"}{" "}
                    </p>
                    <br />
                    <p>Deutsches Qualitätsprodukt! Kein Auslandszahnersatz! </p>
                  </div>
                </div>
                <PDFFooter></PDFFooter>
              </div>
              {/* Page-3--- */}
              <div
                id="pdf-content3"
                className="main relative py-[100px] container mx-auto"
                style={{ display: "none" }}
              >
                <PDFHeader></PDFHeader>
                <div className="flex pt-[30px]">
                  <p className="w-[20%]">Praxis:</p>
                  <p>Patient:.........................</p>
                </div>
                <div className="flex justify-between">
                  <div className="w-[60%] ">
                    <div className="content-form max-w-[200px] ml-auto">
                      <div className="from-value flex flex-col ">
                        <p className="my-[10px]"> Legierung</p>
                        <label className="cursor mb-[20px]">
                          <input
                            type="checkbox"
                            name="Hochgold"
                            value="Hochgold"
                          />
                          Hochgold
                        </label>
                        <label className="cursor mb-[20px]">
                          <input type="checkbox" name="NEM" value="NEM" />
                          NEM
                        </label>
                        <label className="cursor mb-[20px]">
                          <input type="checkbox" name="Titan" value="Titan" />
                          Hochgold
                        </label>
                        <label className="cursor mb-[20px]">
                          <input
                            type="checkbox"
                            name="Hochgold"
                            value="Hochgold"
                          />
                        </label>
                      </div>
                    </div>

                    <p>Bitte unbedingt gewünschte Ausführung ankreuzen!</p>
                    <div className="flex justify-between items-center gap-10">
                      <div className="flex items-center gap-5">
                        <img className=" max-w-[250px]" src={logo} alt="" />
                        <input
                          className="h-[20px] w-[20px]"
                          type="checkbox"
                          disabled
                          id="vitapan"
                        />
                      </div>
                      <div className="">
                        <div className="flex items-center gap-5">
                          <img className=" max-w-[250px]" src={logo} alt="" />
                          <input
                            className="h-[20px] w-[20px]"
                            type="checkbox"
                            name="Exklusiv (BEL/KASSE)"
                            id="vitapan"
                            value="Exklusiv (BEL/KASSE)"
                            checked
                          />
                        </div>
                        <p>{formData.pricerange}</p>
                        <h3 className="text-[#F7CF47] font-bold">Exclusive</h3>
                      </div>
                    </div>
                  </div>
                  <div className="w-[35%]">
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
                        <div className="items grid gap-2 items-center">
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
                              <input type="checkbox" id="offent" />
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
                  <Jaw formData={formData} editable={false} />
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
                    <p>
                      Der Auftrag wird zu den Allgemeinen Geschäfts-,
                      Lieferungs- und Zahlungsbedingungen des
                      Zahntechniker-Handwerks ausgeführt. Eine gesonderte
                      Bestätigung des Auftrages erfolgt nicht.
                    </p>
                    <h2 className="font-bold">
                      Bitte mit Kugelschreiber beschriften und ausreichend
                      aufdrücken
                    </h2>
                    <div className="flex mt-[60px] gap-8">
                      <div>
                        {" "}
                        <p>Loufer Zahntechnik GmbH</p>
                        <p>Saarburger Ding 30.6229 Mannheim</p>
                      </div>
                      <div className="col-2 border-solid border-[#f8d438] border-x-[1px] px-[20px]">
                        <p>Freecall 0800-7788 123</p>
                        <p>Telefon 0700-4848 5001</p>
                      </div>
                      <div>
                        <p>Sitz: Mannheim Handelsregister Mannheim</p>
                        <p>HRB 6755-Geschäftsführer: Andreas Laufer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={pdfContainerRef} style={{ marginTop: "20px" }}></div>
          {pdfUrl && (
            <div>
              {/* <a className="button margin-left" href={pdfUrl} download="myDocument.pdf">PDF Herunterladen</a> */}
              <iframe src={pdfUrl} width="100%" height="600px" />
              {/* <a className="button margin-left" href={pdfUrl} download="myDocument.pdf">PDF Herunterladen</a> */}
            </div>
          )}
        </div>
      ) : (
        <p>Keine Daten verfügbar</p>
      )}
    </section>
  );
}
