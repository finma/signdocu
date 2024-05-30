import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import useDragger from "@/Hooks/Sign/UseDragger";
import UseInputFileViewer from "@/Hooks/Sign/UseInputFileViewer";
import { Document, Page, pdfjs } from "react-pdf";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function InputFileViewer({
    file,
    isPreview = false,
    qrCode,
    setQrCode,
    XRef,
    YRef,
    qrCodeUpdate,
}) {
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
        calculatePageScale,
    } = UseInputFileViewer(file);

    const qrCodeClass = clsx(
        "absolute w-12 h-12 z-50"
        // `top-[${posY}px]`
        // { [`left-[${posX}px]`]: posX > 0 },
        // { [`top-[${posY}px]`]: posY > 0 }
    );

    console.log({ frameWidth, frameHeight });

    return (
        <>
            <div className="pdf-container" ref={frameRef}>
                <div className="pdf-frame shadow-lg relative overflow-hidden w-full h-full">
                    {/* <div className="w-full h-full absolute bg-blue-200"> */}
                    {/* <Draggable
                            bounds="parent"
                            onStart={onStart}
                            onStop={onStop}
                        > */}
                    {XRef && (
                        <QrCodeImage qrCode={qrCode} XRef={XRef} YRef={YRef} />
                    )}
                    {/* </Draggable> */}
                    {/* </div> */}
                    <Document
                        // file={isPreview ? file : URL.createObjectURL(file)}
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={{
                            cMapUrl: "cmaps/",
                            cMapPacked: true,
                        }}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={frameWidth}
                            frame={frameHeight}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            onLoadSuccess={({ width, height }) => {
                                const pageScale = calculatePageScale(
                                    width,
                                    height
                                );
                                setPageScale(pageScale);
                            }}
                        />
                    </Document>
                </div>
                {numPages > 1 ? (
                    <div className="pagination flex justify-center mt-5 items-center gap-5">
                        <Button
                            outline
                            size="sm"
                            onClick={goToPrevPage}
                            disabled={pageNumber === 1}
                        >
                            <Icon icon="chevron-left" />
                        </Button>
                        <p>
                            Page {pageNumber} / {numPages}
                        </p>
                        <Button
                            outline
                            size="sm"
                            onClick={goToNextPage}
                            disabled={pageNumber === numPages}
                        >
                            <Icon icon="chevron-right" />
                        </Button>
                    </div>
                ) : null}
            </div>
        </>
    );
}

const QrCodeImage = ({ qrCode, XRef, YRef }) => {
    // const [posX, setPosX] = useState(Number(XRef.current.value) * 2.3);
    // const [posY, setPosY] = useState(Number(YRef.current.value) * 2.3);
    const [posX, setPosX] = useState(Number(XRef.current.value) * 2.35);
    const [posY, setPosY] = useState(Number(YRef.current.value) * 2.35);

    const [activeDrags, setActiveDrags] = useState(0);
    const [deltaPosition, setDeltaPosition] = useState({
        // x: Number(XRef.current.value) * 2.3,
        // y: Number(YRef.current.value) * 2.3,
        x: Number(XRef.current.value) * 2.35,
        y: Number(YRef.current.value) * 2.35,
    });

    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };

    const onStop = () => {
        setActiveDrags(activeDrags - 1);
    };

    const handleDrag = (e, ui) => {
        const x = deltaPosition.x + ui.deltaX;
        const y = deltaPosition.y + ui.deltaY;

        // XRef.current.value = Math.floor(x * 0.43);
        // YRef.current.value = Math.floor(y * 0.43);
        XRef.current.value = Math.floor(x * 0.31);
        YRef.current.value = Math.floor(y * 0.31);
        console.log(`x: ${deltaPosition.x + ui.deltaX}`);
        setDeltaPosition({
            x: deltaPosition.x + ui.deltaX,
            y: deltaPosition.y + ui.deltaY,
        });
    };

    return (
        <Draggable
            bounds="parent"
            onStart={onStart}
            onStop={onStop}
            onDrag={handleDrag}
        >
            <img
                src={qrCode.url}
                id="qrcode"
                className="absolute w-10 h-10 sm:w-18 sm:h-18 z-50 hover:cursor-move"
                style={{
                    top: posY,
                    left: posX,
                }}
            />
        </Draggable>
    );
};

export default InputFileViewer;
