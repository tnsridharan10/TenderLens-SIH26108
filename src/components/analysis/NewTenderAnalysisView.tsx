import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  AlertCircle, 
  ArrowRight,
  Zap,
  Layers,
  FileCheck2
} from 'lucide-react';
import { Department, Tender } from '../../types';
import { DEMO_PRESET_FILES } from '../../data/mockData';
import { ProcessingModal } from './ProcessingModal';

interface NewTenderAnalysisViewProps {
  currentDepartment?: Department;
  onAnalysisStart: (tender: Tender) => void;
  onStartProcessing?: () => void;
}

export const NewTenderAnalysisView: React.FC<NewTenderAnalysisViewProps> = ({
  currentDepartment = 'Public Works Department (PWD)',
  onAnalysisStart,
  onStartProcessing,
}) => {
  // Form & File States
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(0); // Default to 1st preset
  const [file, setFile] = useState<{ name: string; size: string; type: string } | null>({
    name: DEMO_PRESET_FILES[0].name,
    size: DEMO_PRESET_FILES[0].size,
    type: DEMO_PRESET_FILES[0].type
  });
  const [uploadProgress, setUploadProgress] = useState<number>(100);
  const [isDragOver, setIsDragOver] = useState(false);

  // Form Fields
  const [tenderTitle, setTenderTitle] = useState(DEMO_PRESET_FILES[0].title);
  const [tenderId, setTenderId] = useState(DEMO_PRESET_FILES[0].id);
  const [department, setDepartment] = useState<Department>(DEMO_PRESET_FILES[0].department);
  const [procurementCategory, setProcurementCategory] = useState<'Works' | 'Goods' | 'Services' | 'Consultancy'>(DEMO_PRESET_FILES[0].procurementCategory);
  const [productCategory, setProductCategory] = useState(DEMO_PRESET_FILES[0].productCategory);
  const [description, setDescription] = useState(DEMO_PRESET_FILES[0].description);

  // Modal State
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle Preset Load
  const handleLoadPreset = (index: number) => {
    const preset = DEMO_PRESET_FILES[index];
    setSelectedPresetIndex(index);
    setFile({ name: preset.name, size: preset.size, type: preset.type });
    setTenderTitle(preset.title);
    setTenderId(preset.id);
    setDepartment(preset.department);
    setProcurementCategory(preset.procurementCategory);
    setProductCategory(preset.productCategory);
    setDescription(preset.description);
    setUploadProgress(100);
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile({
        name: droppedFile.name,
        size: `${(droppedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        type: droppedFile.type || 'PDF Document'
      });
      setSelectedPresetIndex(null);
      setUploadProgress(100);
      if (!tenderTitle) {
        setTenderTitle(droppedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "));
      }
    }
  };

  // Handle File Input Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile({
        name: selected.name,
        size: `${(selected.size / (1024 * 1024)).toFixed(1)} MB`,
        type: selected.type || 'PDF Document'
      });
      setSelectedPresetIndex(null);
      setUploadProgress(100);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSelectedPresetIndex(null);
    setUploadProgress(0);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    // Construct new Tender object or select existing sample tender
    const newTender: Tender = {
      id: tenderId || `TNTDR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: tenderTitle,
      department: department,
      uploadDate: new Date().toISOString().split('T')[0],
      procurementCategory: procurementCategory,
      productCategory: productCategory,
      description: description,
      fileName: file ? file.name : 'Tender_Document.pdf',
      fileSize: file ? file.size : '4.5 MB',
      fileType: file ? file.type : 'PDF Document',
      status: 'Analysis Complete',
      extractedSpecsCount: 14,
      recommendedStandardsCount: 6,
      complianceGapsCount: 2,
      verificationPercentage: 70,
      extractedSpecs: [
        {
          id: 'SPEC-101',
          specification: 'Cable Voltage Rating & Insulation Grade',
          extractedValue: '1100V Grade Multi-Core Copper Conductor, Heavy Duty PVC Insulated, FRLS Outer Sheath',
          pageNumber: 4,
          clauseReference: 'Section B - Technical Specs Clause 3.1',
          reviewStatus: 'verified'
        },
        {
          id: 'SPEC-102',
          specification: 'Armouring Specification',
          extractedValue: 'Galvanized Steel Strip Armouring over Inner PVC Sheath for underground direct burial',
          pageNumber: 5,
          clauseReference: 'Section B - Technical Specs Clause 3.4',
          reviewStatus: 'verified'
        },
        {
          id: 'SPEC-103',
          specification: 'Flame Retardant Low Smoke Property',
          extractedValue: 'Flame Retardant Low Smoke (FRLS) Type A Insulation, Oxygen Index min 29%',
          pageNumber: 6,
          clauseReference: 'Section B - Technical Specs Clause 3.9',
          reviewStatus: 'verified'
        },
        {
          id: 'SPEC-104',
          specification: 'Earthing Electrode Resistance',
          extractedValue: 'GI Plate Electrodes (600x600x6mm), Target resistance < 1.0 Ohm',
          pageNumber: 9,
          clauseReference: 'Section C - Earthing Specs Clause 5.2',
          reviewStatus: 'flagged'
        }
      ],
      recommendedStandards: [
        {
          id: 'REC-201',
          code: 'IS 694:2010',
          title: 'PVC Insulated Cables for Working Voltages Up to 1100V (FR/FRLS)',
          category: 'Mandatory Standard',
          relevanceScore: 98,
          status: 'Recommended',
          evidenceText: 'Tender specifies 1100V Grade Multi-Core Copper FRLS insulated cable. IS 694:2010 is the mandatory Indian Standard for LT PVC copper wiring & FRLS index test method.',
          pdfPage: 4,
          clauseNumber: 'Sec B Cl 3.1',
          verifiedByOfficer: false,
          relatedStandardCodes: ['IS 8130:2013', 'IS 5831:1984'],
          officialBisUrl: 'https://standardsbis.bsbedge.com/IS694'
        },
        {
          id: 'REC-202',
          code: 'IS 1554 (Part 1):1988',
          title: 'PVC Insulated Heavy Duty Electric Cables for Voltages Up to 1100V',
          category: 'Mandatory Standard',
          relevanceScore: 94,
          status: 'Amendment Check Pending',
          evidenceText: 'Matches tender requirement for heavy-duty underground galvanized steel strip armoured multicore power cables.',
          pdfPage: 5,
          clauseNumber: 'Sec B Cl 3.4',
          verifiedByOfficer: false,
          relatedStandardCodes: ['IS 3975:1999', 'IS 1255:1983'],
          officialBisUrl: 'https://standardsbis.bsbedge.com/IS1554'
        },
        {
          id: 'REC-203',
          code: 'IS 3043:2018',
          title: 'Code of Practice for Earthing Systems',
          category: 'Safety Code',
          relevanceScore: 92,
          status: 'Recommended',
          evidenceText: 'Direct match with tender section C earthing grid plate electrode requirements and 1.0 Ohm ground resistance threshold.',
          pdfPage: 9,
          clauseNumber: 'Sec C Cl 5.2',
          verifiedByOfficer: false,
          relatedStandardCodes: ['IS 732:2019'],
          officialBisUrl: 'https://standardsbis.bsbedge.com/IS3043'
        },
        {
          id: 'REC-204',
          code: 'IS 1255:1983',
          title: 'Code of Practice for Installation and Maintenance of Power Cables Up to 33 kV',
          category: 'Installation Code',
          relevanceScore: 89,
          status: 'Requires Verification',
          evidenceText: 'Specifies trenching depth, brick protection, sand bedding, and cable bending radius mandatory for PWD laying works.',
          pdfPage: 12,
          clauseNumber: 'Sec D Cl 7.1',
          verifiedByOfficer: false,
          relatedStandardCodes: ['IS 1554 (Part 1):1988'],
          officialBisUrl: 'https://standardsbis.bsbedge.com/IS1255'
        }
      ],
      missingRequirements: [
        {
          id: 'GAP-301',
          requirementName: 'Mandatory Factory Acceptance Spark Test (100% length)',
          category: 'Quality Testing & Inspection',
          riskLevel: 'Critical Risk',
          detectedStatus: 'Completely Missing',
          relatedISCode: 'IS 694:2010 Clause 6.2',
          recommendedAction: 'Add mandatory clause requiring manufacturer 100% online High Voltage Spark Test certificate prior to dispatch.',
          officerStatus: 'Needs Further Review'
        },
        {
          id: 'GAP-302',
          requirementName: 'Routine High Voltage Withstand Test (3.0 kV AC for 5 mins)',
          category: 'Electrical Safety',
          riskLevel: 'Medium Risk',
          detectedStatus: 'Partial Clause Met',
          relatedISCode: 'IS 1554 (Part 1) Clause 14.2',
          recommendedAction: 'Specify on-site high voltage withstand testing after underground laying and before final jointing.',
          officerStatus: 'Verified'
        }
      ]
    };

    onAnalysisStart(newTender);
  };

  return (
    <div className="font-sans p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>SIH26108 AI Engine • Guided Document Ingestion</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyze a New Tender
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload your procurement document to automatically extract technical specifications, match applicable Indian Standards (IS), and detect compliance risks.
        </p>
      </div>

      {/* Preset Sample Tender Loader Cards */}
      <div className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Load Sample Government Tenders (Interactive Demo Presets)
            </h3>
          </div>
          <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/30">
            Click to Auto-fill
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_PRESET_FILES.map((preset, idx) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleLoadPreset(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                selectedPresetIndex === idx
                  ? 'bg-blue-900/60 border-teal-400 shadow-md ring-1 ring-teal-400/40 text-white'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-amber-300">{preset.id}</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">{preset.procurementCategory}</span>
              </div>
              <div className="text-xs font-bold line-clamp-1 text-slate-100">{preset.title}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{preset.department}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-gov p-6 space-y-6">
        {/* Section 1: File Upload Drag and Drop Zone */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Tender Specification Document Upload <span className="text-govred-600">*</span>
          </label>

          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
                  : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-blue-400'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Drag and drop your tender document here
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Supports searchable PDF, DOCX, or scanned PDF specifications
                </p>

                <div className="mt-4 inline-flex items-center px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow hover:bg-slate-800 transition-colors">
                  Browse Files
                </div>

                <div className="mt-4 flex items-center space-x-4 text-[11px] text-slate-400">
                  <span>Supported: PDF, DOCX</span>
                  <span>•</span>
                  <span>Max File Size: 50 MB</span>
                </div>
              </label>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{file.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.type}</span>
                      <span>•</span>
                      <span className="text-teal-600 font-semibold flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-0.5" /> Ready for Analysis
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-govred-600 hover:bg-red-50 transition-colors"
                  title="Remove document"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>In-Memory Document Ingestion</span>
                  <span>100% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Form Metadata Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tender Title <span className="text-govred-600">*</span>
            </label>
            <input
              type="text"
              required
              value={tenderTitle}
              onChange={(e) => setTenderTitle(e.target.value)}
              placeholder="e.g. Supply & Commissioning of 11kV Power Cables"
              className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tender Reference ID <span className="text-govred-600">*</span>
            </label>
            <input
              type="text"
              required
              value={tenderId}
              onChange={(e) => setTenderId(e.target.value)}
              placeholder="e.g. TNTDR-2026-PWD-8842"
              className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Department / Organization <span className="text-govred-600">*</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              className="w-full bg-white text-slate-900 text-xs rounded-xl px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="Public Works Department (PWD)">Public Works Department (PWD)</option>
              <option value="Tamil Nadu Water Supply & Drainage Board (TWAD)">Tamil Nadu Water Supply & Drainage Board (TWAD)</option>
              <option value="TANGEDCO / TNEB Power Generation">TANGEDCO / TNEB Power Generation</option>
              <option value="Health & Family Welfare Dept">Health & Family Welfare Dept</option>
              <option value="Highways & Minor Ports Dept">Highways & Minor Ports Dept</option>
              <option value="Urban Infrastructure & Housing Board">Urban Infrastructure & Housing Board</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Procurement Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Works', 'Goods', 'Services', 'Consultancy'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setProcurementCategory(cat)}
                  className={`py-2 px-2 text-[11px] font-semibold rounded-xl border text-center transition-all ${
                    procurementCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Category / Major Equipment Group <span className="text-govred-600">*</span>
            </label>
            <input
              type="text"
              required
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="e.g. High Voltage Electrical Cables, HDPE Pipes, Fire Safety Equipment"
              className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tender Overview & Scope Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of procurement technical scope..."
              className="w-full bg-white text-slate-900 text-xs rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Submit & Action Buttons */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>AI analysis extracts specifications & cross-references 1,538+ BIS Indian Standards.</span>
          </div>

          <button
            type="submit"
            disabled={!file}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg ${
              file
                ? 'bg-gradient-to-r from-blue-600 via-teal-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-teal-500/20 transform hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Analyze Tender Document</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* 7-Step Animated Processing Modal */}
      <ProcessingModal
        isOpen={isProcessing}
        tenderTitle={tenderTitle}
        tenderId={tenderId}
        fileName={file ? file.name : 'Tender_Document.pdf'}
        onComplete={handleProcessingComplete}
      />
    </div>
  );
};
