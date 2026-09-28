import React, { useState } from 'react';
import { FolderKanban, Search, Filter, ArrowRight, Upload, Plus } from 'lucide-react';
import { Tender } from '../../types';
import { NavItem } from '../layout/Sidebar';

interface MyTendersViewProps {
  tenders: Tender[];
  onSelectTender: (tender: Tender) => void;
  onNavigate: (tab: NavItem) => void;
}

export const MyTendersView: React.FC<MyTendersViewProps> = ({
  tenders,
  onSelectTender,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenders = tenders.filter((t) => {
    return (
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
              OFFICER REPOSITORY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            My Procurement Tenders
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Manage, review, and track Indian Standard compliance across all uploaded tender specifications.
          </p>
        </div>

        <button
          onClick={() => onNavigate('new-analysis')}
          className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Analyze New Tender</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-gov">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenders by Tender ID, title, or department..."
            className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Tenders Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTenders.map((tender) => (
          <div key={tender.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-gov hover:shadow-gov-md transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {tender.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  tender.status === 'Analysis Complete'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : tender.status === 'Verified & Approved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {tender.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {tender.title}
              </h3>

              <div className="text-xs text-slate-500 font-medium">
                {tender.department} • <span className="font-mono">{tender.uploadDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3 text-[11px] text-slate-600 font-semibold">
                <span>Standards: <strong className="text-teal-700">{tender.recommendedStandardsCount}</strong></span>
                <span>•</span>
                <span>Gaps: <strong className="text-govred-600">{tender.complianceGapsCount}</strong></span>
              </div>

              <button
                onClick={() => onSelectTender(tender)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1"
              >
                <span>View Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
