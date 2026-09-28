import { Tender, IndianStandard, AmendmentAlert, AuditRecord } from '../types';

export const MOCK_INDIAN_STANDARDS: IndianStandard[] = [
  {
    code: 'IS 694:2010',
    title: 'Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables/Cords with Rigid and Flexible Conductor for Rated Voltages Up to and Including 450/750V',
    category: 'Electrical Cables & Wiring',
    publicationYear: 2010,
    currentStatus: 'Active',
    department: 'Bureau of Indian Standards - Electrotechnical Dept (ETD 09)',
    description: 'Specifies requirements for PVC insulated single-core and multicore flexible and rigid copper/aluminium conductor cables intended for general electrical wiring, equipment internal wiring, and low-voltage distribution.',
    relatedISCodes: ['IS 8130:2013', 'IS 5831:1984', 'IS 10810 (Part 0-64)'],
    pdfPreviewSnippet: `BUREAU OF INDIAN STANDARDS
IS 694 : 2010 (Incorporating Amendment No. 1 & 2)

CLAUSE 5.1 - CONDUCTORS:
The conductors shall consist of annealed high conductivity copper or EC grade aluminium conforming to IS 8130. 

CLAUSE 6.2 - INSULATION RESISTANCE & SPARK TEST:
Insulation shall be PVC Compound Type A conforming to IS 5831. Spark testing shall be conducted on 100% of cable length at voltage specified in Table 4.

CLAUSE 7.3 - FLAME RETARDANCY TEST (CATEGORY FR/FRLS):
Cables designated as Flame Retardant Low Smoke (FRLS) shall comply with Oxygen Index > 29% (as per IS 10810 Part 58) and Temperature Index > 250°C.`,
    keyClauses: [
      { clause: 'Clause 5.1', summary: 'Annealed high conductivity Copper or EC Grade Aluminium conductor requirement conforming to IS 8130.' },
      { clause: 'Clause 6.2', summary: 'Mandatory 100% online spark testing and insulation resistance measurement.' },
      { clause: 'Clause 7.3', summary: 'Flame Retardant (FR) & FRLS performance metrics (Oxygen Index >29%, Smoke Density <60%).' },
      { clause: 'Clause 12.1', summary: 'BIS ISI Marking scheme requirements on every meter of cable.' }
    ]
  },
  {
    code: 'IS 1554 (Part 1):1988',
    title: 'PVC Insulated (Heavy Duty) Electric Cables - Working Voltages Up to and Including 1100 V',
    category: 'Power Distribution Cables',
    publicationYear: 1988,
    currentStatus: 'Amended',
    department: 'Electrotechnical Division (ETD 09)',
    description: 'Covers heavy duty armored and unarmored PVC insulated cables for electricity supply, indoor/outdoor underground installations, and industrial substations.',
    relatedISCodes: ['IS 694:2010', 'IS 3975:1999', 'IS 1255:1983'],
    pdfPreviewSnippet: `IS 1554 (Part 1) : 1988 - Heavy Duty Cables Specification

CLAUSE 9.1 - ARMOURING REQUIREMENT:
Armouring shall be applied over the inner sheath. For multicore cables, galvanized steel wire/strip armouring conforming to IS 3975 shall be provided.

CLAUSE 14.2 - HIGH VOLTAGE TEST ON SITE:
Cables shall withstand an AC voltage test of 3.0 kV for 5 minutes between conductors and armour without breakdown.`,
    keyClauses: [
      { clause: 'Clause 9.1', summary: 'Galvanized steel wire/strip armouring specification over inner sheath for mechanical protection.' },
      { clause: 'Clause 14.2', summary: 'Mandatory 3.0 kV AC High Voltage withstand test for 5 minutes.' }
    ]
  },
  {
    code: 'IS 4984:2016',
    title: 'High Density Polyethylene (HDPE) Pipes for Water Supply — Specification (Fifth Revision)',
    category: 'Water Supply & Plumbing',
    publicationYear: 2016,
    currentStatus: 'Active',
    department: 'Civil Engineering Division (CED 50)',
    description: 'Covers requirements for PE 63, PE 80 and PE 100 grade High Density Polyethylene (HDPE) pipes intended for potable water transportation, drainage, and sewage.',
    relatedISCodes: ['IS 5382:2018', 'IS 7634 (Part 2):2012', 'IS 4905:2015'],
    pdfPreviewSnippet: `IS 4984 : 2016 - HDPE Pipes for Potable Water Supply

CLAUSE 6.3 - HYDROSTATIC STRENGTH TEST:
The pipes shall not burst or leak when subjected to internal hydrostatic pressure test at 80°C for 165 hours as per Table 5.

CLAUSE 7.1 - CARBON BLACK CONTENT & DISPERSION:
The carbon black content in raw resin shall be (2.5 ± 0.5)% by mass, uniform dispersion grade <= 3 as per Annexure B.`,
    keyClauses: [
      { clause: 'Clause 6.3', summary: 'Internal Hydrostatic pressure test at 80°C for 165 hours continuous.' },
      { clause: 'Clause 7.1', summary: 'Carbon Black content requirement (2.5 ± 0.5%) for UV stability.' },
      { clause: 'Clause 8.4', summary: 'Melt Flow Rate (MFR) test consistency.' }
    ]
  },
  {
    code: 'IS 1239 (Part 1):2004',
    title: 'Steel Tubes, Tubulars and Other Wrought Steel Fittings - Part 1: Steel Tubes',
    category: 'Piping & Structural Tubes',
    publicationYear: 2004,
    currentStatus: 'Reaffirmed',
    department: 'Metallurgical Engineering (MTD 19)',
    description: 'Covers mild steel tubes for water, gas, steam, and compressed air lines (Heavy, Medium, Light Duty).',
    relatedISCodes: ['IS 4736:1986', 'IS 1367:2002'],
    pdfPreviewSnippet: `IS 1239 (Part 1) : 2004

CLAUSE 8.2 - GALVANIZING REQUIREMENT:
Hot dip galvanizing requirement minimum 360 g/m2 zinc coating weight conforming to IS 4736.`,
    keyClauses: [
      { clause: 'Clause 8.2', summary: 'Hot dip galvanizing requirement minimum 360 g/m2 zinc coating.' },
      { clause: 'Clause 9.1', summary: 'Hydrostatic test pressure 5.0 MPa without leakage.' }
    ]
  },
  {
    code: 'IS 3043:2018',
    title: 'Code of Practice for Earthing (First Revision)',
    category: 'Electrical Safety & Earthing',
    publicationYear: 2018,
    currentStatus: 'Active',
    department: 'Electrotechnical Division (ETD 30)',
    description: 'Provides guidelines for earthing system design, maintenance, pipe/plate electrode sizing, grounding resistance limits, and lightning surge protection for HT/LT substations.',
    relatedISCodes: ['IS 732:2019', 'IS 2309:1989', 'IEEE 80'],
    pdfPreviewSnippet: `IS 3043 : 2018 - Code of Practice for Earthing

CLAUSE 12.4 - PIPE & COPPER/GI PLATE ELECTRODES:
Plate electrode shall be GI plate of 600mm x 600mm x 6mm or Copper plate 600mm x 600mm x 3mm embedded at minimum 3m depth. Maximum allowable earth grid resistance shall not exceed 1.0 Ohm for HT substation transformer neutral.`,
    keyClauses: [
      { clause: 'Clause 12.4', summary: 'GI/Copper plate electrode dimensions and earth grid resistance limit < 1.0 Ohm.' },
      { clause: 'Clause 18.2', summary: 'Dual earth conductor path requirement for heavy motors and transformers.' }
    ]
  },
  {
    code: 'IS 456:2000',
    title: 'Plain and Reinforced Concrete - Code of Practice (Fourth Revision)',
    category: 'Civil Construction & Concrete',
    publicationYear: 2000,
    currentStatus: 'Reaffirmed',
    department: 'Civil Engineering Division (CED 2)',
    description: 'General structural design code for RCC structures, concrete mixing ratios, water-cement ratios, curing durations, minimum reinforcement, and exposure conditions.',
    relatedISCodes: ['IS 1786:2008', 'IS 10262:2019', 'IS 516:1959'],
    pdfPreviewSnippet: `IS 456 : 2000 - Plain & Reinforced Concrete Code

CLAUSE 6.1 - CONCRETE GRADE & CURED STRENGTH:
Minimum grade of concrete for reinforced concrete structures under moderate exposure shall be M25. Compressive cube strength testing as per IS 516.`,
    keyClauses: [
      { clause: 'Clause 6.1', summary: 'Minimum M25 concrete grade requirement for RCC work.' },
      { clause: 'Clause 13.5', summary: 'Curing period minimum 7 days for OPC and 10 days for mineral admixture concrete.' }
    ]
  },
  {
    code: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification (Fourth Revision)',
    category: 'Civil Construction Steel',
    publicationYear: 2008,
    currentStatus: 'Active',
    department: 'Metallurgical Engineering (MTD 16)',
    description: 'Covers thermo-mechanically treated (TMT) steel reinforcement bars of grades Fe 415, Fe 500, Fe 500D, Fe 550, and Fe 600.',
    relatedISCodes: ['IS 456:2000', 'IS 1608:2005'],
    pdfPreviewSnippet: `IS 1786 : 2008 - TMT Rebar Specification

CLAUSE 4.2 - MECHANICAL PROPERTIES OF Fe 500D:
Fe 500D shall have minimum 0.2% Proof Stress 500 N/mm2, Tensile Strength/Yield Ratio >= 1.12, and Total Elongation at Maximum Force >= 5.0%.`,
    keyClauses: [
      { clause: 'Clause 4.2', summary: 'Fe 500D high ductility TMT bar requirements for seismic design.' }
    ]
  },
  {
    code: 'IS 15683:2018',
    title: 'Portable Fire Extinguishers — Performance and Construction — Specification',
    category: 'Fire Safety & Life Safety',
    publicationYear: 2018,
    currentStatus: 'Active',
    department: 'Fire Fighting Section (CED 22)',
    description: 'Covers construction, fire performance ratings, hydrostatic pressure test, and gas cartridge design for water, foam, powder, and CO2 portable fire extinguishers.',
    relatedISCodes: ['IS 2190:2010', 'IS 15477:2004'],
    pdfPreviewSnippet: `IS 15683 : 2018 - Fire Extinguishers Code

CLAUSE 8.1 - PRESSURE TEST:
Cylinder body shall withstand hydraulic test pressure of 3.0 MPa for 2 minutes without leakage or permanent deformation.`,
    keyClauses: [
      { clause: 'Clause 8.1', summary: 'Mandatory 3.0 MPa Hydraulic pressure test on cylinder body.' }
    ]
  }
];

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'TNTDR-2026-PWD-8842',
    title: 'Supply, Laying & Commissioning of 11kV Armoured FRLS Copper Power Cables & Outdoor Substation Switchgear',
    department: 'Public Works Department (PWD)',
    uploadDate: '2026-09-24',
    procurementCategory: 'Works',
    productCategory: 'High Voltage Electrical Cables & Substation Equipments',
    description: 'Procurement of 11kV/33kV Underground Armoured FRLS multi-core power cables, GI cable trays, earthing grid, and 11kV indoor VCB panel for Govt General Hospital Substation expansion.',
    fileName: 'PWD_Substation_Electrical_Specs_2026.pdf',
    fileSize: '4.8 MB',
    fileType: 'PDF Document',
    status: 'Analysis Complete',
    extractedSpecsCount: 14,
    recommendedStandardsCount: 6,
    complianceGapsCount: 2,
    verificationPercentage: 85,
    extractedSpecs: [
      {
        id: 'SPEC-101',
        specification: 'Cable Type & Insulation Voltage',
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
        specification: 'Flame Retardant Property',
        extractedValue: 'Flame Retardant Low Smoke (FRLS) Type A Insulation, Oxygen Index min 29%',
        pageNumber: 6,
        clauseReference: 'Section B - Technical Specs Clause 3.9',
        reviewStatus: 'verified'
      },
      {
        id: 'SPEC-104',
        specification: 'Substation Earthing Grid Resistance',
        extractedValue: 'Substation Earthing Mat with GI Plate Electrodes (600x600x6mm), Target resistance < 1.0 Ohm',
        pageNumber: 9,
        clauseReference: 'Section C - Earthing Specs Clause 5.2',
        reviewStatus: 'flagged'
      },
      {
        id: 'SPEC-105',
        specification: 'Cable Laying Depth & Protection',
        extractedValue: 'Direct trench burial at 1.0m depth with sand cushioning & class A brick cover',
        pageNumber: 12,
        clauseReference: 'Section D - Laying Specs Clause 7.1',
        reviewStatus: 'verified'
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
        evidenceText: 'Tender clause specifies 1100V Grade Multi-Core Copper FRLS insulated cable. IS 694:2010 is the mandatory Indian Standard for LT PVC copper wiring & FRLS index test method.',
        pdfPage: 4,
        clauseNumber: 'Sec B Cl 3.1',
        verifiedByOfficer: true,
        officerNotes: 'Verified against PWD technical guidelines. Vendor must submit ISI license certificate.',
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
        verifiedByOfficer: true,
        officerNotes: 'Officer confirmed electrode sizing matches 2018 revision.',
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
        requirementName: 'Mandatory Factory Acceptance Spark Test (100% cable length)',
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
  },
  {
    id: 'TNTDR-2026-TWAD-4019',
    title: 'Procurement of High Density Polyethylene (HDPE) Pipes (110mm to 315mm PN 10) for Water Supply Project',
    department: 'Tamil Nadu Water Supply & Drainage Board (TWAD)',
    uploadDate: '2026-09-22',
    procurementCategory: 'Goods',
    productCategory: 'HDPE Water Pipes & Fittings',
    description: 'Bulk procurement of PE 100 Grade HDPE pipes for drinking water distribution network in Combined Water Supply Scheme (CWSS).',
    fileName: 'TWAD_HDPE_Pipes_Tender_2026.pdf',
    fileSize: '3.2 MB',
    fileType: 'PDF Document',
    status: 'Pending Verification',
    extractedSpecsCount: 10,
    recommendedStandardsCount: 4,
    complianceGapsCount: 1,
    verificationPercentage: 60,
    extractedSpecs: [
      {
        id: 'SPEC-201',
        specification: 'Pipe Material & Resin Grade',
        extractedValue: '100% Virgin PE 100 Grade Resin, Carbon Black 2.5%, Pressure Rating PN 10 (1.0 MPa)',
        pageNumber: 3,
        clauseReference: 'Clause 4.1 Resin Grade',
        reviewStatus: 'verified'
      },
      {
        id: 'SPEC-202',
        specification: 'Hydrostatic Strength Requirement',
        extractedValue: 'Internal Hydrostatic Test at 80°C for 165 hours continuous without rupture',
        pageNumber: 7,
        clauseReference: 'Clause 8.3 Hydrostatic Test',
        reviewStatus: 'verified'
      }
    ],
    recommendedStandards: [
      {
        id: 'REC-301',
        code: 'IS 4984:2016',
        title: 'High Density Polyethylene (HDPE) Pipes for Water Supply — Specification',
        category: 'Mandatory Standard',
        relevanceScore: 99,
        status: 'Recommended',
        evidenceText: 'Tender requests PE 100 grade HDPE drinking water pipes. IS 4984:2016 Fifth Revision is the primary governing standard.',
        pdfPage: 3,
        clauseNumber: 'Cl 4.1',
        verifiedByOfficer: true,
        officerNotes: 'Matches TWAD standard technical specification.',
        relatedStandardCodes: ['IS 5382:2018', 'IS 7634'],
        officialBisUrl: 'https://standardsbis.bsbedge.com/IS4984'
      }
    ],
    missingRequirements: [
      {
        id: 'GAP-401',
        requirementName: 'Elastomeric Sealing Ring Toxicological Test (Potable Water Safety)',
        category: 'Health & Safety',
        riskLevel: 'Medium Risk',
        detectedStatus: 'Completely Missing',
        relatedISCode: 'IS 5382:2018',
        recommendedAction: 'Include requirement for food-grade rubber gasket compliance to ensure no toxic leaching into drinking water supply.',
        officerStatus: 'Needs Further Review'
      }
    ]
  },
  {
    id: 'TNTDR-2026-TNEB-1102',
    title: 'Turnkey Construction of 33/11 kV Unmanned Substation Building & Structural Steel Gantries',
    department: 'TANGEDCO / TNEB Power Generation',
    uploadDate: '2026-09-18',
    procurementCategory: 'Works',
    productCategory: 'Substation Building & Civil Works',
    description: 'Civil construction of control room building, RCC foundation columns, feeder gantries, and Fe 500D TMT reinforcement steel supply.',
    fileName: 'TNEB_Civil_Substation_Tender.pdf',
    fileSize: '6.1 MB',
    fileType: 'PDF Document',
    status: 'Verified & Approved',
    extractedSpecsCount: 18,
    recommendedStandardsCount: 5,
    complianceGapsCount: 0,
    verificationPercentage: 100,
    extractedSpecs: [],
    recommendedStandards: [
      {
        id: 'REC-401',
        code: 'IS 456:2000',
        title: 'Plain and Reinforced Concrete - Code of Practice',
        category: 'Mandatory Standard',
        relevanceScore: 97,
        status: 'Recommended',
        evidenceText: 'Mandatory civil engineering standard for M25 grade RCC foundation slabs and transformer yard plinths.',
        pdfPage: 14,
        clauseNumber: 'Cl 6.1',
        verifiedByOfficer: true,
        relatedStandardCodes: ['IS 1786:2008'],
        officialBisUrl: 'https://standardsbis.bsbedge.com/IS456'
      },
      {
        id: 'REC-402',
        code: 'IS 1786:2008',
        title: 'High Strength Deformed Steel Bars for Concrete Reinforcement (TMT Fe 500D)',
        category: 'Material Specification',
        relevanceScore: 96,
        status: 'Recommended',
        evidenceText: 'Fe 500D high ductility earthquake resistant rebar specified in structural drawings.',
        pdfPage: 18,
        clauseNumber: 'Cl 4.2',
        verifiedByOfficer: true,
        relatedStandardCodes: ['IS 456:2000'],
        officialBisUrl: 'https://standardsbis.bsbedge.com/IS1786'
      }
    ],
    missingRequirements: []
  }
];

