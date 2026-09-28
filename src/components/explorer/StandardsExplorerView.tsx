import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  Network, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { MOCK_INDIAN_STANDARDS } from '../../data/mockData';
import { IndianStandard } from '../../types';

export const StandardsExplorerView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStandard, setSelectedStandard] = useState<IndianStandard | null>(MOCK_INDIAN_STANDARDS[0]);

  // Filter logic
  const filteredStandards = MOCK_INDIAN_STANDARDS.filter((std) => {
    const matchesSearch = 
      std.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || std.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(MOCK_INDIAN_STANDARDS.map(s => s.category)));

  return (
    <div className="font-sans p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
                BIS CATALOG EXPLORER
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-amber-300 text-xs font-bold flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>DEMO DATASET</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Indian Standards (IS) Knowledge Explorer
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Search, filter, and inspect Bureau of Indian Standards (BIS) specifications, testing methods, and knowledge graph dependencies.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-gov flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS code (e.g., IS 694), title, or keywords..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto bg-slate-50 text-slate-800 text-xs rounded-xl px-3 py-2.5 border border-slate-200 focus:outline-none"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Standards Catalog List (Left 2 cols) & Knowledge Graph Visualizer (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalog List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Showing <strong>{filteredStandards.length}</strong> Indian Standards</span>
            <span className="text-[11px] text-slate-400 font-mono">Source: BIS National Catalog</span>
          </div>

          <div className="space-y-3">
            {filteredStandards.map((std) => {
              const isSelected = selectedStandard?.code === std.code;
              return (
                <div
                  key={std.code}
                  onClick={() => setSelectedStandard(std)}
                  className={`bg-white rounded-2xl border p-5 shadow-gov cursor-pointer transition-all ${
                    isSelected ? 'border-teal-500 ring-2 ring-teal-400/30 bg-teal-50/10' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded font-mono font-extrabold text-xs bg-slate-900 text-white">
                        {std.code}
                      </span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                        {std.category}
                      </span>
                    </div>

                    <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded border border-teal-200">
                      {std.currentStatus}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2 leading-snug">
                    {std.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {std.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Related: {std.relatedISCodes.join(', ')}
                    </span>

                    <span className="text-xs font-bold text-teal-600 flex items-center space-x-1">
                      <span>Inspect Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Panel: Knowledge Graph & Clause Inspector */}
        {selectedStandard && (
          <div className="space-y-6">
            {/* Knowledge Graph Card */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <Network className="w-4 h-4 text-amber-400" />
                <span>Spring Data Neo4j Knowledge Graph</span>
              </div>

              {/* Graphical Relationship Map representation */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3 font-mono text-xs">
                <div className="px-3 py-2 bg-teal-500/20 text-teal-300 font-extrabold rounded-lg border border-teal-500/40 inline-block shadow-md">
                  {selectedStandard.code}
                </div>

                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  ↓ Cross-Referenced Standards Network ↓
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {selectedStandard.relatedISCodes.map((code) => (
                    <div key={code} className="p-2 bg-slate-900 text-slate-300 rounded border border-slate-800 text-[11px] hover:border-blue-500 transition-colors">
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">{selectedStandard.code} Overview</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{selectedStandard.description}</p>
              </div>

              {/* Key Clauses */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h5 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Key Clauses & Requirements</h5>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedStandard.keyClauses.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/80 text-[11px]">
                      <span className="font-bold text-teal-300">{item.clause}:</span>{' '}
                      <span className="text-slate-300">{item.summary}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
