import React from 'react';
import { 
  FileSearch, 
  BookOpen, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Building2, 
  Upload, 
  Search, 
  FileText,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Tender, Department, AmendmentAlert } from '../../types';
import { NavItem } from '../layout/Sidebar';

interface DashboardViewProps {
  tenders: Tender[];
  amendments: AmendmentAlert[];
  currentDepartment?: Department;
  onNavigate: (tab: NavItem) => void;
  onSelectTender: (tender: Tender) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tenders,
  amendments,
  currentDepartment = 'Public Works Department (PWD)',
  onNavigate,
  onSelectTender,
}) => {
  // Calculated dashboard stats
  const totalAnalyzed = 142 + tenders.length;
  const totalStandardsRecommended = 488 + tenders.reduce((acc, t) => acc + t.recommendedStandardsCount, 0);
  const totalComplianceIssues = 19 + tenders.reduce((acc, t) => acc + t.complianceGapsCount, 0);
  const pendingVerifications = tenders.filter(t => t.status === 'Pending Verification' || t.status === 'Analysis Complete').length + 5;

  return (
    <div className="space-[#10 font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Background Subtle Geometric Glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>ACTIVE SESSION • PROCURING OFFICER</span>
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-300 text-xs flex items-center space-x-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentDepartment}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Good Morning, Officer
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Your intelligent procurement standards assistant. Automatically extract technical specs, verify Indian Standards (IS), and eliminate compliance gaps before tender publishing.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onNavigate('new-analysis')}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Analyze New Tender</span>
            </button>
            <button
              onClick={() => onNavigate('standards-explorer')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Explore IS Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tenders */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-gov hover:shadow-gov-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tenders Analyzed</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalAnalyzed}</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FileSearch className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+12.4% this month</span>
            <span className="text-slate-400 ml-auto">Demodata</span>
          </div>
        </div>

        {/* Card 2: Standards Recommended */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-gov hover:shadow-gov-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Standards Recommended</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalStandardsRecommended}</h3>
            </div>
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-teal-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>98.2% Accuracy Rate</span>
            <span className="text-slate-400 ml-auto">BIS Catalog</span>
          </div>
        </div>

        {/* Card 3: Compliance Issues */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-gov hover:shadow-gov-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Issues Detected</p>
              <h3 className="text-2xl font-extrabold text-govred-600 mt-1">{totalComplianceIssues}</h3>
            </div>
            <div className="p-2.5 bg-red-50 text-govred-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-govred-600 font-medium">
            <Activity className="w-3.5 h-3.5 mr-1" />
            <span>2 Critical Safety Gaps</span>
            <span className="text-slate-400 ml-auto">Flagged</span>
          </div>
        </div>

        {/* Card 4: Pending Verifications */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-gov hover:shadow-gov-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Verifications</p>
              <h3 className="text-2xl font-extrabold text-govamber-600 mt-1">{pendingVerifications}</h3>
            </div>
            <div className="p-2.5 bg-amber-50 text-govamber-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-govamber-600 font-medium">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>Requires Officer Sign-off</span>
            <span className="text-slate-400 ml-auto">Action</span>
          </div>
        </div>
      </div>

      {/* Visual Procurement Workflow Tracker */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Procurement Compliance AI Workflow
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
            5-Step Officer Verification Journey
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {[
            { step: '1', title: 'Upload Tender', desc: 'Drag-and-drop PDF/DOCX tender specs', color: 'border-blue-500 text-blue-600 bg-blue-50' },
            { step: '2', title: 'Extract Specs', desc: 'NLP identifies parameters & clauses', color: 'border-blue-500 text-blue-600 bg-blue-50' },
            { step: '3', title: 'Match IS Codes', desc: 'Spring AI matches Indian Standards', color: 'border-teal-500 text-teal-600 bg-teal-50' },
            { step: '4', title: 'Officer Verify', desc: 'Review evidence & fill safety gaps', color: 'border-amber-500 text-amber-600 bg-amber-50' },
            { step: '5', title: 'Compliance Report', desc: 'Generate signed audit PDF/CSV', color: 'border-emerald-500 text-emerald-600 bg-emerald-50' },
          ].map((item, idx) => (
            <div key={item.step} className={`p-3 rounded-xl border ${item.color} flex flex-col justify-between relative`}>
              <div className="flex items-center justify-between mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                  {item.step}
                </span>
                {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden md:block" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Split: Recent Tender Activity & Quick Actions / Amendment Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Tender Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Tender Analysis Activity</h3>
              <p className="text-[11px] text-slate-500">Live procurement files currently being processed or verified</p>
            </div>
            <button
              onClick={() => onNavigate('my-tenders')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>View All Tenders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Tender ID & Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenders.map((tender) => (
                  <tr key={tender.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs font-mono">{tender.id}</div>
                      <div className="text-slate-600 font-medium line-clamp-1 max-w-xs">{tender.title}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{tender.department}</td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{tender.uploadDate}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        tender.status === 'Analysis Complete'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : tender.status === 'Verified & Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectTender(tender)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] rounded-lg transition-colors inline-flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 Col): Amendment Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('new-analysis')}
                className="w-full p-3 bg-slate-900 text-white rounded-xl text-left hover:bg-slate-800 transition-colors flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Analyze New Tender</div>
                    <div className="text-[10px] text-slate-400">Upload PDF/DOCX specifications</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('standards-explorer')}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-left border border-slate-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Explore Indian Standards</div>
                    <div className="text-[10px] text-slate-500">Search BIS database & clauses</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('compliance-reports')}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-left border border-slate-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">View Compliance Reports</div>
                    <div className="text-[10px] text-slate-500">Generate signed PDF & CSV</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Recent Amendment Alerts List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recent BIS Amendment Alerts
                </h3>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                DEMO GAZETTE
              </span>
            </div>

            <div className="space-y-3">
              {amendments.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">{item.isCode}</span>
                    <span className="text-[10px] text-slate-500">{item.amendmentDate}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 mt-1 line-clamp-1">{item.standardTitle}</p>
                  <p className="text-[11px] text-amber-800 mt-1 bg-amber-100/60 p-1.5 rounded leading-tight">
                    {item.amendmentNumber}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('amendment-alerts')}
              className="mt-3 w-full text-center py-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Amendment Alerts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