export const MOCK_AMENDMENTS: AmendmentAlert[] = [
  {
    id: 'AMD-2026-01',
    isCode: 'IS 1554 (Part 1):1988',
    standardTitle: 'PVC Insulated (Heavy Duty) Electric Cables for Voltages Up to 1100V',
    amendmentDate: '2026-08-15',
    amendmentNumber: 'Amendment No. 5 (FRLS Index Revision)',
    previousStatus: 'Active Standard (1988)',
    currentStatus: 'Superseded by IS 7098 (Part 1) / IS 694 for new procurements',
    affectedTenders: [
      { id: 'TNTDR-2026-PWD-8842', title: '11kV Armoured FRLS Copper Power Cables' }
    ],
    actionRequired: 'Update tender specification to reference IS 7098 Part 1 for XLPE or IS 694 FRLS Edition 2010 to prevent vendor litigation.',
    priority: 'Critical',
    sourceStatus: 'Official BIS Gazette Notification ETD 09 (Demo Data)'
  },
  {
    id: 'AMD-2026-02',
    isCode: 'IS 3043:2018',
    standardTitle: 'Code of Practice for Earthing Systems',
    amendmentDate: '2026-07-02',
    amendmentNumber: 'Amendment No. 2 (Maintenance Free Chemical Earthing)',
    previousStatus: 'Standard 2018',
    currentStatus: 'Amended with Annexure G for Copper Bonded Micro-Earth Electrodes',
    affectedTenders: [
      { id: 'TNTDR-2026-PWD-8842', title: '11kV Armoured FRLS Copper Power Cables' },
      { id: 'TNTDR-2026-TNEB-1102', title: '33/11 kV Unmanned Substation Building' }
    ],
    actionRequired: 'Permit maintenance-free gel/chemical earth pits as an approved equivalent to traditional salt-charcoal GI pipe electrodes.',
    priority: 'Warning',
    sourceStatus: 'BIS Electrotechnical Section (Demo Data)'
  },
  {
    id: 'AMD-2026-03',
    isCode: 'IS 4984:2016',
    standardTitle: 'High Density Polyethylene (HDPE) Pipes for Water Supply',
    amendmentDate: '2026-05-10',
    amendmentNumber: 'Amendment No. 3 (PE 100+ High Stress Rating)',
    previousStatus: 'Active (2016)',
    currentStatus: 'Reaffirmed with new test procedure for Slow Crack Growth (SCG)',
    affectedTenders: [
      { id: 'TNTDR-2026-TWAD-4019', title: 'Procurement of HDPE Pipes for Water Supply' }
    ],
    actionRequired: 'Ensure third-party lab testing includes 500 hour SCG hydrostatic notch test certificate.',
    priority: 'Info',
    sourceStatus: 'BIS CED 50 Circular (Demo Data)'
  }
];

