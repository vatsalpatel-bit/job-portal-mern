import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeViewer = ({ resumeUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(1);

    return (
        <div className="flex flex-col h-[420px] bg-gray-100 rounded-xl overflow-hidden">

            {/*  Controls */}
            <div className="flex items-center justify-between p-2 bg-white border-b">
                <div className="flex gap-2 items-center">
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))}>
                        ⬅
                    </button>
                    <span className="text-sm">
                        {page} / {numPages || 1}
                    </span>
                    <button onClick={() => setPage(p => Math.min(p + 1, numPages))}>
                        ➡
                    </button>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => setScale(s => s - 0.2)}>➖</button>
                    <button onClick={() => setScale(s => s + 0.2)}>➕</button>
                </div>
            </div>

            {/* 📄PDF */}
            <div className="flex-1 overflow-auto flex justify-center">
                <Document
                    file={resumeUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                    <Page pageNumber={page} scale={scale} />
                </Document>
            </div>

        </div>
    );
};

export default ResumeViewer;