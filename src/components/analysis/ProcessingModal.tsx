import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Search, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  BookOpen,
  Layers,
  FileCheck2,
  RefreshCw
} from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  tenderTitle?: string;
  tenderId?: string;
  fileName?: string;
  onComplete: (newTender?: any) => void;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isOpen,
  tenderTitle = 'PWD Underground Cable Procurement Tender',
  tenderId = 'TNTND/PWD/2026/0882',
  fileName = 'PWD_Cable_Specification_2026.pdf',
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { title: 'Reading tender document structure', detail: 'Parsing document OCR & tabular clauses with Apache PDFBox...', icon: FileText },
    { title: 'Extracting technical specifications', detail: 'Spring AI NLP extracting voltage ratings, pressure limits, material grades...', icon: Search },
    { title: 'Identifying product requirements', detail: 'Categorizing mandatory quality, installation, and safety parameters...', icon: Layers },
    { title: 'Matching applicable Indian Standards', detail: 'Dense pgvector & Spring Data Neo4j matching against 1,538+ BIS codes...', icon: BookOpen },
    { title: 'Checking related safety & testing standards', detail: 'Verifying IS 694, IS 1554, IS 4984, IS 3043 testing methodologies...', icon: ShieldCheck },
    { title: 'Checking BIS amendment status', detail: 'Kafka Debezium CDC checking live gazette revision & obsolescence logs...', icon: RefreshCw },
    { title: 'Preparing compliance recommendations', detail: 'Generating evidence provenance and gap analysis dashboard...', icon: FileCheck2 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        const next = prev + 1.5;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIdx);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative overflow-hidden">
        {/* Subtle glowing accent background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center space-x-2 bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-700/60">
            <Cpu className="w-3.5 h-3.5 text-teal-400 animate-spin" />
            <span>AI PROCESSING ENGINE ACTIVE (DEMO SIMULATION)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Analyzing Tender Document
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto font-mono">
            {tenderId} • {fileName}
          </p>
        </div>

        {/* Big Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-teal-400 font-mono flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</span>
            </span>
            <span className="text-white font-mono font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-lg shadow-teal-500/30"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sequential Step List */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all flex items-center space-x-3 text-xs ${
                  isDone
                    ? 'bg-slate-950/60 border-teal-500/30 text-slate-300'
                    : isCurrent
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-md ring-1 ring-blue-500/30'
                    : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  ) : isCurrent ? (
                    <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600 font-mono">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${isCurrent ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                    {step.title}
                  </div>
                  {(isCurrent || isDone) && (
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{step.detail}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast-Forward / Skip Demo Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Simulation using pre-computed vector embeddings</span>
          <button
            onClick={() => onComplete()}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-colors flex items-center space-x-1"
          >
            <span>Fast Forward Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
