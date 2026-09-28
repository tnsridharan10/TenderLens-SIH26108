import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  Flag, 
  Layers, 
  FileCheck2,
  Share2,
  Search,
  Check
} from 'lucide-react';
import { RecommendedStandard, Tender } from '../../types';
import { MOCK_INDIAN_STANDARDS } from '../../data/mockData';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  standard: RecommendedStandard | null;
  tender: Tender;
  onVerifyStandard: (standardId: string) => void;
  onFlagStandard: (standardId: string) => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  standard,
  tender,
  onVerifyStandard,
  onFlagStandard,
}) => {
  if (!isOpen || !standard) return null;

  const [activeTab, setActiveTab] = useState<'evidence' | 'standard-info' | 'clauses'>('evidence');
  const [copiedLink, setCopiedLink] = useState(false);

  // Find full standard info from catalog
  const fullStandardInfo = MOCK_INDIAN_STANDARDS.find(
    s => s.code.toLowerCase().includes(standard.code.split(':')[0].toLowerCase())
  );

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between text-slate-800">
          
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {standard.code}
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                  {standard.category}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-500/30">
                  DEMO EVIDENCE
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                {standard.title}
              </h3>
              <p className="text-xs text-slate-400">
                Extracted for Tender: <span className="font-mono text-slate-300">{tender.id}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Nav Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'evidence' ? 'border-blue-600 text-blue-700 bg-white font-bold' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Evidence & PDF Provenance</span>
            </button>
            <button
              onClick={() => setActiveTab('standard-info')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'standard-info' ? 'border-blue-600 text-blue-700 bg-white font-bold' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Standard Details & BIS Info</span>
            </button>
            <button
              onClick={() => setActiveTab('clauses')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'clauses' ? 'border-blue-600 text-blue-700 bg-white font-bold' : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Matched Clauses ({fullStandardInfo?.keyClauses.length || 2})</span>
            </button>
          </div>

          {/* Drawer Body Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            {activeTab === 'evidence' && (
              <>
                {/* AI Recommendation Rationale */}
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs mb-1">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Why This Indian Standard Is Recommended</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {standard.evidenceText}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-blue-800 font-medium">
                    <span>Relevance Match Score: <strong className="text-teal-700 font-mono text-xs">{standard.relevanceScore}%</strong></span>
                    <span>Clause Reference: <strong className="font-mono text-slate-800">{standard.clauseNumber}</strong></span>
                  </div>
                </div>

                {/* Simulated PDF Document Evidence Viewer */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center space-x-1.5">
                      <FileText className="w-4 h-4 text-red-600" />
                      <span>Document Provenance Preview (Page {standard.pdfPage})</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Source: {tender.fileName}</span>
                  </div>

                  {/* PDF Document View Container */}
                  <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-700 p-4 font-mono shadow-inner space-y-3 relative">
                    {/* Top Simulated Page Header */}
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                      <span>TENDER SPECIFICATION DOCUMENT • PAGE {standard.pdfPage}</span>
                      <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">AI Highlighted Snippet</span>
                    </div>

                    <div className="text-[11px] leading-relaxed text-slate-300">
                      <span className="text-slate-500 block mb-1">[...] SECTION B - TECHNICAL SPECIFICATION FOR ELECTRICAL WORKS [...]</span>
                      
                      <div className="p-3 bg-teal-950/80 border-l-4 border-teal-400 text-teal-100 rounded-r-lg my-2 shadow-md">
                        <span className="text-[10px] font-bold text-teal-300 block mb-1 uppercase tracking-wider">
                          ★ Extracted Target Clause {standard.clauseNumber}
                        </span>
                        "The contractor shall supply 1100V Grade Multi-Core Copper Conductor, heavy duty PVC insulated cables with FRLS outer sheath conforming to Indian Standard requirements. All cables shall be armoured with galvanized steel strip over inner PVC sheath..."
                      </div>

                      <span className="text-slate-500 block mt-1">[...] 3.5 Bending Radius & Trench Laying Standards [...]</span>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                      <span>Extracted by Spring AI NLP Engine</span>
                      <span className="text-teal-400 font-semibold">Verified Vector Embeddings</span>
                    </div>
                  </div>
                </div>

                {/* Officer Verification Status Box */}
                <div className={`p-4 rounded-xl border ${
                  standard.verifiedByOfficer
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center space-x-1.5">
                      {standard.verifiedByOfficer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Standard Status: Verified by Officer</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Standard Status: Pending Officer Verification</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/60">
                      {standard.status}
                    </span>
                  </div>

                  {standard.officerNotes && (
                    <p className="text-xs text-slate-700 mt-2 bg-white/80 p-2 rounded border border-slate-200">
                      <strong>Officer Note:</strong> {standard.officerNotes}
                    </p>
                  )}
                </div>
              </>
            )}

            {activeTab === 'standard-info' && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">{standard.code}</h4>
                  <p className="text-slate-600 font-medium">{standard.title}</p>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {fullStandardInfo?.description || 'Primary Indian Standard governing material, construction, and mandatory testing parameters for government procurement compliance.'}
                  </p>
                </div>

                {fullStandardInfo && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">BIS Standard Details</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">Publication Year</span>
                        <span className="font-bold text-slate-900">{fullStandardInfo.publicationYear}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                        <span className="text-slate-500 block text-[10px]">Current BIS Status</span>
                        <span className="font-bold text-teal-600">{fullStandardInfo.currentStatus}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 col-span-2">
                        <span className="text-slate-500 block text-[10px]">BIS Technical Committee</span>
                        <span className="font-semibold text-slate-800">{fullStandardInfo.department}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related IS Codes */}
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Related Standards & Dependencies</h5>
                  <div className="flex flex-wrap gap-2">
                    {standard.relatedStandardCodes.map((code) => (
                      <span key={code} className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-semibold rounded-md border border-slate-200">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Official BIS Reference Link Placeholder */}
                <div className="pt-2">
                  <a
                    href={standard.officialBisUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCopyLink}
                    className="inline-flex items-center space-x-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
                  >
                    <span>View Official BIS Standard Portal Link (Demo)</span>
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'clauses' && (
              <div className="space-y-3">
                <p className="text-slate-500 text-xs">
                  Key clauses in {standard.code} matched to extracted tender requirements:
                </p>
                {fullStandardInfo?.keyClauses.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-blue-700 font-mono text-xs">{item.clause}</div>
                    <p className="text-slate-700 text-xs">{item.summary}</p>
                  </div>
                )) || (
                  <div className="p-4 bg-slate-50 text-slate-500 text-xs text-center">
                    Clauses matched dynamically via pgvector similarity.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => onFlagStandard(standard.id)}
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs rounded-xl border border-amber-300 flex items-center space-x-1.5 transition-colors"
            >
              <Flag className="w-3.5 h-3.5 text-amber-600" />
              <span>Flag for Review</span>
            </button>

            <button
              onClick={() => onVerifyStandard(standard.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
                standard.verifiedByOfficer
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-300" />
              <span>{standard.verifiedByOfficer ? 'Marked as Verified' : 'Mark as Verified'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
