import React, { useState } from 'react';
import { Search, Bell, ShieldCheck, User, Building2, Cpu, ExternalLink, ChevronDown, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Department } from '../../types';
import { MOCK_AMENDMENTS } from '../../data/mockData';

interface HeaderProps {
  selectedDepartment?: string;
  onSelectDepartment?: (dept: string) => void;
  currentDepartment?: Department;
  onDepartmentChange?: (dept: Department) => void;
  onOpenArchitecture: () => void;
  onNavigateToAmendments?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDepartment,
  onSelectDepartment,
  currentDepartment: propCurrentDept,
  onDepartmentChange: propOnDeptChange,
  onOpenArchitecture,
  onNavigateToAmendments = () => {},
  searchQuery = '',
  onSearchChange = () => {},
}) => {
  const currentDepartment = propCurrentDept || selectedDepartment || 'Public Works Department (PWD)';
  const onDepartmentChange = propOnDeptChange || onSelectDepartment || (() => {});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const departments: Department[] = [
    'Public Works Department (PWD)',
    'Tamil Nadu Water Supply & Drainage Board (TWAD)',
    'TANGEDCO / TNEB Power Generation',
    'Health & Family Welfare Dept',
    'Highways & Minor Ports Dept',
    'Urban Infrastructure & Housing Board'
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      {/* Top micro-bar for Government Emblem & Hackathon Badge */}
      <div className="bg-slate-950 px-4 py-1 text-xs flex justify-between items-center text-slate-400 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-semibold border border-blue-700/50">
            GOVT OF INDIA / STATE ENTERPRISE PORTAL (PROTOTYPE)
          </span>
          <span className="hidden sm:inline-block text-slate-400">
            Smart India Hackathon 2026 • Problem Statement SIH26108
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenArchitecture}
            className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium text-xs bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI & Spring Boot Architecture</span>
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono">Team: Tender Titanzzz</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left Side: Brand & Department Switcher */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">TenderLens</h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  AI Verifier
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Indian Standards Compliance Engine</p>
            </div>
          </div>

          {/* Department Selector Dropdown */}
          <div className="hidden lg:relative lg:block">
            <button
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 px-3 py-1.5 rounded-md text-xs text-slate-200 border border-slate-700 transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-medium max-w-[210px] truncate">{currentDepartment}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDeptDropdown && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-700/80">
                  Select Government Department
                </div>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      onDepartmentChange(dept);
                      setShowDeptDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700 transition-colors ${
                      currentDepartment === dept ? 'bg-blue-900/40 text-blue-300 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span>{dept}</span>
                    {currentDepartment === dept && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Indian Standards (IS Code), Tender ID, or specifications..."
              className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Right Side: Notifications & User Profile */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700"
              title="BIS Amendment Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                {MOCK_AMENDMENTS.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white">BIS Amendment Alerts</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
                    {MOCK_AMENDMENTS.length} Pending
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-700/60">
                  {MOCK_AMENDMENTS.map((alert) => (
                    <div key={alert.id} className="p-3 hover:bg-slate-750/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-amber-300">{alert.isCode}</span>
                        <span className="text-[10px] text-slate-400">{alert.amendmentDate}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">{alert.standardTitle}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{alert.actionRequired}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-900 border-t border-slate-700 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToAmendments();
                    }}
                    className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center justify-center space-x-1 w-full py-1"
                  >
                    <span>View All Amendment Notifications</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-400/40">
              RS
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white leading-tight">Officer R. Sharma</div>
              <div className="text-[10px] text-slate-400 leading-tight">Senior Procurement Manager</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
