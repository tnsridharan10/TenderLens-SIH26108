export type Department = 
  | 'Public Works Department (PWD)' 
  | 'Tamil Nadu Water Supply & Drainage Board (TWAD)' 
  | 'TANGEDCO / TNEB Power Generation' 
  | 'Health & Family Welfare Dept' 
  | 'Highways & Minor Ports Dept' 
  | 'Urban Infrastructure & Housing Board';

export type AnalysisStatus = 
  | 'Draft' 
  | 'Processing' 
  | 'Analysis Complete' 
  | 'Pending Verification' 
  | 'Verified & Approved' 
  | 'Compliance Gaps Found';

export interface ExtractedSpec {
  id: string;
  specification: string;
  extractedValue: string;
  unit?: string;
  pageNumber: number;
  clauseReference: string;
  reviewStatus: 'verified' | 'flagged' | 'pending';
}

export interface RecommendedStandard {
  id: string;
  code: string; // e.g. "IS 694:2010"
  title: string;
  category: 'Mandatory Standard' | 'Testing Standard' | 'Safety Code' | 'Installation Code' | 'Material Specification';
  relevanceScore: number; // e.g. 96
  status: 'Recommended' | 'Requires Verification' | 'Amendment Check Pending' | 'Potentially Outdated';
  evidenceText: string;
  pdfPage: number;
  clauseNumber: string;
  verifiedByOfficer: boolean;
  officerNotes?: string;
  relatedStandardCodes: string[];
  officialBisUrl?: string;
}

export interface MissingRequirement {
  id: string;
  requirementName: string;
  category: string;
  riskLevel: 'Critical Risk' | 'Medium Risk' | 'Low Risk';
  detectedStatus: 'Completely Missing' | 'Partial Clause Met' | 'Outdated Testing Method';
  relatedISCode: string;
  recommendedAction: string;
  officerStatus: 'Verified' | 'Not Applicable' | 'Needs Further Review';
}

export interface IndianStandard {
  code: string;
  title: string;
  category: string;
  publicationYear: number;
  currentStatus: 'Active' | 'Amended' | 'Reaffirmed' | 'Under Revision';
  department: string;
  description: string;
  relatedISCodes: string[];
  pdfPreviewSnippet: string;
  keyClauses: { clause: string; summary: string }[];
}

export interface AmendmentAlert {
  id: string;
  isCode: string;
  standardTitle: string;
  amendmentDate: string;
  amendmentNumber: string;
  previousStatus: string;
  currentStatus: string;
  affectedTenders: { id: string; title: string }[];
  actionRequired: string;
  priority: 'Critical' | 'Warning' | 'Info';
  sourceStatus: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  tenderId: string;
  tenderTitle: string;
  action: string;
  user: string;
  role: string;
  verificationStatus: string;
  details: string;
}

export interface Tender {
  id: string;
  title: string;
  department: Department;
  uploadDate: string;
  procurementCategory: 'Works' | 'Goods' | 'Services' | 'Consultancy';
  productCategory: string;
  description?: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  status: AnalysisStatus;
  extractedSpecsCount: number;
  recommendedStandardsCount: number;
  complianceGapsCount: number;
  verificationPercentage: number;
  extractedSpecs: ExtractedSpec[];
  recommendedStandards: RecommendedStandard[];
  missingRequirements: MissingRequirement[];
  isSamplePreset?: boolean;
}