export const MOCK_AUDIT_TRAIL: AuditRecord[] = [
  {
    id: 'AUD-8091',
    timestamp: '2026-09-24 10:14:22 AM',
    tenderId: 'TNTDR-2026-PWD-8842',
    tenderTitle: 'Supply & Laying of 11kV Armoured FRLS Cables',
    action: 'AI Specification Extraction Completed',
    user: 'TenderLens Automated Engine v2.4',
    role: 'AI Engine',
    verificationStatus: 'System Processed',
    details: 'Parsed 28-page PDF document. Extracted 14 technical specifications and identified 6 relevant Indian Standards.'
  },
  {
    id: 'AUD-8092',
    timestamp: '2026-09-24 10:28:15 AM',
    tenderId: 'TNTDR-2026-PWD-8842',
    tenderTitle: 'Supply & Laying of 11kV Armoured FRLS Cables',
    action: 'Verified Recommendation: IS 694:2010',
    user: 'Officer R. Sharma',
    role: 'Senior Procurement Officer (PWD)',
    verificationStatus: 'Officer Verified',
    details: 'Verified IS 694 compliance for FRLS 1100V copper cable. Added note: Require ISI mark on every meter.'
  },
  {
    id: 'AUD-8093',
    timestamp: '2026-09-24 10:35:40 AM',
    tenderId: 'TNTDR-2026-PWD-8842',
    tenderTitle: 'Supply & Laying of 11kV Armoured FRLS Cables',
    action: 'Flagged Compliance Gap GAP-301',
    user: 'Officer R. Sharma',
    role: 'Senior Procurement Officer (PWD)',
    verificationStatus: 'Flagged For Correction',
    details: 'Flagged missing 100% factory spark testing requirement as per IS 694 Clause 6.2.'
  },
  {
    id: 'AUD-8094',
    timestamp: '2026-09-22 03:45:10 PM',
    tenderId: 'TNTDR-2026-TWAD-4019',
    tenderTitle: 'Procurement of HDPE Pipes for Water Supply',
    action: 'Tender Uploaded & Queued',
    user: 'Officer K. Selvam',
    role: 'Executive Engineer (TWAD)',
    verificationStatus: 'Uploaded',
    details: 'Uploaded TWAD_HDPE_Pipes_Tender_2026.pdf (3.2 MB).'
  }
];

