import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ShieldAlert, 
  ArrowRight, 
  Check, 
  Sparkles, 
  FileCheck2,
  Info
} from 'lucide-react';
import { Tender, MissingRequirement } from '../../types';
import { NavItem } from '../layout/Sidebar';

interface ComplianceGapViewProps {
  tender: Tender;
  onUpdateTender: (updated: Tender) => void;
  onNavigate: (tab: NavItem) => void;
}

export const ComplianceGapView: React.FC<ComplianceGapViewProps> = ({
  tender,
  onUpdateTender,
  onNavigate,
}) => {
  const handleStatusChange = (gapId: string, status: 'Verified' | 'Not Applicable' | 'Needs Further Review') => {
    const updatedGaps = tender.missingRequirements.map((gap) => {
      if (gap.id === gapId) {
        return { ...gap, officerStatus: status };
      }
      return gap;
    });

    onUpdateTender({
      ...tender,
      missingRequirements: updatedGaps,
    });
  };

  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-red-500/20 text-red-300 border border-red-500/30">
                COMPLIANCE AUDIT MODE
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-300 text-xs font-mono">{tender.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Compliance Gap Analysis
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Automatic risk detection for missing safety clauses, mandatory factory testing methods, and certification requirements.
            </p>
          </div>

          <button
            onClick={() => onNavigate('compliance-reports')}
            className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all shrink-0"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Generate Compliance Report</span>
          </button>
        </div>
      </div>

      {/* Mandatory Government Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start space-x-3 text-amber-900 shadow-gov">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <strong className="font-bold text-amber-900">Procurement Officer Legal Verification Disclaimer</strong>
          <p className="text-slate-700 leading-relaxed">
            AI recommendations serve as intelligent guidance and require mandatory officer verification prior to final tender publication. Please review each flagged safety gap and record your decision below.
          </p>
        </div>
      </div>

      {/* Gaps List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Detected Safety & Testing Requirements Gaps</h3>
            <p className="text-[11px] text-slate-500">Cross-referenced against mandatory BIS standards</p>
          </div>
          <span className="text-xs font-bold text-govred-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {tender.missingRequirements.length} Gaps Detected
          </span>
        </div>

        {tender.missingRequirements.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">Zero Compliance Gaps Found</h4>
            <p className="text-xs text-slate-500">This tender document meets all mandatory Indian Standard safety requirements.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tender.missingRequirements.map((gap) => (
              <div key={gap.id} className="p-5 hover:bg-slate-50/60 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    {/* Risk Badge */}
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      gap.riskLevel === 'Critical Risk'
                        ? 'bg-govred-50 text-govred-700 border border-govred-200'
                        : gap.riskLevel === 'Medium Risk'
                        ? 'bg-govamber-50 text-govamber-700 border border-govamber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {gap.riskLevel}
                    </span>

                    <h4 className="text-sm font-bold text-slate-900">{gap.requirementName}</h4>
                  </div>

                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    Target Standard: {gap.relatedISCode}
                  </span>
                </div>

                {/* Gap Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold block">Detected Inconsistency</span>
                    <p className="text-slate-800 font-medium mt-0.5">{gap.detectedStatus}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold block">Recommended Rectification</span>
                    <p className="text-teal-700 font-semibold mt-0.5">{gap.recommendedAction}</p>
                  </div>
                </div>

                {/* Officer Action Toggles */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-xs font-semibold text-slate-600">Officer Decision Record:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(gap.id, 'Verified')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                        gap.officerStatus === 'Verified'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Verified & Rectified</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(gap.id, 'Not Applicable')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                        gap.officerStatus === 'Not Applicable'
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Not Applicable</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(gap.id, 'Needs Further Review')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                        gap.officerStatus === 'Needs Further Review'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Needs Further Review</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
