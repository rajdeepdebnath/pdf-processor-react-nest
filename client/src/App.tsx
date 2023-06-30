import { useState } from "react";
import "./App.css";
import PdfViewerComponent from "./components/PdfViewerComponent";

function App() {
  const [document, setDocument] = useState<string | null>(null);
  const [formData, setFormData] = useState<string | null>(null);

  const loadPdf = () => {
    setDocument("document.pdf");
  };

  const savePdf = () => {
    console.log(formData);
  };

  return (
    <>
      <div>
        <button onClick={loadPdf}>Load Pdf</button>
      </div>
      <div>
        <button onClick={savePdf}>Save Pdf</button>
      </div>
      {document && (
        <div className="pdf-viewer">
          <PdfViewerComponent document={document} setFormData={setFormData} />
        </div>
      )}
    </>
  );
}

export default App;
