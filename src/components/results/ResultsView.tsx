import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Filter, 
  Search,
  FileCheck2,
  RefreshCw,
  Building2,
  Share2,
  Download
} from 'lucide-react';
import { Tender, RecommendedStandard } from '../../types';
import { EvidenceDrawer } from '../evidence/EvidenceDrawer';
import { NavItem } from '../layout/Sidebar';

interface ResultsViewProps {
  tender: Tender;
  onNavigate: (tab: NavItem) => void;
  onUpdateTender: (updated: Tender) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  tender,
  onNavigate,
  onUpdateTender,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<RecommendedStandard | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Counts for Overview Card
  const recommendedCount = tender.recommendedStandards.length;
  const missingCount = tender.missingRequirements.length;
  const safetyCount = tender.recommendedStandards.filter(s => s.category.includes('Safety') || s.category.includes('Testing')).length;
  const pendingVerificationCount = tender.recommendedStandards.filter(s => !s.verifiedByOfficer).length;

  const handleOpenDetails = (standard: RecommendedStandard) => {
    setSelectedStandard(standard);
    setIsDrawerOpen(true);
  };

  const handleVerifyStandard = (standardId: string) => {
    const updatedStandards = tender.recommendedStandards.map(s => {
      if (s.id === standardId) {
        return { ...s, verifiedByOfficer: true, status: 'Recommended' as const };
      }
      return s;
    });

    const verifiedCount = updatedStandards.filter(s => s.verifiedByOfficer).length;
    const newPercentage = Math.round((verifiedCount / updatedStandards.length) * 100);

    const updatedTender: Tender = {
      ...tender,
      recommendedStandards: updatedStandards,
      verificationPercentage: newPercentage,
      status: newPercentage === 100 ? 'Verified & Approved' : 'Pending Verification'
    };

    onUpdateTender(updatedTender);
    if (selectedStandard?.id === standardId) {
      setSelectedStandard({ ...selectedStandard, verifiedByOfficer: true, status: 'Recommended' });
    }
  };

  const handleFlagStandard = (standardId: string) => {
    const updatedStandards = tender.recommendedStandards.map(s => {
      if (s.id === standardId) {
        return { ...s, verifiedByOfficer: false, status: 'Requires Verification' as const };
      }
      return s;
    });

    onUpdateTender({
      ...tender,
      recommendedStandards: updatedStandards
    });
  };

  // Filtered Standards List
  const filteredStandards = tender.recommendedStandards.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {tender.id}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {tender.department}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>DEMO DATA VERIFICATION</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {tender.title}
            </h2>
            <p className="text-xs text-slate-400 flex items-center space-x-3">
              <span>Document: <strong className="text-slate-300 font-mono">{tender.fileName}</strong> ({tender.fileSize})</span>
              <span>•</span>
              <span>Analysis Date: <strong className="text-slate-300">{tender.uploadDate}</strong></span>
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onNavigate('compliance-reports')}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Generate Compliance Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Card: Standards Analysis Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Standards Analysis Overview</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-extrabold text-slate-900">{recommendedCount}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Recommended Standards</div>
            <div className="text-[10px] text-teal-600 font-medium mt-1">IS Codes Matched</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-extrabold text-govred-600">{missingCount}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Missing Requirements</div>
            <div className="text-[10px] text-govred-600 font-medium mt-1">Safety & Testing Gaps</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-extrabold text-blue-700">{safetyCount}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Safety & Testing Standards</div>
            <div className="text-[10px] text-blue-600 font-medium mt-1">Mandatory Codes</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-extrabold text-govamber-600">{pendingVerificationCount}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Requires Verification</div>
            <div className="text-[10px] text-govamber-600 font-medium mt-1">Officer Action Needed</div>
          </div>
        </div>
      </div>

      {/* Section 1: Extracted Technical Specifications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Extracted Technical Specifications</h3>
            <p className="text-[11px] text-slate-500">Parameters automatically parsed by Spring AI NLP from tender document</p>
          </div>
          <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full">
            {tender.extractedSpecs.length} Specifications Parsed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Specification Parameter</th>
                <th className="py-3 px-4">Extracted Requirement Value</th>
                <th className="py-3 px-4">Source Clause / Page</th>
                <th className="py-3 px-4">Review Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tender.extractedSpecs.map((spec) => (
                <tr key={spec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{spec.specification}</td>
                  <td className="py-3 px-4 text-slate-700 max-w-sm">{spec.extractedValue}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    Page {spec.pageNumber} • {spec.clauseReference}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      spec.reviewStatus === 'verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : spec.reviewStatus === 'flagged'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {spec.reviewStatus === 'verified' ? 'Verified' : spec.reviewStatus === 'flagged' ? 'Flagged' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Recommended Indian Standards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Recommended Indian Standards (IS Codes)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Matches determined via dense vector similarity embeddings & knowledge graph reasoning
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Recommended">Recommended</option>
              <option value="Requires Verification">Requires Verification</option>
              <option value="Amendment Check Pending">Amendment Check Pending</option>
            </select>
          </div>
        </div>

        {/* Standards Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStandards.map((std) => (
            <div
              key={std.id}
              className={`bg-white rounded-2xl border p-5 shadow-gov hover:shadow-gov-md transition-all space-y-3 flex flex-col justify-between ${
                std.verifiedByOfficer ? 'border-teal-300 ring-1 ring-teal-200' : 'border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded font-mono font-extrabold text-xs bg-slate-900 text-white shadow-sm">
                      {std.code}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                      {std.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    std.status === 'Recommended'
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : std.status === 'Requires Verification'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : std.status === 'Amendment Check Pending'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {std.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {std.title}
                </h4>

                {/* Evidence Excerpt */}
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2 leading-relaxed">
                  <strong className="text-slate-800">Evidence Snippet:</strong> {std.evidenceText}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-semibold text-slate-500">Relevance:</span>
                  <span className="text-xs font-extrabold text-teal-600 font-mono">{std.relevanceScore}%</span>
                </div>

                <button
                  onClick={() => handleOpenDetails(std)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center space-x-1"
                >
                  <span>View Details & Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Drawer for Standard Evidence */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        standard={selectedStandard}
        tender={tender}
        onVerifyStandard={handleVerifyStandard}
        onFlagStandard={handleFlagStandard}
      />
    </div>
  );
};