export const DEMO_PRESET_FILES = [
  {
    name: 'PWD_Electrical_Substation_11kV_Tender.pdf',
    size: '4.8 MB',
    type: 'PDF Document',
    title: 'Procurement of 11kV FRLS Power Cables & Substation Switchgear',
    id: 'TNTDR-2026-PWD-8842',
    department: 'Public Works Department (PWD)' as const,
    procurementCategory: 'Works' as const,
    productCategory: 'High Voltage Electrical Cables & Substation Equipments',
    description: 'Comprehensive specification for 11kV LT/HT copper FRLS armoured cables, earthing grid, and substation switchgear installation at Govt Hospital site.'
  },
  {
    name: 'TWAD_Water_Supply_HDPE_Pipeline_Spec.pdf',
    size: '3.2 MB',
    type: 'PDF Document',
    title: 'Procurement of High Density Polyethylene (HDPE) Pipes (110mm-315mm)',
    id: 'TNTDR-2026-TWAD-4019',
    department: 'Tamil Nadu Water Supply & Drainage Board (TWAD)' as const,
    procurementCategory: 'Goods' as const,
    productCategory: 'HDPE Water Pipes & Fittings',
    description: 'Bulk procurement of PE 100 Grade HDPE pipes for drinking water distribution network in Combined Water Supply Scheme.'
  },
  {
    name: 'TANGEDCO_Civil_Substation_Tender.pdf',
    size: '6.1 MB',
    type: 'PDF Document',
    title: 'Turnkey Construction of 33/11 kV Unmanned Substation Building',
    id: 'TNTDR-2026-TNEB-1102',
    department: 'TANGEDCO / TNEB Power Generation' as const,
    procurementCategory: 'Works' as const,
    productCategory: 'Substation Building & Civil Works',
    description: 'Civil construction of control room building, RCC foundation columns, feeder gantries, and Fe 500D TMT reinforcement steel supply.'
  }
];

export const MOCK_TENDERS = INITIAL_TENDERS;
export const MOCK_AMENDMENT_ALERTS = MOCK_AMENDMENTS;
