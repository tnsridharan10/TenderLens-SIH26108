import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  FolderKanban, 
  BookOpen, 
  FileCheck2, 
  BellRing, 
  History, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export type NavItem = 
  | 'dashboard' 
  | 'new-analysis' 
  | 'analysis-results'
  | 'compliance-gap'
  | 'my-tenders' 
  | 'standards-explorer' 
  | 'compliance-reports' 
  | 'amendment-alerts' 
  | 'audit-trail' 
  | 'settings' 
  | 'help';

interface SidebarProps {
  activeTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  pendingAmendmentsCount?: number;
  amendmentCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed: externalIsCollapsed,
  onToggleCollapse: externalOnToggleCollapse,
  pendingAmendmentsCount = 2,
  amendmentCount = 2,
}) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = React.useState(false);
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;
  const onToggleCollapse = externalOnToggleCollapse || (() => setInternalIsCollapsed(!internalIsCollapsed));
  const badgeCount = pendingAmendmentsCount || amendmentCount;
  const menuItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-analysis' as NavItem, label: 'New Tender Analysis', icon: FileSearch, badge: 'Core AI' },
    { id: 'my-tenders' as NavItem, label: 'My Tenders', icon: FolderKanban },
    { id: 'standards-explorer' as NavItem, label: 'Standards Explorer', icon: BookOpen },
    { id: 'compliance-reports' as NavItem, label: 'Compliance Reports', icon: FileCheck2 },
    { 
      id: 'amendment-alerts' as NavItem, 
      label: 'Amendment Alerts', 
      icon: BellRing, 
      count: pendingAmendmentsCount 
    },
    { id: 'audit-trail' as NavItem, label: 'Audit Trail', icon: History },
    { id: 'settings' as NavItem, label: 'Settings & Architecture', icon: Settings },
    { id: 'help' as NavItem, label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between select-none z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Sidebar Content */}
      <div className="py-4">
        {/* Toggle Collapse Button */}
        <div className="px-3 mb-4 flex justify-between items-center">
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Procurement Navigation
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-md border-l-4 border-teal-400'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-1.5 py-0.5 rounded border border-teal-500/30">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom SIH Info / Prototype Card */}
      {!isCollapsed && (
        <div className="p-3 m-3 bg-slate-950/80 border border-slate-800 rounded-xl">
          <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SIH 2026 Prototype</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Intelligent BIS Standard Recommendation & Audit Engine.
          </p>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex justify-between items-center border-t border-slate-800 pt-1.5">
            <span>ID: SIH26108</span>
            <span className="text-teal-400">Ver 1.0</span>
          </div>
        </div>
      )}
    </aside>
  );
};
