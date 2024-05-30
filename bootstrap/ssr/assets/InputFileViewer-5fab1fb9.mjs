import { a as jsx, F as Fragment, j as jsxs } from "../ssr.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { useState, useRef, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
function UseInputFileViewer(file) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const frameRef = useRef(null);
  const onDocumentLoadSuccess = ({ numPages: numPages2 }) => {
    setNumPages(numPages2);
  };
  useEffect(() => {
    const frameElement = frameRef.current;
    if (frameElement) {
      setFrameWidth(frameElement.offsetWidth);
      setFrameHeight(frameElement.offsetHeight);
    }
  }, [file]);
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const calculatePageScale = (pageWidth, pageHeight) => {
    const scaleWidth = frameWidth / pageWidth;
    const scaleHeight = frameHeight / pageHeight;
    return Math.min(scaleWidth, scaleHeight);
  };
  return {
    numPages,
    pageNumber,
    setPageScale,
    frameWidth,
    frameHeight,
    frameRef,
    onDocumentLoadSuccess,
    goToPrevPage,
    goToNextPage,
    calculatePageScale
  };
}
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function InputFileViewer({ file, isPreview = false }) {
  const {
    numPages,
    pageNumber,
    setPageScale,
    frameWidth,
    frameHeight,
    frameRef,
    onDocumentLoadSuccess,
    goToPrevPage,
    goToNextPage,
    calculatePageScale
  } = UseInputFileViewer(file);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "pdf-container", ref: frameRef, children: [
    /* @__PURE__ */ jsx("div", { className: "pdf-frame shadow-lg", children: /* @__PURE__ */ jsx(
      Document,
      {
        file,
        onLoadSuccess: onDocumentLoadSuccess,
        options: {
          cMapUrl: "cmaps/",
          cMapPacked: true
        },
        children: /* @__PURE__ */ jsx(
          Page,
          {
            pageNumber,
            width: frameWidth,
            frame: frameHeight,
            renderAnnotationLayer: false,
            renderTextLayer: false,
            onLoadSuccess: ({ width, height }) => {
              const pageScale = calculatePageScale(
                width,
                height
              );
              setPageScale(pageScale);
            }
          }
        )
      }
    ) }),
    numPages > 1 ? /* @__PURE__ */ jsxs("div", { className: "pagination flex justify-center mt-5 items-center gap-5", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          outline: true,
          size: "sm",
          onClick: goToPrevPage,
          disabled: pageNumber === 1,
          children: /* @__PURE__ */ jsx(Icon, { icon: "chevron-left" })
        }
      ),
      /* @__PURE__ */ jsxs("p", { children: [
        "Page ",
        pageNumber,
        " / ",
        numPages
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          outline: true,
          size: "sm",
          onClick: goToNextPage,
          disabled: pageNumber === numPages,
          children: /* @__PURE__ */ jsx(Icon, { icon: "chevron-right" })
        }
      )
    ] }) : null
  ] }) });
}
export {
  InputFileViewer as I
};
