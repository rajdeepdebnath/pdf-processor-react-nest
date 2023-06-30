import { useEffect, useRef } from "react";

interface Props {
  document: string;
  setFormData: (data: any) => void;
}

export default function PdfViewerComponent(props: Props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const instantJSON = {
      format: "https://pspdfkit.com/instant-json/v1",
      formFieldValues: [
        {
          v: 1,
          type: "pspdfkit/form-field-value",
          name: "Firstname",
          value: "aaa",
        },
        {
          v: 1,
          type: "pspdfkit/form-field-value",
          name: "Lastname",
          value: "bbb",
        },
        {
          v: 1,
          type: "pspdfkit/form-field-value",
          name: "Email",
          value: "eee",
        },
        {
          v: 1,
          type: "pspdfkit/form-field-value",
          name: "Phone",
          value: "ppp",
        },
      ],
    };

    let PSPDFKit: any;

    (async function (setFormData) {
      PSPDFKit = await import("pspdfkit");
      let instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        instantJSON,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
      console.log(instance);
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
    })(props.setFormData);

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document, props.setFormData]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
