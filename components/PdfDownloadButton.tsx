"use client";

import { useState } from "react";

const MAX_PDF_BYTES = 2 * 1024 * 1024;

export default function PdfDownloadButton() {
  const [isWorking, setIsWorking] = useState(false);

  const handleDownload = async () => {
    if (isWorking) {
      return;
    }
    setIsWorking(true);
    try {
      const target = document.getElementById("resume-root");
      if (!target) {
        return;
      }

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(target, {
        scale: 1.4,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const buildPdf = (quality: number) => {
        const imgData = canvas.toDataURL("image/jpeg", quality);
        const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = Math.min(
          pageWidth / imgProps.width,
          pageHeight / imgProps.height
        );
        const imgWidth = imgProps.width * ratio;
        const imgHeight = imgProps.height * ratio;
        const x = (pageWidth - imgWidth) / 2;
        const y = 24;
        pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight, undefined, "FAST");
        return pdf;
      };

      const qualities = [0.8, 0.65, 0.5];
      let pdf = buildPdf(qualities[0]);
      let blob = pdf.output("blob");

      for (const quality of qualities.slice(1)) {
        if (blob.size <= MAX_PDF_BYTES) {
          break;
        }
        pdf = buildPdf(quality);
        blob = pdf.output("blob");
      }

      pdf.save("Alejandro-De-La-Mora-Resume.pdf");
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <button
      className="download-button"
      onClick={handleDownload}
      type="button"
      disabled={isWorking}
    >
      {isWorking ? "Preparing PDF..." : "Download PDF"}
    </button>
  );
}
