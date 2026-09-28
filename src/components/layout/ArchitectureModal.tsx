import React from 'react';
import { X, Cpu, Server, Database, ShieldAlert, Sparkles, Network, ArrowRight, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">System Architecture & Production Stack</h3>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-500/30">
                  SIH26108 Specifications
                </span>
              </div>
              <p className="text-xs text-slate-400">Enterprise Backend Integration Blueprint for Government e-Procurement Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Visual Architecture Pipeline */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>End-to-End Enterprise Data Flow</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                <FileText className="w-5 h-5 text-blue-400 mb-1" />
                <span className="font-semibold text-slate-200">1. Doc Parsing</span>
                <span className="text-[10px] text-slate-400 mt-1">Apache PDFBox & Tess4J OCR</span>
              </div>
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                <span className="font-semibold text-slate-200">2. Spring AI + Ollama</span>
                <span className="text-[10px] text-slate-400 mt-1">Local Llama3 / DeepSeek Model</span>
              </div>
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                <Network className="w-5 h-5 text-teal-400 mb-1" />
                <span className="font-semibold text-slate-200">3. Hybrid Search</span>
                <span className="text-[10px] text-slate-400 mt-1">Neo4j Graph + pgvector Embeddings</span>
              </div>
            </div>
          </div>

          {/* Technical Modules Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center space-x-2 text-blue-400 font-semibold mb-2">
                <Server className="w-4 h-4" />
                <span>Backend Framework & API</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Java 21 & Spring Boot 3.2</strong> providing high-throughput reactive endpoints. 
                Secured via <strong className="text-white">Spring Security</strong> with OAuth2/OIDC role-based access for procurement officers.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>On-Premise AI Engine</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Spring AI + Ollama</strong> running localized models (Llama 3 70B / DeepSeek-R1) inside NIC government data centers, ensuring zero confidential tender leakage to external LLM APIs.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center space-x-2 text-teal-400 font-semibold mb-2">
                <Database className="w-4 h-4" />
                <span>Knowledge Graph & Vector DB</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Spring Data Neo4j</strong> models Indian Standard dependencies (testing, material, safety codes). <strong className="text-white">PostgreSQL + pgvector</strong> stores 1538+ BIS clause embeddings for dense semantic matching.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center space-x-2 text-purple-400 font-semibold mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Real-Time BIS Amendment Sync</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Debezium CDC + Apache Kafka</strong> streams official BIS gazette amendments to instantly alert procurement officers when a referenced standard becomes obsolete or requires testing updates.
              </p>
            </div>
          </div>

          {/* Prototype Disclaimer Banner */}
          <div className="bg-teal-950/60 border border-teal-800/80 p-3.5 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-teal-300">Hackathon Prototype Mode Notice</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                This web prototype contains fully interactive simulated workflows using high-fidelity mock datasets. 
                All recommendations are clearly demarcated as DEMO DATA requiring final verification by the Procurement Officer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
