import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  Building2, 
  FileText, 
  Sparkles,
  Check
} from 'lucide-react';
import { Tender } from '../../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ComplianceReportViewProps {
  tender: Tender;
}

export const ComplianceReportView: React.FC<ComplianceReportViewProps> = ({ tender }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handle Print Report
  const handlePrint = () => {
    window.print();
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = ["Item Type", "Code / Specification", "Title / Extracted Value", "Category / Clause", "Status", "Officer Verification"];
    const rows = [
      ...tender.extractedSpecs.map(s => [
        "Extracted Spec",
        s.specification,
        `"${s.extractedValue.replace(/"/g, '""')}"`,
        s.clauseReference,
        s.reviewStatus,
        "N/A"
      ]),
      ...tender.recommendedStandards.map(s => [
        "Recommended Standard",
        s.code,
        `"${s.title.replace(/"/g, '""')}"`,
        s.category,
        s.status,
        s.verifiedByOfficer ? "Verified" : "Pending"
      ]),
      ...tender.missingRequirements.map(m => [
        "Missing Requirement",
        m.requirementName,
        `"${m.recommendedAction.replace(/"/g, '""')}"`,
        m.relatedISCode,
        m.riskLevel,
        m.officerStatus
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TenderLens_Compliance_Report_${tender.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Download PDF
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const element = document.getElementById('printable-report');
      if (element) {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`TenderLens_Compliance_Report_${tender.id}.pdf`);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="font-sans p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl no-print">
        <div>
          <h2 className="text-lg font-bold text-white">Tender Compliance Report Preview</h2>
          <p className="text-xs text-slate-400">Official Government Procurement Compliance & Standards Audit Document</p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-blue-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Downloaded PDF</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* The Printable Official Report Document Body */}
      <div
        id="printable-report"
        className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl border border-slate-300 shadow-2xl space-y-6 text-xs max-w-4xl mx-auto font-sans relative"
      >
        {/* Official Header & Emblem */}
        <div className="border-b-2 border-slate-900 pb-5 text-center space-y-2">
          <div className="flex justify-between items-start">
            <div className="text-left font-mono text-[10px] text-slate-500">
              <div>REPORT ID: TL-RPT-2026-9921</div>
              <div>DATE: {new Date().toLocaleDateString()}</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center mx-auto mb-1 font-bold">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-base font-extrabold uppercase tracking-wider text-slate-900">
                GOVERNMENT E-PROCUREMENT PORTAL
              </h1>
              <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                VERIFIED TENDER STANDARDS COMPLIANCE AUDIT REPORT
              </h2>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-right border p-1.5 rounded bg-slate-50 border-slate-300">
              <QrCode className="w-12 h-12 text-slate-800" />
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">VERIFIED REPORT</div>
            </div>
          </div>
        </div>

        {/* Tender Metadata Overview Grid */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase block">Tender Reference ID</span>
            <span className="font-bold text-slate-900 font-mono">{tender.id}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase block">Procurement Department</span>
            <span className="font-bold text-slate-900">{tender.department}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase block">Analysis Status</span>
            <span className="font-bold text-teal-700">{tender.status}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase block">Officer Verification Rate</span>
            <span className="font-bold text-blue-700 font-mono">{tender.verificationPercentage}% Verified</span>
          </div>
          <div className="col-span-2 md:col-span-4">
            <span className="text-slate-500 text-[10px] font-semibold uppercase block">Tender Subject Title</span>
            <span className="font-bold text-slate-900 text-xs">{tender.title}</span>
          </div>
        </div>

        {/* Section 1: Extracted Technical Specifications */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
            1. Extracted Technical Specifications ({tender.extractedSpecs.length})
          </h3>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2 px-3">Specification Parameter</th>
                <th className="py-2 px-3">Extracted Technical Value</th>
                <th className="py-2 px-3">Page / Clause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tender.extractedSpecs.map((spec) => (
                <tr key={spec.id}>
                  <td className="py-2 px-3 font-semibold text-slate-900">{spec.specification}</td>
                  <td className="py-2 px-3 text-slate-700">{spec.extractedValue}</td>
                  <td className="py-2 px-3 font-mono text-[10px] text-slate-500">P.{spec.pageNumber} • {spec.clauseReference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: Verified Indian Standards */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
            2. Verified Indian Standards (IS Codes) ({tender.recommendedStandards.length})
          </h3>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2 px-3">IS Code</th>
                <th className="py-2 px-3">Standard Title</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Officer Sign-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tender.recommendedStandards.map((std) => (
                <tr key={std.id}>
                  <td className="py-2 px-3 font-bold text-slate-900 font-mono">{std.code}</td>
                  <td className="py-2 px-3 text-slate-800">{std.title}</td>
                  <td className="py-2 px-3 text-slate-600">{std.category}</td>
                  <td className="py-2 px-3 font-semibold text-teal-700">
                    {std.verifiedByOfficer ? '✓ Officer Approved' : '⏳ Pending Approval'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Safety Gaps & Rectification Notes */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
            3. Safety & Quality Gaps Audit ({tender.missingRequirements.length})
          </h3>
          {tender.missingRequirements.map((gap) => (
            <div key={gap.id} className="p-3 bg-slate-50 border border-slate-300 rounded space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{gap.requirementName}</span>
                <span className="text-govred-600 font-mono">{gap.riskLevel}</span>
              </div>
              <p className="text-slate-700"><strong>Recommended Rectification:</strong> {gap.recommendedAction}</p>
              <p className="text-slate-500 font-mono text-[10px]">Officer Record: {gap.officerStatus}</p>
            </div>
          ))}
        </div>

        {/* Official Officer Signature & Seal Section */}
        <div className="pt-8 border-t-2 border-slate-900 flex justify-between items-end">
          <div className="text-[10px] text-slate-500 space-y-1 max-w-xs">
            <p>Report generated via <strong>TenderLens SIH26108 AI Engine</strong>.</p>
            <p>Verified against BIS National Standards Database.</p>
          </div>

          <div className="text-center space-y-8">
            <div className="text-xs font-bold text-slate-900 border-b border-slate-400 pb-1 w-48 mx-auto">
              Officer R. Sharma
            </div>
            <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
              Senior Procurement Manager Sign-off & Seal
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
