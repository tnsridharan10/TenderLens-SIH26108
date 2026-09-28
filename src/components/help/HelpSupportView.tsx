import React from 'react';
import { HelpCircle, BookOpen, FileText, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, Info } from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  return (
    <div className="font-sans p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Help & Procurement Officer User Guide
        </h2>
        <p className="text-xs text-slate-300">
          Frequently asked questions, verification workflows, and SIH 2026 project documentation for TenderLens.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-gov space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
            Procurement Officer Quick Start Workflow
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">1</div>
              <h4 className="font-bold text-slate-900">Upload Specification</h4>
              <p className="text-slate-600 text-xs">Upload your draft tender PDF or DOCX file under "Analyze New Tender".</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">2</div>
              <h4 className="font-bold text-slate-900">Review AI IS Recommendations</h4>
              <p className="text-slate-600 text-xs">Inspect recommended Indian Standards, clause provenance, and safety gap alerts.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">3</div>
              <h4 className="font-bold text-slate-900">Sign-off & Generate Report</h4>
              <p className="text-slate-600 text-xs">Mark standards as verified and export the official signed PDF/CSV compliance report.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
            Frequently Asked Questions (FAQ)
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Q: Are the AI recommendations legally binding?</h4>
              <p className="text-slate-600 leading-relaxed">
                No. AI recommendations serve as an intelligent assistant to cross-reference 1,538+ BIS codes. Procurement officers must review evidence snippets and apply official sign-off before publishing tenders.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Q: How are outdated Indian Standards detected?</h4>
              <p className="text-slate-600 leading-relaxed">
                TenderLens connects to a CDC event stream monitoring official BIS gazette publications. When a standard (e.g. IS 1554 Part 1) is amended or superseded, an instant alert is generated for all affected active tenders.
              </p>
            </div>
          </div>
        </div>

        {/* Team & SIH Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-blue-900">
          <div>
            <span className="font-bold block">Smart India Hackathon 2026 • Team Tender Titanzzz</span>
            <span className="text-[11px] text-blue-700">Problem Statement SIH26108: AI Engine for Procurement Indian Standards</span>
          </div>
          <span className="px-3 py-1 bg-blue-900 text-white font-mono text-[10px] font-bold rounded-lg">
            PROTOTYPE V1.0
          </span>
        </div>
      </div>
    </div>
  );
};
