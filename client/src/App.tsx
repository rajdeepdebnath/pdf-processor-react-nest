import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";

function App() {
  const iframe = useRef<HTMLIFrameElement | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );

  // useEffect(() => {
  //   const getInitialData = async () => {
  //     let response = await axios.get(`${import.meta.env.VITE_API_URL}?id=1`);
  //     setFormData(response.data);
  //   };
  //   getInitialData();
  // }, []);

  const loadPdf = async () => {
    // console.log(iframe);
    // if (iframe.current) iframe.current.src = "http://localhost:5173/a4.pdf";

    await fillForm();
  };

  async function fillForm() {
    const formUrl = "http://localhost:5173/a4.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    const firstName = form.getTextField("Firstname");
    firstName.setText("Hiii!!");

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    if (iframe.current) iframe.current.src = pdfDataUri;
  }

  async function createPdf() {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    page.drawText("Creating PDFs in JavaScript is awesome!", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "a4.pdf", "application/pdf");
  }

  const savePdf = async () => {
    let pdfDataUri = "";
    if (iframe.current) {
      pdfDataUri = iframe.current.src;
      const formPdfBytes2 = await fetch(pdfDataUri).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc2 = await PDFDocument.load(formPdfBytes2);
      const form2 = pdfDoc2.getForm();

      const firstName2 = form2.getTextField("Firstname");
      console.log(firstName2.getText());
      // let response = await axios.put(
      //   `${import.meta.env.VITE_API_URL}?id=1`,
      //   formData
      // );
      // console.log(response);
    }
  };

  return (
    <>
      <div>
        <button onClick={loadPdf}>Load Pdf</button>
      </div>
      <div>
        <button onClick={savePdf}>Save Pdf</button>
      </div>
      <iframe
        ref={iframe}
        id="main-iframe"
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </>
  );
}

export default App;
