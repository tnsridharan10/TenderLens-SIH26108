import React from 'react';
import { 
  AlertTriangle, 
  BellRing, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { AmendmentAlert, Tender } from '../../types';

interface AmendmentAlertsViewProps {
  amendments: AmendmentAlert[];
  tenders: Tender[];
  onNavigateToTender: (tender: Tender) => void;
}

export const AmendmentAlertsView: React.FC<AmendmentAlertsViewProps> = ({
  amendments,
  tenders,
  onNavigateToTender,
}) => {
  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                <BellRing className="w-3 h-3 text-amber-400" />
                <span>BIS GAZETTE CDC MONITORING</span>
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-teal-300 text-xs font-semibold">Real-Time Synchronization Stream</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              BIS Amendment & Obsolescence Alerts
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Automatic alerts when Bureau of Indian Standards issues amendments or supersedes standards referenced in your department’s active procurement tenders.
            </p>
          </div>
        </div>
      </div>

      {/* Amendments List Cards */}
      <div className="space-y-4">
        {amendments.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-gov space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded font-mono font-extrabold text-xs ${
                  item.priority === 'Critical'
                    ? 'bg-govred-50 text-govred-700 border border-govred-200'
                    : 'bg-govamber-50 text-govamber-700 border border-govamber-200'
                }`}>
                  {item.isCode}
                </span>

                <h3 className="text-sm font-bold text-slate-900">{item.standardTitle}</h3>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">Gazette Date: {item.amendmentDate}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold text-[10px] rounded">
                  {item.priority} Urgency
                </span>
              </div>
            </div>

            {/* Change Detail Box */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{item.amendmentNumber}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold block">Previous Gazette Status</span>
                  <span className="text-slate-800 font-medium">{item.previousStatus}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] font-semibold block">New Revised Status</span>
                  <span className="text-govred-600 font-bold">{item.currentStatus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/60">
                <span className="text-amber-900 font-bold block mb-0.5">Required Officer Action:</span>
                <p className="text-slate-700 leading-relaxed">{item.actionRequired}</p>
              </div>
            </div>

            {/* Affected Tenders List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Affected Tenders in Procurement Pipeline ({item.affectedTenders.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {item.affectedTenders.map((aff) => {
                  const matchingTender = tenders.find(t => t.id === aff.id);
                  return (
                    <button
                      key={aff.id}
                      onClick={() => matchingTender && onNavigateToTender(matchingTender)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-mono text-xs rounded-lg border border-slate-200 transition-colors flex items-center space-x-1.5"
                    >
                      <span className="font-bold text-blue-600">{aff.id}</span>
                      <span>— {aff.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
