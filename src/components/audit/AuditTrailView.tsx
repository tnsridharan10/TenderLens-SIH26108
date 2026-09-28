import React, { useState } from 'react';
import { History, Search, ShieldCheck, User, Sparkles, Filter, FileText } from 'lucide-react';
import { MOCK_AUDIT_TRAIL } from '../../data/mockData';

export const AuditTrailView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = MOCK_AUDIT_TRAIL.filter((log) => {
    return (
      log.tenderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                <History className="w-3 h-3 text-teal-400" />
                <span>IMMUTABLE AUDIT LOG ENGINE</span>
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-amber-300 text-xs font-bold">Tamper-Evident History</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Tender Verification Audit Trail
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Complete chronological record of document uploads, AI extractions, officer verification sign-offs, and compliance report generations.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-gov">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail by Tender ID, officer name, or action details..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Activity History</h3>
          <span className="text-xs font-semibold text-slate-500">{filteredLogs.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Tender ID</th>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold font-mono text-blue-700">{log.tenderId}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{log.action}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{log.user}</div>
                    <div className="text-[10px] text-slate-400">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {log.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
