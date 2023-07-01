import { useEffect, useState } from "react";
import "./App.css";
import PdfViewerComponent from "./components/PdfViewerComponent";
import axios from "axios";

function App() {
  const [document, setDocument] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );

  useEffect(() => {
    const getInitialData = async () => {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}?id=1`);
      setFormData(response.data);
    };
    getInitialData();
  }, []);

  const loadPdf = () => {
    setDocument("document.pdf");
  };

  const savePdf = async () => {
    let response = await axios.put(
      `${import.meta.env.VITE_API_URL}?id=1`,
      formData
    );
    console.log(response);
  };

  return (
    <>
      <div>
        <button onClick={loadPdf}>Load Pdf</button>
      </div>
      <div>
        <button onClick={savePdf}>Save Pdf</button>
      </div>
      {document && formData && (
        <div className="pdf-viewer">
          <PdfViewerComponent
            document={document}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
      )}
    </>
  );
}

export default App;
