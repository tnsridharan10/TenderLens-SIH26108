import React from 'react';
import { Settings, Cpu, Server, Database, ShieldAlert, Key, Sparkles, Sliders } from 'lucide-react';

interface SettingsProps {
  onOpenArchitecture: () => void;
}

export const SettingsArchitectureView: React.FC<SettingsProps> = ({ onOpenArchitecture }) => {
  return (
    <div className="font-sans p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Settings & Backend AI Configuration
        </h2>
        <p className="text-xs text-slate-300">
          Inspect SIH26108 technical architecture integration parameters, local Ollama LLM endpoint, and BIS API settings.
        </p>
      </div>

      {/* Production Stack Quick Blueprint Button */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-950 p-5 rounded-2xl border border-slate-700 text-white flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>SIH 2026 Judge Inspection Panel</span>
          </div>
          <h3 className="text-sm font-bold text-white">Full System Architecture & Production Stack Blueprint</h3>
          <p className="text-xs text-slate-300">View Spring Boot 3.2, Apache PDFBox, Spring AI + Ollama, Neo4j, and pgvector mapping.</p>
        </div>

        <button
          onClick={onOpenArchitecture}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-colors shrink-0"
        >
          View Architecture Blueprint
        </button>
      </div>

      {/* Settings Options */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-gov">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            AI Engine & Vector Embeddings Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Local LLM Model Endpoint</label>
              <input
                type="text"
                readOnly
                value="http://localhost:11434 (Ollama Llama3 70B On-Premise)"
                className="w-full bg-slate-100 text-slate-700 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Vector Search Similarity Threshold</label>
              <input
                type="text"
                readOnly
                value="pgvector Cosine Distance >= 0.82"
                className="w-full bg-slate-100 text-slate-700 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Government e-Procurement Portal Sync
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">NIC GePNIC API Integration Status</label>
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Connected to NIC Mock Gateway v4.2</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">BIS Gazette CDC Polling Interval</label>
              <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg border border-slate-200 font-mono">
                Debezium Stream Every 15 Minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
