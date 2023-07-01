import { useEffect, useRef } from "react";

interface Props {
  document: string;
  formData: { [key: string]: string };
  setFormData: (data: any) => void;
}

export default function PdfViewerComponent({
  document,
  formData,
  setFormData,
}: Props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let formFieldValues = [];
    for (let k in formData) {
      if (k !== "id") {
        formFieldValues.push({
          v: 1,
          type: "pspdfkit/form-field-value",
          name: k,
          value: formData[k],
        });
      }
    }

    const instantJSON = {
      format: "https://pspdfkit.com/instant-json/v1",
      formFieldValues,
    };

    let PSPDFKit: any;

    (async function (setFormData) {
      PSPDFKit = await import("pspdfkit");
      let instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        instantJSON,
        // The document to open.
        document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
      const data = await instance.getFormFieldValues();
      setFormData(data);
      instance.addEventListener(
        "formFieldValues.update",
        async (updatedFormFields: any) => {
          const XFDF = await instance.getFormFieldValues();
          setFormData(XFDF);
        }
      );
      instance.setViewState((viewState: any) =>
        viewState.set("showToolbar", false)
      );
    })(setFormData);

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [document, setFormData]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
