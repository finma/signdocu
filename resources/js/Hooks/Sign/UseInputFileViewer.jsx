import { useEffect, useRef, useState } from "react";

function UseInputFileViewer(file) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageScale, setPageScale] = useState(1.0);
    const [frameWidth, setFrameWidth] = useState(0);
    const [frameHeight, setFrameHeight] = useState(0);
    const frameRef = useRef(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
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
        pageScale,
        setPageScale,
        frameWidth,
        frameHeight,
        frameRef,
        onDocumentLoadSuccess,
        goToPrevPage,
        goToNextPage,
        calculatePageScale,
    };
}

export default UseInputFileViewer;
