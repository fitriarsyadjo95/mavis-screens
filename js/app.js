// MAVIS 2.0 — shared client behavior
// Loaded by every HTML page via <script defer src="js/app.js"></script>

(() => {
  'use strict';

  // ============================================================
  // MOCK DATA (used by command palette free-text search)
  // ============================================================
  const MOCK_REPORTS = [
    { id: 'RF9030', equipment: '7V-95543', desc: 'Secured Air Supply Vessel — External SSI', plant: 'MLNG TIGA', status: 'Pending' },
    { id: 'RF9029', equipment: '7V-95543', desc: 'Secured Air Supply Vessel — External SSI', plant: 'MLNG TIGA', status: 'Approved' },
    { id: 'RF9028', equipment: 'E-4642-ACI1', desc: 'Heat Exchanger — Annual Inspection', plant: 'MLNG', status: 'Approved' },
    { id: 'RF9027', equipment: 'E-4652-ACI1', desc: 'Heat Exchanger — Corrosion Follow-Up', plant: 'MLNG', status: 'Draft' },
    { id: 'RF9026', equipment: 'E-4642-ACI1', desc: 'Heat Exchanger — Major Inspection', plant: 'MLNG', status: 'Approved' },
    { id: 'RF9025', equipment: 'E-4652-ACI1', desc: 'Heat Exchanger — Coating Assessment', plant: 'MLNG', status: 'Approved' },
    { id: 'RF9024', equipment: 'E-1051B-AR1', desc: 'Unfired Pressure Vessel — Internal Inspection', plant: 'MLNG TIGA', status: 'Approved' },
  ];

  const MOCK_EQUIPMENT = [
    { id: '7V-95543', desc: 'Secured Air Supply Vessel', type: 'Unfired Pressure Vessel', plant: 'MLNG TIGA' },
    { id: 'E-4642-ACI1', desc: 'Heat Exchanger — Lube Oil Cooler', type: 'Heat Exchanger', plant: 'MLNG' },
    { id: 'E-4652-ACI1', desc: 'Heat Exchanger — Coolant', type: 'Heat Exchanger', plant: 'MLNG' },
    { id: 'E-1051B-AR1', desc: 'Unfired Pressure Vessel', type: 'Pressure Vessel', plant: 'MLNG TIGA' },
    { id: 'E-1053B-II-ACI1', desc: 'Air Cooled Exchanger — Fin Bank', type: 'Air Cooled Exchanger', plant: 'MLNG TIGA' },
    { id: '6"-G48005-NGB1', desc: 'Piping — External Corrosion Survey', type: 'Piping', plant: 'MLNG' },
    { id: 'LNG-TANK-3105', desc: 'LNG Storage Tank', type: 'Storage Tank', plant: 'MLNG' },
    { id: '7E-95210', desc: 'BOG Compressor Aftercooler', type: 'Heat Exchanger', plant: 'MLNG TIGA' },
  ];

  const MOCK_USERS = [
    { name: 'Harri Ahmad', email: 'harri.ahmad@mlng.com.my', role: 'Inspector', plant: 'MLNG TIGA' },
    { name: 'Afnan Hasbullah', email: 'afnan.h@mlng.com.my', role: 'Inspector', plant: 'MLNG' },
    { name: 'Jasmine Loh', email: 'jasmine.loh@mlng.com.my', role: 'Reviewer', plant: 'MLNG' },
    { name: 'Mohd. Hairi', email: 'm.hairi@mlng.com.my', role: 'Approver', plant: 'MLNG TIGA' },
    { name: 'Siti Nurhaliza', email: 'siti.nh@mlng.com.my', role: 'Inspector', plant: 'MLNG DUA' },
    { name: 'Ravi Kumar', email: 'ravi.k@mlng.com.my', role: 'Reviewer', plant: 'MLNG TIGA' },
    { name: 'Wong Mei Ling', email: 'wong.ml@mlng.com.my', role: 'Approver', plant: 'MLNG' },
    { name: 'Aiman Bakar', email: 'aiman.b@mlng.com.my', role: 'Inspector', plant: 'RI5' },
    { name: 'Faridah M.', email: 'faridah.m@mlng.com.my', role: 'Admin', plant: 'All Plants' },
    { name: 'Tan Chee Wei', email: 'tan.cw@mlng.com.my', role: 'Inspector', plant: 'MLNG TIGA' },
  ];

  const MOCK_TICKETS = [
    { id: 'SP-1284', title: 'Photo annotation tool not saving overlays consistently',  type: 'Bug',     status: 'Open',           priority: 'High' },
    { id: 'SP-1276', title: 'Add bulk-export to Reports list',                          type: 'Feature', status: 'In Progress',    priority: 'Normal' },
    { id: 'SP-1281', title: 'Cmd+K palette doesn\'t dismiss when clicking outside',     type: 'Bug',     status: 'Awaiting Reply', priority: 'Low' },
    { id: 'SP-1273', title: 'Add ability to copy findings between reports',             type: 'Feature', status: 'In Progress',    priority: 'Normal' },
    { id: 'SP-1268', title: 'Equipment search empty for piping IDs with quote chars',   type: 'Bug',     status: 'Resolved',       priority: 'High' },
    { id: 'SP-1262', title: 'Slow load on dashboard when 1000+ reports exist',          type: 'Bug',     status: 'Open',           priority: 'Critical' },
    { id: 'SP-1255', title: 'Allow custom inspection priorities beyond P1–P3',          type: 'Feature', status: 'Closed',         priority: 'Low' },
    { id: 'SP-1248', title: 'How to export multiple reports to a single PDF?',          type: 'Question',status: 'Resolved',       priority: 'Low' },
    { id: 'SP-1290', title: 'SAP Work Orders integration · 401 token expired',          type: 'Bug',     status: 'Open',           priority: 'Critical' },
  ];

  const MOCK_KB = [
    { title: 'Getting Started with MAVIS 2.0',                          section: 'Getting Started',         readTime: '5 min' },
    { title: 'How to add a finding to a report',                        section: 'Inspection Workflow',     readTime: '3 min' },
    { title: 'Photo annotation tools — circles, arrows, labels',        section: 'Inspection Workflow',     readTime: '4 min' },
    { title: 'Working offline — what syncs and when',                   section: 'Getting Started',         readTime: '6 min' },
    { title: 'Approval routing — Preparer, Reviewer, Approver',         section: 'Inspection Workflow',     readTime: '4 min' },
    { title: 'PDF export troubleshooting',                              section: 'Troubleshooting',         readTime: '3 min' },
    { title: 'Custom report types — admin guide',                       section: 'Inspection Workflow',     readTime: '8 min' },
    { title: 'AI Insights — interpreting pattern detection',            section: 'AI Insights & Reports',   readTime: '5 min' },
    { title: 'Equipment registry and PRBI integration',                 section: 'Inspection Workflow',     readTime: '4 min' },
    { title: 'Login issues and account recovery',                       section: 'Troubleshooting',         readTime: '2 min' },
    { title: 'Bulk import equipment via CSV',                           section: 'Inspection Workflow',     readTime: '6 min' },
    { title: 'Configuring SAP work order push',                         section: 'Troubleshooting',         readTime: '7 min' },
    { title: 'UT Tablet Module — gauge pairing guide',                  section: 'Inspection Workflow',     readTime: '5 min' },
    { title: 'Keyboard shortcuts — power-user reference',               section: 'Getting Started',         readTime: '3 min' },
  ];

  const MOCK_INSIGHTS_DATA = [
    { id: 'IN-001', title: 'Module 7 — recurring external corrosion on pressure vessels', type: 'Hotspot',    severity: 'High',     plant: 'MLNG TIGA' },
    { id: 'IN-002', title: '8 vessels due for re-coating within 6 months',                 type: 'Predictive', severity: 'Medium',   plant: 'MLNG · MLNG TIGA' },
    { id: 'IN-003', title: 'Duplicate findings detected in 4 recent reports',              type: 'Efficiency', severity: 'Info',     plant: 'MLNG' },
    { id: 'IN-004', title: 'MLNG DUA — 40% fewer Cat 1 findings vs last quarter',          type: 'Trend',      severity: 'Positive', plant: 'MLNG DUA' },
    { id: 'IN-005', title: 'Unusual UT thickness drop on 10"-B12420-CAB2',                 type: 'Anomaly',    severity: 'Medium',   plant: 'MLNG TIGA' },
    { id: 'IN-006', title: 'RI5 inspection coverage gap — 14 equipment overdue',           type: 'Coverage',   severity: 'Info',     plant: 'RI5' },
  ];

  const MOCK_LOCATIONS = [
    { name: 'MLNG',              type: 'Plant',  desc: 'Original Malaysia LNG complex',         href: '02-report-list.html' },
    { name: 'MLNG TIGA',         type: 'Plant',  desc: 'MLNG Tiga · third-train plant',          href: '02-report-list.html' },
    { name: 'MLNG DUA',          type: 'Plant',  desc: 'MLNG Dua · second-train plant',          href: '02-report-list.html' },
    { name: 'RI5',               type: 'Plant',  desc: 'Refrigerant Island 5 · pilot plant',     href: '02-report-list.html' },
    { name: 'Module 7',          type: 'Area',   desc: 'MLNG TIGA · process module',             href: '08-equipment.html' },
    { name: 'Module 5',          type: 'Area',   desc: 'MLNG · process module',                  href: '08-equipment.html' },
    { name: 'Tanjung Kidurong',  type: 'Site',   desc: 'MLNG complex · Bintulu, Sarawak',        href: '08-equipment.html' },
    { name: 'System 95500',      type: 'System', desc: 'MLNG TIGA · utilities',                  href: '02-report-list.html' },
    { name: 'System 4600',       type: 'System', desc: 'MLNG · lube oil cooling',                href: '02-report-list.html' },
    { name: 'System 1000',       type: 'System', desc: 'MLNG TIGA · process',                    href: '02-report-list.html' },
    { name: 'System 4800',       type: 'System', desc: 'MLNG · NG boil-off',                     href: '02-report-list.html' },
    { name: 'System 3100',       type: 'System', desc: 'MLNG TIGA · LNG storage',                href: '02-report-list.html' },
  ];

  const MOCK_INTEGRATIONS = [
    { name: 'Risk Assessment Module',         type: 'RBI · Risk-Based Inspection',           status: 'Connected' },
    { name: 'Equipment Materials System',     type: 'PRBI · Plant Register',                 status: 'Connected' },
    { name: 'RFI Tracker',                    type: 'NDT · Cross-Reference',                 status: 'Connected' },
    { name: 'PETRONAS Active Directory',      type: 'SSO · Identity & Access',               status: 'Connected' },
    { name: 'Esri ArcGIS',                    type: 'Geospatial · Plant Map Tiles',          status: 'Connected' },
    { name: 'Microsoft 365 Email',            type: 'Notification · Outlook SMTP',           status: 'Connected' },
    { name: 'WhatsApp Business',              type: 'Notification · Mobile Alerts',          status: 'Pending' },
    { name: 'SAP S/4HANA Work Orders',        type: 'Maintenance · WO Push',                 status: 'Error' },
  ];

  const SLASH_COMMANDS = [
    { cmd: '/dashboard', label: 'Dashboard',   desc: 'Inspection overview',                  icon: 'D', href: '01-dashboard.html' },
    { cmd: '/reports',   label: 'Reports',     desc: 'All inspection reports',               icon: 'R', href: '02-report-list.html' },
    { cmd: '/report',    label: 'New Report',  desc: 'Create a new inspection report',       icon: '+', href: '03-create-report-details.html' },
    { cmd: '/equipment', label: 'Equipment',   desc: 'Equipment registry',                   icon: 'E', href: '08-equipment.html' },
    { cmd: '/users',     label: 'Team',        desc: 'Inspectors, reviewers, approvers',     icon: 'U', href: '09-users.html' },
    { cmd: '/analysis',  label: 'AI Insights', desc: 'Patterns detected across all reports', icon: 'AI', href: '10-ai-insights.html' },
    { cmd: '/insights',  label: 'AI Insights', desc: 'Patterns detected across all reports', icon: 'AI', href: '10-ai-insights.html' },
    { cmd: '/ut',        label: 'UT Tablet Module',  desc: 'CML/TML thickness monitoring (optional)',  icon: 'T', href: '13-ut-tablet.html' },
    { cmd: '/audit',     label: 'Audit Log',   desc: 'Comprehensive activity trail',         icon: 'A', href: '11-audit-log.html' },
    { cmd: '/log',       label: 'Audit Log',   desc: 'Comprehensive activity trail',         icon: 'A', href: '11-audit-log.html' },
    { cmd: '/integrations', label: 'Integrations', desc: 'Connected systems, sync status, API health', icon: 'I', href: '14-integrations.html' },
    { cmd: '/support',   label: 'Support',     desc: 'Tickets, helpdesk, live agent',        icon: '?', href: '12-support.html' },
    { cmd: '/help',      label: 'Help Center', desc: 'Tickets, helpdesk, live agent',        icon: '?', href: '12-support.html' },
  ];

  // ============================================================
  // TOASTS
  // ============================================================
  let toastStack;
  function ensureToastStack() {
    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.className = 'toast-stack';
      document.body.appendChild(toastStack);
    }
    return toastStack;
  }
  function toast(message, opts = {}) {
    const stack = ensureToastStack();
    const t = document.createElement('div');
    t.className = `toast${opts.variant ? ' toast-' + opts.variant : ''}`;
    const svgCheck = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    const svgWarn = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>';
    const svgX = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    const icon = opts.icon || (opts.variant === 'warning' ? svgWarn : opts.variant === 'danger' ? svgX : svgCheck);
    t.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg"></span>`;
    t.querySelector('.toast-msg').textContent = message;
    stack.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    const ttl = opts.duration || 3000;
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 250);
    }, ttl);
  }
  window.toast = toast;

  // ============================================================
  // COMMAND PALETTE (Cmd/Ctrl+K)
  // ============================================================
  let cmdkOverlay = null;
  let cmdkInput = null;
  let cmdkList = null;
  let cmdkActiveIndex = 0;
  let cmdkFlatItems = [];

  function buildCommandPalette() {
    if (cmdkOverlay) return;
    cmdkOverlay = document.createElement('div');
    cmdkOverlay.className = 'cmdk-overlay';
    cmdkOverlay.innerHTML = `
      <div class="cmdk-modal" role="dialog" aria-label="Command palette">
        <div class="cmdk-input-wrap">
          <svg class="cmdk-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" class="cmdk-input" placeholder="Search anything — reports, equipment, people, tickets, insights, KB, plants… or type / for commands" autocomplete="off" spellcheck="false">
          <span class="cmdk-esc">esc</span>
        </div>
        <div class="cmdk-list" role="listbox"></div>
        <div class="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    `;
    document.body.appendChild(cmdkOverlay);
    cmdkInput = cmdkOverlay.querySelector('.cmdk-input');
    cmdkList = cmdkOverlay.querySelector('.cmdk-list');
    cmdkOverlay.addEventListener('click', e => { if (e.target === cmdkOverlay) closeCmdk(); });
    cmdkInput.addEventListener('input', renderCmdkResults);
    cmdkInput.addEventListener('keydown', handleCmdkKey);
    cmdkList.addEventListener('click', e => {
      const item = e.target.closest('.cmdk-item');
      if (item) selectCmdkItem(item);
    });
    cmdkList.addEventListener('mousemove', e => {
      const item = e.target.closest('.cmdk-item');
      if (!item) return;
      const idx = parseInt(item.getAttribute('data-idx'), 10);
      if (!isNaN(idx) && idx !== cmdkActiveIndex) {
        cmdkActiveIndex = idx;
        updateActiveCmdk();
      }
    });
  }

  function openCmdk() {
    buildCommandPalette();
    cmdkOverlay.classList.add('show');
    cmdkInput.value = '';
    cmdkActiveIndex = 0;
    renderCmdkResults();
    setTimeout(() => cmdkInput.focus(), 50);
  }

  function closeCmdk() {
    if (!cmdkOverlay) return;
    cmdkOverlay.classList.remove('show');
  }

  // AI example queries — shown when user types bare /ask or /analyse
  const AI_EXAMPLE_QUERIES = [
    "What's the most critical equipment right now?",
    "Show me corrosion rate trends across all plants",
    "Which vessels are due for re-coating in the next 6 months?",
    "Where are duplicate findings I should consolidate?",
    "Compare MLNG TIGA Module 7 to baseline",
    "Which inspector has the highest backlog?",
  ];

  // ============================================================
  // AI KNOWLEDGE BASE — canned answers for the chat interface.
  // Each entry has keywords (for intent matching), the answer body,
  // source cards (linking to real reports/equipment/insights), and
  // suggested follow-up questions.
  // ============================================================
  const AI_KNOWLEDGE = [
    {
      id: 'critical',
      keywords: ['critical', 'urgent', 'priority', 'most important', 'attention', 'worst', 'high risk', 'risk'],
      text: "Right now, **3 items** sit at the top of the risk stack:\n\n1. **7V-95543** (Secured Air Supply Vessel, MLNG TIGA) — external SSI flagged in RF9030 by Harri Ahmad. Pending approval with Mohd. Hairi for **3 days**, blocking maintenance scheduling.\n2. **Module 7 cluster** at MLNG TIGA — 12 vessels showing corrosion rates **2.3× above baseline**. Pattern detected across 47 reports.\n3. **10\"-B12420-CAB2** — UT thickness reading dropped from 8.2mm to 6.4mm in 90 days. That's faster than the predicted curve. Worth a re-survey.",
      sources: [
        { label: 'RF9030', sub: '7V-95543 · Pending approval', icon: 'R', href: '07-report-detail.html' },
        { label: 'IN-001', sub: 'Module 7 — recurring external corrosion', icon: 'AI', href: '10-ai-insights.html#in-001' },
        { label: 'IN-005', sub: 'Unusual UT thickness drop on 10"-B12420-CAB2', icon: 'AI', href: '10-ai-insights.html#in-005' },
      ],
      followUps: [
        'Why is Module 7 trending so high?',
        'What\'s blocking RF9030 approval?',
        'Show me UT readings for 10"-B12420-CAB2',
      ],
    },
    {
      id: 'corrosion-trend',
      keywords: ['corrosion', 'rate', 'trend', 'rates', 'rust', 'wall loss', 'thickness'],
      text: "Looking across **1,247 reports** from the last 12 months:\n\n• **MLNG TIGA** — corrosion rate +12.4% vs prior year. Module 7 is the dominant contributor (47 reports, all external SSI on pressure vessels).\n• **MLNG** — flat to -3%. Re-coating program from 2024 is holding.\n• **MLNG DUA** — -28% (Cat 1 findings). Best-performing plant this quarter.\n• **RI5** — +4%, but coverage gap: 14 equipment overdue. Real number is likely worse.\n\nMechanism breakdown: **62% external SSI**, 21% CUI, 11% galvanic, 6% other.",
      sources: [
        { label: 'IN-001', sub: 'Module 7 hotspot — High severity', icon: 'AI', href: '10-ai-insights.html#in-001' },
        { label: 'IN-004', sub: 'MLNG DUA · 40% fewer Cat 1 findings', icon: 'AI', href: '10-ai-insights.html#in-004' },
        { label: 'IN-006', sub: 'RI5 coverage gap — 14 overdue', icon: 'AI', href: '10-ai-insights.html#in-006' },
      ],
      followUps: [
        'Why is MLNG DUA improving?',
        'What\'s causing the SSI on Module 7?',
        'Which RI5 equipment is overdue?',
      ],
    },
    {
      id: 'recoating',
      keywords: ['recoat', 're-coat', 'coating', 'paint', 're-coating', 'recoating', 'due'],
      text: "**8 vessels** are projected to reach Re 3 (paint failure threshold) within the next 6 months, based on the corrosion-rate model.\n\n• **5 at MLNG TIGA** — 7V-95543, 7V-95544, 7V-95548, 7V-95551, 7V-95560 (cluster on Module 7)\n• **3 at MLNG** — E-4642-ACI1, E-4652-ACI1, E-1051B-AR1\n\nIf you batch them, the recoating window is **week of 22 Apr 2026** (planned shutdown). Estimated cost saving vs reactive: ~RM 1.2M.",
      sources: [
        { label: 'IN-002', sub: '8 vessels due for re-coating · Predictive', icon: 'AI', href: '10-ai-insights.html#in-002' },
        { label: '7V-95543', sub: 'Secured Air Supply Vessel', icon: 'E', href: '08-equipment.html' },
        { label: 'E-4642-ACI1', sub: 'Heat Exchanger — Lube Oil Cooler', icon: 'E', href: '08-equipment.html' },
      ],
      followUps: [
        'Schedule a recoating batch for week of 22 Apr',
        'What\'s the historical recoating cost at MLNG TIGA?',
        'Show me all Module 7 vessels',
      ],
    },
    {
      id: 'duplicates',
      keywords: ['duplicate', 'duplicates', 'similar', 'consolidate', 'redundant', 'same finding', 'overlap'],
      text: "Found **4 reports** with near-duplicate findings worth consolidating:\n\n• RF9026 + RF9028 — same external corrosion finding on E-4642-ACI1, written 11 days apart by different inspectors. 94% text similarity.\n• RF9024 + RF9027 — both flag coating breakdown at the bottom-head of E-1051B-AR1. Could be one finding with two photos.\n\nConsolidating would save reviewer time (~3 hr/month) and reduce noise in the equipment history view.",
      sources: [
        { label: 'IN-003', sub: 'Duplicate findings detected · Efficiency', icon: 'AI', href: '10-ai-insights.html#in-003' },
        { label: 'RF9028', sub: 'E-4642-ACI1 — Annual Inspection', icon: 'R', href: 'report-rf9028.html' },
        { label: 'RF9026', sub: 'E-4642-ACI1 — Major Inspection', icon: 'R', href: '07-report-detail.html' },
      ],
      followUps: [
        'Who wrote these duplicate findings?',
        'Auto-consolidate the RF9026/RF9028 pair',
        'Are there duplicates in MLNG TIGA reports?',
      ],
    },
    {
      id: 'mlng-tiga-deep',
      keywords: ['mlng tiga', 'module 7', 'tiga', 'baseline', 'compare'],
      text: "**MLNG TIGA · Module 7** — full deep dive:\n\n• **47 reports** in the last 12 months (vs 19 baseline = +147%)\n• Common mechanism: **external SSI under insulation jacketing**\n• Geographic cluster: 80% of findings sit in a 40m radius around the LP flare line\n• Likely root cause: damaged insulation cladding from 2023 cyclone debris that wasn't fully replaced\n\n**Recommendation:** sweep all 12 vessels in this cluster simultaneously, not one at a time. Currently scheduled piecemeal across 4 quarters — accelerating it would catch upstream contamination earlier.",
      sources: [
        { label: 'IN-001', sub: 'Module 7 hotspot — 47 reports', icon: 'AI', href: '10-ai-insights.html#in-001' },
        { label: '7V-95543', sub: 'Pressure Vessel · Module 7', icon: 'E', href: '08-equipment.html' },
        { label: 'RF9030', sub: '7V-95543 · External SSI · Pending', icon: 'R', href: '07-report-detail.html' },
      ],
      followUps: [
        'Show me all Module 7 reports',
        'Who\'s the lead inspector for Module 7?',
        'What\'s the cost of accelerating the sweep?',
      ],
    },
    {
      id: 'workload',
      keywords: ['workload', 'backlog', 'pending', 'inspector', 'who has', 'most reports', 'busy', 'approver'],
      text: "**Inspector workload** this month:\n\n• **Harri Ahmad** — 14 reports submitted (3 pending review). Highest output.\n• **Afnan Hasbullah** — 11 reports, 1 in draft.\n• **Siti Nurhaliza** — 9 reports, all approved.\n\n**Approver bottleneck:**\n• **Mohd. Hairi** has **6 pending approvals**, oldest is 5 days. He's the only approver for MLNG TIGA — adding a backup approver would unblock 60% of stalled work.",
      sources: [
        { label: 'Harri Ahmad', sub: 'Inspector · MLNG TIGA · 14 reports', icon: 'U', href: '09-users.html' },
        { label: 'Mohd. Hairi', sub: 'Approver · 6 pending', icon: 'U', href: '09-users.html' },
        { label: '11-audit-log', sub: 'Audit log · approval timeline', icon: 'K', href: '11-audit-log.html' },
      ],
      followUps: [
        'Show me Mohd. Hairi\'s pending queue',
        'Add a backup approver for MLNG TIGA',
        'Compare Harri vs Afnan output',
      ],
    },
    {
      id: 'report-search',
      keywords: ['find report', 'show report', 'report for', 'reports about', 'inspection of', 'rf90', 'where is'],
      text: "Here are the most relevant reports based on your query. Click any to open the full report — or refine with an equipment ID, plant, or date range.",
      sources: [
        { label: 'RF9030', sub: '7V-95543 · MLNG TIGA · Pending', icon: 'R', href: '07-report-detail.html' },
        { label: 'RF9028', sub: 'E-4642-ACI1 · MLNG · Approved', icon: 'R', href: 'report-rf9028.html' },
        { label: 'RF9027', sub: 'E-4652-ACI1 · MLNG · Draft', icon: 'R', href: '07-report-detail.html' },
        { label: 'RF9026', sub: 'E-4642-ACI1 · MLNG · Approved', icon: 'R', href: '07-report-detail.html' },
        { label: 'RF9024', sub: 'E-1051B-AR1 · MLNG TIGA · Approved', icon: 'R', href: '07-report-detail.html' },
      ],
      followUps: [
        'Show only pending reports',
        'Filter to MLNG TIGA only',
        'Reports with corrosion findings',
      ],
    },
    {
      id: 'compliance',
      keywords: ['compliance', 'overdue', 'coverage', 'gap', 'missed', 'audit', 'regulator'],
      text: "**Compliance posture:**\n\n• **DOSH inspection cycle** — 98.4% on-time across all plants. Industry benchmark is 92%.\n• **API 510/570/653 coverage** — 100% for vessels, 96% for piping (RI5 has 14 piping circuits overdue), 100% for tanks.\n• **Open Cat 1 findings** — 3 (down from 11 last quarter). All have remediation plans filed.\n\n**Action items:** the 14 RI5 piping circuits are the only gap. Recommend assigning Aiman Bakar to clear them in the next 30 days.",
      sources: [
        { label: 'IN-006', sub: 'RI5 coverage gap — 14 overdue', icon: 'AI', href: '10-ai-insights.html#in-006' },
        { label: 'Audit Log', sub: 'Approval & cycle compliance trail', icon: 'K', href: '11-audit-log.html' },
      ],
      followUps: [
        'List the 14 overdue RI5 circuits',
        'When was the last DOSH audit?',
        'Show me Cat 1 finding history',
      ],
    },
    {
      id: 'ut-thickness',
      keywords: ['ut', 'thickness', 'cml', 'tml', 'wall', 'gauge', 'b12420'],
      text: "Latest **UT thickness** scan summary:\n\n• **10\"-B12420-CAB2** — flagged anomaly. Reading dropped from **8.2mm → 6.4mm** in 90 days. Predicted curve said 7.8mm. Either the gauge needs calibration or the corrosion mechanism shifted.\n• **MLNG TIGA Module 7** — 12 CMLs at or near the **Near Min** threshold (T-min + 1mm).\n• **2 CMLs below T-min** — both on 6\"-G48005-NGB1, repair filed (RFI-2026-014).\n\nThe UT Tablet module captured all readings live this month — drift detection is now automatic.",
      sources: [
        { label: 'IN-005', sub: 'Unusual UT drop on 10"-B12420-CAB2', icon: 'AI', href: '10-ai-insights.html#in-005' },
        { label: 'UT Tablet', sub: '12 CMLs · Module 7', icon: 'E', href: '13-ut-tablet.html' },
      ],
      followUps: [
        'Show me the UT Tablet readings',
        'Was the gauge calibrated this month?',
        'Plot the 90-day trend for 10"-B12420-CAB2',
      ],
    },
  ];

  const AI_FALLBACK = {
    text: "I couldn't find a strong match for that question yet — but here's what I have access to: **1,247 reports**, **1,847 equipment records**, **47 inspectors**, and live UT readings from the tablet module. Try one of the suggestions below, or ask about a specific equipment ID, plant, or finding type.",
    sources: [],
    followUps: AI_EXAMPLE_QUERIES.slice(0, 4),
  };

  function findAiAnswer(question) {
    const q = (question || '').toLowerCase();
    if (!q.trim()) return AI_FALLBACK;
    let best = null;
    let bestScore = 0;
    for (const entry of AI_KNOWLEDGE) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (q.includes(kw)) score += kw.length; // longer keywords win
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore > 0 ? best : AI_FALLBACK;
  }

  function renderCmdkResults() {
    const q = cmdkInput.value.trim();
    const ql = q.toLowerCase();
    const groups = [];

    // /ask <query> or /analyse <query> — parametric AI commands
    const askMatch = ql.match(/^\/(ask|analyse|analyze)(?:\s+(.+))?$/);
    if (askMatch) {
      const queryText = q.replace(/^\/\S+\s*/, '').trim();
      if (queryText) {
        groups.push({
          label: 'AI Analysis',
          items: [{
            label: 'Ask AI · "' + queryText + '"',
            sub: 'Analyze across reports, equipment, and insights',
            hint: 'Press ↵',
            icon: 'AI',
            href: '10-ai-insights.html?ask=' + encodeURIComponent(queryText),
          }]
        });
      } else {
        groups.push({
          label: 'Try asking',
          items: AI_EXAMPLE_QUERIES.map(eq => ({
            label: eq,
            sub: '/ask ' + eq.toLowerCase().slice(0, 28) + (eq.length > 28 ? '…' : ''),
            hint: 'AI',
            icon: 'AI',
            href: '10-ai-insights.html?ask=' + encodeURIComponent(eq),
          }))
        });
      }
    } else if (!q) {
      groups.push({ label: 'Quick actions', items: SLASH_COMMANDS.map(c => ({
        label: c.label, sub: c.cmd, hint: c.desc, icon: c.icon, href: c.href
      })) });
    } else if (ql.startsWith('/')) {
      const matches = SLASH_COMMANDS.filter(c => c.cmd.toLowerCase().startsWith(ql));
      if (matches.length) groups.push({ label: 'Commands', items: matches.map(c => ({
        label: c.label, sub: c.cmd, hint: c.desc, icon: c.icon, href: c.href
      })) });
    } else {
      // Universal search — match across every entity type
      const matchAll = (s, ql) => (s || '').toLowerCase().includes(q);
      const reports = MOCK_REPORTS.filter(r => matchAll(r.id, ql) || matchAll(r.equipment, ql) || matchAll(r.desc, ql) || matchAll(r.plant, ql) || matchAll(r.status, ql)).slice(0, 5);
      const equip = MOCK_EQUIPMENT.filter(e => matchAll(e.id, ql) || matchAll(e.desc, ql) || matchAll(e.type, ql) || matchAll(e.plant, ql)).slice(0, 5);
      const users = MOCK_USERS.filter(u => matchAll(u.name, ql) || matchAll(u.email, ql) || matchAll(u.role, ql) || matchAll(u.plant, ql)).slice(0, 5);
      const tickets = MOCK_TICKETS.filter(t => matchAll(t.id, ql) || matchAll(t.title, ql) || matchAll(t.type, ql) || matchAll(t.status, ql) || matchAll(t.priority, ql)).slice(0, 5);
      const insights = MOCK_INSIGHTS_DATA.filter(i => matchAll(i.id, ql) || matchAll(i.title, ql) || matchAll(i.type, ql) || matchAll(i.severity, ql) || matchAll(i.plant, ql)).slice(0, 5);
      const kb = MOCK_KB.filter(a => matchAll(a.title, ql) || matchAll(a.section, ql)).slice(0, 5);
      const locs = MOCK_LOCATIONS.filter(l => matchAll(l.name, ql) || matchAll(l.type, ql) || matchAll(l.desc, ql)).slice(0, 5);
      const integ = MOCK_INTEGRATIONS.filter(i => matchAll(i.name, ql) || matchAll(i.type, ql) || matchAll(i.status, ql)).slice(0, 5);

      if (reports.length) groups.push({ label: 'Reports', items: reports.map(r => ({
        label: r.id, sub: r.desc, hint: `${r.equipment} · ${r.plant} · ${r.status}`, icon: 'R', href: '07-report-detail.html'
      })) });
      if (equip.length) groups.push({ label: 'Equipment', items: equip.map(e => ({
        label: e.id, sub: e.desc, hint: `${e.type} · ${e.plant}`, icon: 'E', href: '08-equipment.html'
      })) });
      if (users.length) groups.push({ label: 'People', items: users.map(u => ({
        label: u.name, sub: u.email, hint: `${u.role} · ${u.plant}`, icon: 'U', href: '09-users.html'
      })) });
      if (tickets.length) groups.push({ label: 'Support Tickets', items: tickets.map(t => ({
        label: t.id, sub: t.title, hint: `${t.type} · ${t.status} · ${t.priority}`, icon: '?', href: '12-support.html'
      })) });
      if (insights.length) groups.push({ label: 'AI Insights', items: insights.map(i => ({
        label: i.title.length > 60 ? i.title.slice(0, 57) + '…' : i.title, sub: `${i.type} · ${i.severity}`, hint: i.plant, icon: 'AI', href: '10-ai-insights.html'
      })) });
      if (kb.length) groups.push({ label: 'Knowledge Base', items: kb.map(a => ({
        label: a.title, sub: a.section, hint: a.readTime, icon: 'K', href: '12-support.html'
      })) });
      if (locs.length) groups.push({ label: 'Plants & Locations', items: locs.map(l => ({
        label: l.name, sub: l.desc, hint: l.type, icon: 'L', href: l.href
      })) });
      if (integ.length) groups.push({ label: 'Integrations', items: integ.map(i => ({
        label: i.name, sub: i.type, hint: i.status, icon: 'I', href: '14-integrations.html'
      })) });
    }

    cmdkFlatItems = groups.flatMap(g => g.items);
    if (cmdkActiveIndex >= cmdkFlatItems.length) cmdkActiveIndex = 0;

    if (!cmdkFlatItems.length) {
      cmdkList.innerHTML = `<div class="cmdk-empty">No results for "${escapeHtml(q)}"</div>`;
      return;
    }

    let html = '';
    let idx = 0;
    for (const g of groups) {
      html += `<div class="cmdk-section-label">${escapeHtml(g.label)}</div>`;
      for (const it of g.items) {
        const active = idx === cmdkActiveIndex ? ' active' : '';
        html += `
          <div class="cmdk-item${active}" data-idx="${idx}" data-href="${escapeHtml(it.href)}" role="option">
            <span class="cmdk-icon">${escapeHtml(it.icon || '·')}</span>
            <div class="cmdk-item-text">
              <span class="cmdk-item-label">${escapeHtml(it.label)}</span>
              <span class="cmdk-item-sub">${escapeHtml(it.sub || '')}</span>
            </div>
            <span class="cmdk-item-hint">${escapeHtml(it.hint || '')}</span>
          </div>`;
        idx++;
      }
    }
    cmdkList.innerHTML = html;
  }

  function handleCmdkKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdkActiveIndex = Math.min(cmdkFlatItems.length - 1, cmdkActiveIndex + 1);
      updateActiveCmdk();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdkActiveIndex = Math.max(0, cmdkActiveIndex - 1);
      updateActiveCmdk();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const items = cmdkList.querySelectorAll('.cmdk-item');
      if (items[cmdkActiveIndex]) selectCmdkItem(items[cmdkActiveIndex]);
    }
  }

  function updateActiveCmdk() {
    const items = cmdkList.querySelectorAll('.cmdk-item');
    items.forEach((el, i) => el.classList.toggle('active', i === cmdkActiveIndex));
    if (items[cmdkActiveIndex]) items[cmdkActiveIndex].scrollIntoView({ block: 'nearest' });
  }

  function selectCmdkItem(el) {
    const href = el.getAttribute('data-href');
    if (href) window.location.href = href;
  }

  function initCommandPalette() {
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdkOverlay && cmdkOverlay.classList.contains('show')) closeCmdk();
        else openCmdk();
      }
    });
    document.querySelectorAll('.navbar-search input').forEach(input => {
      input.setAttribute('readonly', '');
      input.setAttribute('aria-label', 'Open search palette (Cmd+K)');
      input.style.cursor = 'pointer';
      const trigger = e => { e.preventDefault(); input.blur(); openCmdk(); };
      input.addEventListener('mousedown', trigger);
      input.addEventListener('click', trigger);
      input.addEventListener('focus', e => { input.blur(); openCmdk(); });
      input.addEventListener('keydown', e => {
        if (e.key === 'Tab' || e.key === 'Shift') return;
        e.preventDefault();
        openCmdk();
      });
    });
    // Whole .navbar-search wrapper is also clickable
    document.querySelectorAll('.navbar-search').forEach(wrap => {
      wrap.addEventListener('click', e => {
        if (e.target.closest('.kbd-hint') || e.target.tagName === 'INPUT') return;
        openCmdk();
      });
      wrap.style.cursor = 'pointer';
    });
  }

  // ============================================================
  // KBD HINT BADGE
  // ============================================================
  function injectKbdHint() {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    const sym = isMac ? '⌘ K' : 'Ctrl K';
    document.querySelectorAll('.navbar-search').forEach(ns => {
      if (ns.querySelector('.kbd-hint')) return;
      const h = document.createElement('span');
      h.className = 'kbd-hint';
      h.textContent = sym;
      ns.appendChild(h);
    });
  }

  // ============================================================
  // TOGGLES (Yes/No switches)
  // ============================================================
  function initToggles() {
    document.addEventListener('click', e => {
      const t = e.target.closest('.toggle-switch');
      if (!t) return;
      t.classList.toggle('active');
      const item = t.closest('.toggle-item');
      if (item) {
        const lbl = item.querySelector('label');
        if (lbl && /^(Yes|No)$/.test(lbl.textContent.trim())) {
          lbl.textContent = t.classList.contains('active') ? 'Yes' : 'No';
        }
      }
    });
  }

  // ============================================================
  // ACCORDIONS (mobile)
  // ============================================================
  function initAccordions() {
    document.querySelectorAll('.accordion').forEach(a => a.setAttribute('data-open', ''));
    document.addEventListener('click', e => {
      const h = e.target.closest('.accordion-header');
      if (!h) return;
      const acc = h.closest('.accordion');
      if (!acc) return;
      if (acc.hasAttribute('data-open')) acc.removeAttribute('data-open');
      else acc.setAttribute('data-open', '');
    });
  }

  // ============================================================
  // TAG PILLS (filter active table)
  // ============================================================
  function initTagPills() {
    document.addEventListener('click', e => {
      const pill = e.target.closest('.tag-pill');
      if (!pill) return;
      const group = pill.parentElement;
      group.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const value = (pill.getAttribute('data-tag') || pill.textContent.trim()).toLowerCase();
      const card = group.closest('.card');
      if (!card) return;
      const tbody = card.querySelector('tbody');
      if (!tbody) return;
      tbody.querySelectorAll('tr').forEach(tr => {
        if (value === 'all' || !value) { tr.style.display = ''; return; }
        tr.style.display = tr.textContent.toLowerCase().includes(value) ? '' : 'none';
      });
    });
  }

  // ============================================================
  // FILTER DROPDOWNS + SEARCH (filter card-local table)
  // ============================================================
  function initFilters() {
    document.querySelectorAll('.filter-bar select, .filter-bar input[type="text"]').forEach(el => {
      const ev = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(ev, () => applyFilters(el.closest('.filter-bar')));
    });
  }

  function applyFilters(bar) {
    if (!bar) return;
    const card = bar.closest('.card');
    if (!card) return;
    const tbody = card.querySelector('tbody');
    if (!tbody) return;
    const sels = Array.from(bar.querySelectorAll('select'))
      .map(s => s.value).filter(v => v && !/^all\b/i.test(v));
    const txt = (bar.querySelector('input[type="text"]')?.value || '').trim().toLowerCase();
    tbody.querySelectorAll('tr').forEach(tr => {
      const cells = tr.textContent.toLowerCase();
      const matchSel = sels.every(v => cells.includes(v.toLowerCase()));
      const matchTxt = !txt || cells.includes(txt);
      tr.style.display = (matchSel && matchTxt) ? '' : 'none';
    });
  }

  // ============================================================
  // PAGINATION (mock — toggles active state)
  // ============================================================
  function initPagination() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.pagination-btn');
      if (!btn) return;
      const text = btn.textContent.trim();
      if (text === '…' || text === '...') return;
      if (text === '‹' || text === '›') {
        toast('Demo: only page 1 is populated', { duration: 2000 });
        return;
      }
      const group = btn.parentElement;
      group.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      toast(`Page ${text} loaded`, { duration: 1500 });
    });
  }

  // ============================================================
  // DATA-DRIVEN ACTIONS (Save Draft / Cancel / Submit / etc.)
  // ============================================================
  function actionDefaultMessage(action) {
    return ({
      'save-draft': 'Saved as draft',
      'cancel': 'Discarded',
      'submit-approval': 'Submitted for approval — RF9030 sent to Mohd. Hairi',
      'share': 'Link copied to clipboard',
      'pdf': 'PDF download started',
      'print': null,
    })[action] || null;
  }

  function initActionButtons() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (btn) {
        const action = btn.getAttribute('data-action');
        if (action === 'print') { window.print(); return; }
        const msg = btn.getAttribute('data-toast') || actionDefaultMessage(action);
        const href = btn.getAttribute('data-href');
        const variant = btn.getAttribute('data-variant') || 'success';
        if (msg) toast(msg, { variant });
        if (href) setTimeout(() => { window.location.href = href; }, 700);
        return;
      }
      const t = e.target.closest('[data-toast]');
      if (t) {
        toast(t.getAttribute('data-toast'));
        return;
      }
      const navBtn = e.target.closest('button[data-href]');
      if (navBtn) {
        const href = navBtn.getAttribute('data-href');
        if (href) window.location.href = href;
      }
    });
  }

  // ============================================================
  // REPORT-TYPE CARDS (selection)
  // ============================================================
  function initReportTypeCards() {
    document.addEventListener('click', e => {
      const card = e.target.closest('.report-type-card');
      if (!card) return;
      const grid = card.parentElement;
      grid.querySelectorAll('.report-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const href = card.getAttribute('data-href');
      if (!href) return;
      const here = location.pathname.split('/').pop() || 'index.html';
      if (href !== here) location.href = href;
    });
  }

  // ============================================================
  // COMPONENT TAG REMOVE
  // ============================================================
  function initTagRemoves() {
    document.addEventListener('click', e => {
      const x = e.target.closest('.tag-remove');
      if (!x) return;
      const tag = x.closest('.component-tag');
      if (tag) tag.remove();
    });
  }

  // ============================================================
  // ANNOTATION TOOLBAR (visual active state)
  // ============================================================
  function initAnnotationToolbar() {
    document.querySelectorAll('.annotation-preview').forEach(ap => {
      const tools = ap.querySelectorAll('div[title]');
      tools.forEach(t => {
        t.addEventListener('click', () => {
          tools.forEach(o => {
            o.style.background = 'rgba(0,0,0,0.5)';
            o.style.border = 'none';
          });
          t.style.background = 'rgba(255,255,255,0.2)';
          t.style.border = '2px solid white';
        });
      });
    });
  }

  // ============================================================
  // ADD ANOTHER FINDING (clone)
  // ============================================================
  function initAddFinding() {
    document.querySelectorAll('button.btn-outline').forEach(btn => {
      if (!/Add Another Finding/i.test(btn.textContent)) return;
      btn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.finding-card');
        if (!cards.length) { toast('No finding to clone', { variant: 'warning' }); return; }
        const last = cards[cards.length - 1];
        const clone = last.cloneNode(true);
        const num = cards.length + 1;
        const numEl = clone.querySelector('.finding-num');
        if (numEl) numEl.textContent = String(num);
        last.after(clone);
        clone.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toast(`Finding #${num} added`);
      });
    });
  }

  // ============================================================
  // REMOVE FINDING
  // ============================================================
  function initRemoveFinding() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (!/^\s*Remove\s*$/i.test(btn.textContent.replace(/\s+/g, ' '))) return;
      const card = btn.closest('.finding-card');
      if (!card) return;
      if (document.querySelectorAll('.finding-card').length <= 1) {
        toast('At least one finding is required', { variant: 'warning' });
        return;
      }
      card.remove();
      toast('Finding removed');
    });
  }

  // ============================================================
  // ASSET SEARCH MODAL
  // ============================================================
  function openAssetSearchModal() {
    let modal = document.querySelector('.modal-asset-search');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cmdk-overlay modal-asset-search';
      modal.innerHTML = `
        <div class="modal-card" role="dialog" aria-label="Search Asset Data Record">
          <div class="modal-header">
            <h3>Search Asset Data Record</h3>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <div class="modal-section-label">Filters</div>
            <div class="form-row form-row-3 mb-16">
              <div class="form-group">
                <label class="form-label">Equipment Type <span class="required">*</span></label>
                <select class="form-control"><option>Unfired Pressure Vessel</option><option>Heat Exchanger</option><option>Air Cooled Exchanger</option><option>Piping</option></select>
              </div>
              <div class="form-group">
                <label class="form-label">OPU Name <span class="required">*</span></label>
                <input type="text" class="form-control form-control-readonly" value="Malaysia LNG Complex" readonly>
              </div>
              <div class="form-group">
                <label class="form-label">Plant <span class="required">*</span></label>
                <select class="form-control"><option>MLNG TIGA</option><option>MLNG</option><option>MLNG DUA</option><option>RI5</option></select>
              </div>
            </div>
            <div class="form-row form-row-3 mb-16">
              <div class="form-group">
                <label class="form-label">Equipment ID</label>
                <input type="text" class="form-control" value="7V-95543">
              </div>
              <div class="form-group">
                <label class="form-label">Area</label>
                <select class="form-control"><option>Module 7</option><option>Module 5</option></select>
              </div>
              <div class="form-group">
                <label class="form-label">System</label>
                <select class="form-control"><option>95500</option><option>4600</option></select>
              </div>
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:16px;">
              <button class="btn btn-ghost btn-sm" data-toast="Filters cleared">Clear</button>
              <button class="btn btn-primary btn-sm" data-toast="1 record found">Search</button>
            </div>
            <div class="modal-section-label">Asset Data Record</div>
            <table>
              <thead><tr><th style="width:30px"></th><th style="width:36px">No</th><th>Equipment ID</th><th>Description</th><th>Area</th></tr></thead>
              <tbody>
                <tr style="background:var(--accent-subtle);">
                  <td><input type="checkbox" checked></td>
                  <td>1</td>
                  <td><span class="tag-id">7V-95543</span></td>
                  <td>Secured Air Supply Vessel</td>
                  <td>Module 7</td>
                </tr>
              </tbody>
            </table>
            <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;">
              <button class="btn btn-ghost btn-sm modal-close">Cancel</button>
              <button class="btn btn-primary btn-sm" data-asset-select>Select</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('.modal-close')) modal.classList.remove('show');
        if (e.target.closest('[data-asset-select]')) {
          modal.classList.remove('show');
          toast('Asset 7V-95543 selected');
        }
      });
    }
    modal.classList.add('show');
  }

  // ============================================================
  // UPLOAD IMAGE MODAL
  // ============================================================
  function openUploadImageModal() {
    let modal = document.querySelector('.modal-upload-image');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cmdk-overlay modal-upload-image';
      modal.innerHTML = `
        <div class="modal-card" role="dialog" aria-label="Upload Image">
          <div class="modal-header">
            <h3>Upload Image</h3>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
              <div>
                <div class="modal-section-label">Upload Image Files <span class="required">*</span></div>
                <div class="upload-zone">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p>Drag &amp; Drop your files or <a href="#">Browse</a></p>
                </div>
              </div>
              <div>
                <div class="modal-section-label">Analyse Image Files <span class="required">*</span></div>
                <div class="upload-zone">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p>Drag &amp; Drop your files or <a href="#">Browse</a></p>
                </div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text-tertiary);line-height:1.7;margin-bottom:16px;">
              Supported image types: JPEG, PNG, BMP. Recommended resolution: 1920×1080. Max file size: 100 MB. Max 10 files per upload.
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <button class="btn btn-ghost btn-sm modal-close">Close</button>
              <button class="btn btn-primary btn-sm" data-upload-confirm>Upload</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('.modal-close')) modal.classList.remove('show');
        if (e.target.closest('[data-upload-confirm]')) {
          modal.classList.remove('show');
          toast('2 photos uploaded for analysis');
        }
      });
    }
    modal.classList.add('show');
  }

  function initModalTriggers() {
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-modal], [data-modal-trigger]');
      if (!t) return;
      const which = t.getAttribute('data-modal') || t.getAttribute('data-modal-trigger');
      if (which === 'asset-search') openAssetSearchModal();
      else if (which === 'upload-image') openUploadImageModal();
      else if (which === 'new-ticket') openNewTicketModal();
      else if (which === 'pdf-preview') {
        const reportId = t.getAttribute('data-report-id') || 'RF9028';
        openPdfPreview(reportId);
      }
    });
  }

  // ============================================================
  // PDF PREVIEW MODAL
  // ============================================================
  function openPdfPreview(reportId) {
    reportId = reportId || 'RF9028';
    let modal = document.querySelector('.modal-pdf-preview');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cmdk-overlay modal-pdf-preview';
      modal.innerHTML = `
        <div class="pdf-preview-modal" role="dialog" aria-label="PDF preview">
          <div class="pdf-preview-toolbar">
            <div class="pdf-preview-title">
              <span class="pdf-icon-tile">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </span>
              <div class="doc-meta">
                <span class="doc-name">Inspection Report</span>
                <span class="doc-id" data-doc-id></span>
              </div>
            </div>
            <div class="pdf-preview-actions">
              <span class="pdf-zoom">
                <button data-pdf-zoom="-" aria-label="Zoom out">−</button>
                <span class="pdf-zoom-label">100%</span>
                <button data-pdf-zoom="+" aria-label="Zoom in">+</button>
              </span>
              <button class="btn-ghost-dark" data-pdf-action="print" title="Print">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Print
              </button>
              <button class="btn-pdf-download" data-pdf-action="download">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
              </button>
              <button class="modal-close" aria-label="Close">×</button>
            </div>
          </div>
          <div class="pdf-preview-iframe-wrap">
            <iframe class="pdf-preview-iframe" src="" title="Report preview"></iframe>
          </div>
          <div class="pdf-preview-statusbar">
            <span><span class="status-dot"></span>HTML preview · 4 pages · A4 portrait · ~0.6 MB rendered (vs 17.9 MB legacy)</span>
            <span>Press <kbd style="font-family:inherit;background:rgba(0,0,0,0.06);padding:1px 5px;border-radius:3px;">⌘ P</kbd> to print &middot; Save as PDF in browser dialog</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      let zoomLevel = 100;
      const iframe = modal.querySelector('.pdf-preview-iframe');
      const zoomLabel = modal.querySelector('.pdf-zoom-label');

      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('.modal-close')) {
          modal.classList.remove('show');
          return;
        }
        const zoomBtn = e.target.closest('[data-pdf-zoom]');
        if (zoomBtn) {
          const dir = zoomBtn.getAttribute('data-pdf-zoom');
          if (dir === '+') zoomLevel = Math.min(200, zoomLevel + 10);
          else zoomLevel = Math.max(50, zoomLevel - 10);
          iframe.style.transform = `scale(${zoomLevel / 100})`;
          iframe.style.height = `${100 * (100 / zoomLevel)}%`;
          zoomLabel.textContent = `${zoomLevel}%`;
          return;
        }
        const action = e.target.closest('[data-pdf-action]');
        if (action) {
          const which = action.getAttribute('data-pdf-action');
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            if (which === 'download') toast('Use "Save as PDF" in the print dialog to download');
          } catch (err) {
            window.open(iframe.src, '_blank');
          }
        }
      });
    }
    modal.querySelector('[data-doc-id]').textContent = reportId + ' · 4 pages · A4';
    const iframe = modal.querySelector('.pdf-preview-iframe');
    iframe.src = `report-${reportId.toLowerCase()}.html`;
    modal.classList.add('show');
  }
  window.openPdfPreview = openPdfPreview;

  // ============================================================
  // SIDEBAR DISABLED ITEMS ("Coming soon")
  // ============================================================
  function initDisabledNav() {
    document.addEventListener('click', e => {
      const a = e.target.closest('.sidebar-nav a.disabled, .sidebar-nav a[data-disabled]');
      if (!a) return;
      e.preventDefault();
      toast('Coming soon', { duration: 1800 });
    });
  }

  // ============================================================
  // STAT CARD CLICK-THROUGH (dashboard)
  // ============================================================
  function initStatCards() {
    document.querySelectorAll('.stat-card[data-href]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = card.getAttribute('data-href');
      });
    });
  }

  // ============================================================
  // QUERY-PARAM FILTER (used by dashboard stat-card → 02 deep links)
  // ============================================================
  function applyQueryFilter() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (!status) return;
    const tbody = document.querySelector('.card tbody');
    if (!tbody) return;
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(status.toLowerCase()) ? '' : 'none';
    });
    toast(`Filtered by status: ${status}`, { duration: 2200 });
  }

  // ============================================================
  // HELPERS
  // ============================================================
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  // ============================================================
  // EQUIPMENT MAP DATA (MLNG Tanjung Kidurong, Bintulu)
  // ============================================================
  // MLNG Complex, Tanjung Kidurong, Bintulu, Sarawak (actual plant location)
  const PLANT_CENTER = [3.1762, 113.0497];
  const PLANT_ZOOM = 17;
  const SAT_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const SAT_ATTR = 'Esri, Maxar, Earthstar Geographics, and the GIS User Community';

  const EQUIPMENT_POSITIONS = [
    { id: '7V-95543',         desc: 'Secured Air Supply Vessel',         type: 'Pressure Vessel',     plant: 'MLNG TIGA', system: '95500', status: 'just-inspected', statusLabel: 'Just Inspected', badgeClass: 'badge-info',    lastInspection: '14 Apr 2026', photo: 'photos/inspection-thumb1.jpg', lat: 3.17645, lng: 113.04985 },
    { id: 'E-4642-ACI1',      desc: 'Heat Exchanger — Lube Oil Cooler',  type: 'Heat Exchanger',      plant: 'MLNG',      system: '4600',  status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '12 Apr 2026', photo: 'photos/inspection-thumb2.jpg', lat: 3.17582, lng: 113.05050 },
    { id: 'E-4652-ACI1',      desc: 'Heat Exchanger — Coolant Loop',     type: 'Heat Exchanger',      plant: 'MLNG',      system: '4600',  status: 'due',            statusLabel: 'Due Soon',        badgeClass: 'badge-warning', lastInspection: '09 Apr 2026', photo: 'photos/inspection-thumb3.jpg', lat: 3.17712, lng: 113.04875 },
    { id: 'E-1051B-AR1',      desc: 'Unfired Pressure Vessel',           type: 'Pressure Vessel',     plant: 'MLNG TIGA', system: '1000',  status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '08 Apr 2026', photo: 'photos/inspection-thumb4.jpg', lat: 3.17556, lng: 113.04890 },
    { id: 'E-1053B-II-ACI1',  desc: 'Air Cooled Exchanger — Fin Bank',   type: 'Air Cooled Exchanger',plant: 'MLNG TIGA', system: '1000',  status: 'due',            statusLabel: 'Due Soon',        badgeClass: 'badge-warning', lastInspection: '07 Apr 2026', photo: 'photos/inspection-thumb1.jpg', lat: 3.17602, lng: 113.05148 },
    { id: '6"-G48005-NGB1',   desc: 'Piping — Natural Gas Boil-off',     type: 'Piping',              plant: 'MLNG',      system: '4800',  status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '05 Apr 2026', photo: 'photos/inspection-thumb2.jpg', lat: 3.17784, lng: 113.05012 },
    { id: 'LNG-TANK-3105',    desc: 'LNG Storage Tank — Common Rundown', type: 'Storage Tank',        plant: 'MLNG TIGA', system: '3100',  status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '02 Apr 2026', photo: 'photos/inspection-thumb3.jpg', lat: 3.17498, lng: 113.04942 },
    { id: '7E-95210',         desc: 'BOG Compressor Aftercooler',        type: 'Heat Exchanger',      plant: 'MLNG TIGA', system: '95200', status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '28 Mar 2026', photo: 'photos/inspection-thumb4.jpg', lat: 3.17680, lng: 113.05095 },
    { id: '8V-32109',         desc: 'Knock-Out Drum — Inlet Separator',  type: 'Pressure Vessel',     plant: 'MLNG DUA',  system: '3200',  status: 'due',            statusLabel: 'Due Soon',        badgeClass: 'badge-warning', lastInspection: '22 Mar 2026', photo: 'photos/inspection-thumb1.jpg', lat: 3.17820, lng: 113.04918 },
    { id: '10"-B12420-CAB2',  desc: 'Piping — Cold Acid Gas Bypass',     type: 'Piping',              plant: 'MLNG TIGA', system: '1200',  status: 'overdue',        statusLabel: 'Overdue',         badgeClass: 'badge-danger',  lastInspection: '15 Mar 2026', photo: 'photos/inspection-thumb2.jpg', lat: 3.17545, lng: 113.05095 },
    { id: '9P-77833',         desc: 'Centrifugal Pump — Sea Water',      type: 'Pump Casing',         plant: 'RI5',       system: '7800',  status: 'current',        statusLabel: 'Current',         badgeClass: 'badge-success', lastInspection: '10 Mar 2026', photo: 'photos/inspection-thumb3.jpg', lat: 3.17889, lng: 113.04832 },
    { id: '7T-95128',         desc: 'Surge Vessel — Compressor Disch',   type: 'Surge Vessel',        plant: 'MLNG TIGA', system: '95100', status: 'overdue',        statusLabel: 'Overdue',         badgeClass: 'badge-danger',  lastInspection: '04 Mar 2026', photo: 'photos/inspection-thumb4.jpg', lat: 3.17452, lng: 113.04802 },
  ];

  // ============================================================
  // EQUIPMENT MAP (08-equipment.html)
  // ============================================================
  let equipmentMap = null;
  function initEquipmentMap() {
    const el = document.getElementById('equipment-map');
    if (!el || typeof L === 'undefined' || equipmentMap) return;
    equipmentMap = L.map(el, {
      center: PLANT_CENTER, zoom: PLANT_ZOOM, zoomControl: true
    });
    L.tileLayer(SAT_TILE, { attribution: SAT_ATTR, maxZoom: 19 }).addTo(equipmentMap);

    EQUIPMENT_POSITIONS.forEach(eq => {
      const icon = L.divIcon({
        className: 'eq-pin',
        html: `<div class="pin pin-${eq.status}"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const marker = L.marker([eq.lat, eq.lng], { icon, title: eq.id }).addTo(equipmentMap);
      marker.bindPopup(`
        <div class="eq-popup">
          <div class="eq-popup-photo" style="background-image:url('${eq.photo}')"></div>
          <div class="eq-popup-body">
            <div class="eq-popup-head">
              <span class="tag-id">${escapeHtml(eq.id)}</span>
              <span class="badge ${eq.badgeClass}"><span class="badge-dot"></span>${escapeHtml(eq.statusLabel)}</span>
            </div>
            <div class="eq-popup-desc">${escapeHtml(eq.desc)}</div>
            <div class="eq-popup-meta">${escapeHtml(eq.plant)} · System ${escapeHtml(eq.system)} · Last ${escapeHtml(eq.lastInspection)}</div>
            <a href="02-report-list.html" class="btn btn-primary btn-sm">View reports</a>
          </div>
        </div>
      `, { maxWidth: 320, minWidth: 280 });
    });

    setTimeout(() => equipmentMap.invalidateSize(), 100);
  }

  // ============================================================
  // REPORT PIN MAP (03-create-report-details.html)
  // ============================================================
  let reportPinMap = null;
  function initReportPinMap() {
    const el = document.getElementById('report-pin-map');
    if (!el || typeof L === 'undefined' || reportPinMap) return;
    const initial = [3.17645, 113.04985]; // 7V-95543 location at MLNG TIGA
    reportPinMap = L.map(el, { center: initial, zoom: 18, zoomControl: true });
    L.tileLayer(SAT_TILE, { attribution: SAT_ATTR, maxZoom: 19 }).addTo(reportPinMap);

    const icon = L.divIcon({
      className: 'eq-pin',
      html: `<div class="pin pin-current pulse"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    const marker = L.marker(initial, { icon, draggable: true }).addTo(reportPinMap);

    function setCoords(latlng) {
      const lat = document.getElementById('pin-lat');
      const lng = document.getElementById('pin-lng');
      if (lat) lat.value = latlng.lat.toFixed(5);
      if (lng) lng.value = latlng.lng.toFixed(5);
    }

    marker.on('dragend', e => { setCoords(e.target.getLatLng()); toast('Location updated'); });
    reportPinMap.on('click', e => {
      marker.setLatLng(e.latlng);
      setCoords(e.latlng);
      toast('Location pinned');
    });

    setTimeout(() => reportPinMap.invalidateSize(), 100);
  }

  // ============================================================
  // VIEW TABS (Map ↔ Table on equipment page)
  // ============================================================
  function initViewTabs() {
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const card = tab.closest('.card');
        if (!card) return;
        const which = tab.getAttribute('data-view-tab');
        card.querySelectorAll('.view-tab').forEach(t => t.classList.toggle('active', t === tab));
        card.querySelectorAll('.view-pane').forEach(p => {
          p.classList.toggle('hidden', p.getAttribute('data-view-pane') !== which);
        });
        // Re-render map after tab switch
        if (which === 'map' && equipmentMap) setTimeout(() => equipmentMap.invalidateSize(), 50);
      });
    });
  }

  // ============================================================
  // THEME TOGGLE (sun ↔ moon)
  // ============================================================
  const SUN_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  const MOON_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function initThemeToggle() {
    const navRight = document.querySelector('.navbar-right');
    if (!navRight || navRight.querySelector('.theme-toggle')) return;

    function currentTheme() {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }

    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.title = 'Toggle dark mode';

    function render() {
      btn.innerHTML = currentTheme() === 'dark' ? SUN_ICON : MOON_ICON;
    }
    render();

    // Insert after connectivity badge if it exists, else at start
    const conn = navRight.querySelector('.connectivity-badge');
    if (conn) conn.after(btn);
    else navRight.insertBefore(btn, navRight.firstChild);

    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mavis-theme', next);
      render();
      // Re-render maps after theme switch
      if (equipmentMap) setTimeout(() => equipmentMap.invalidateSize(), 100);
      if (reportPinMap) setTimeout(() => reportPinMap.invalidateSize(), 100);
      toast(next === 'dark' ? 'Dark mode' : 'Light mode', { duration: 1500 });
    });

    // React to OS-level color-scheme changes (only if user hasn't manually chosen)
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener && mq.addEventListener('change', e => {
        if (localStorage.getItem('mavis-theme')) return; // user has explicit pref
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        render();
      });
    }
  }

  // ============================================================
  // CONNECTIVITY (online / offline / syncing) — header toggle + banner
  // ============================================================
  const STATE_KEY = 'mavis-conn-state';
  const QUEUE_KEY = 'mavis-conn-queue';

  function initConnectivityToggle() {
    const navRight = document.querySelector('.navbar-right');
    if (!navRight || navRight.querySelector('.connectivity-badge')) return;

    let state = localStorage.getItem(STATE_KEY) || 'online';
    let queue = parseInt(localStorage.getItem(QUEUE_KEY) || '0', 10);
    if (state === 'syncing') state = 'online'; // never restore mid-sync

    const badge = document.createElement('button');
    badge.className = 'connectivity-badge ' + state;
    badge.setAttribute('aria-label', 'Toggle connectivity');
    badge.title = 'Click to toggle online/offline (demo)';
    badge.innerHTML = `<span class="conn-dot"></span><span class="conn-text">Online</span>`;
    navRight.insertBefore(badge, navRight.firstChild);

    const banner = document.createElement('div');
    banner.className = 'sync-banner';
    document.body.appendChild(banner);

    function render() {
      badge.classList.remove('online', 'offline', 'syncing');
      badge.classList.add(state);
      const text = badge.querySelector('.conn-text');
      if (state === 'online') {
        text.textContent = 'Online';
        banner.classList.remove('show', 'syncing', 'synced');
        document.body.classList.remove('has-sync-banner');
      } else if (state === 'offline') {
        text.textContent = queue > 0 ? `Offline · ${queue}` : 'Offline';
        banner.classList.remove('syncing', 'synced');
        banner.classList.add('show');
        banner.innerHTML = queue > 0
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l22 22"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> Working offline · ${queue} item${queue !== 1 ? 's' : ''} queued · will sync automatically when reconnected`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l22 22"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> Working offline · changes save locally`;
        document.body.classList.add('has-sync-banner');
      } else if (state === 'syncing') {
        text.textContent = `Syncing ${queue}…`;
        banner.classList.remove('synced');
        banner.classList.add('show', 'syncing');
        banner.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Reconnecting · syncing ${queue} queued item${queue !== 1 ? 's' : ''} to server…`;
        document.body.classList.add('has-sync-banner');
      }
    }
    render();

    function setState(s) {
      state = s;
      if (s !== 'syncing') localStorage.setItem(STATE_KEY, state);
      render();
    }
    function setQueue(q) {
      queue = Math.max(0, q);
      localStorage.setItem(QUEUE_KEY, String(queue));
      render();
    }

    window.__mavisConn = {
      isOffline: () => state === 'offline',
      enqueue: (label) => {
        setQueue(queue + 1);
        toast(`Saved offline · "${label}" will sync when reconnected`, { variant: 'warning', duration: 3500 });
      },
    };

    badge.addEventListener('click', () => {
      if (state === 'syncing') return;
      if (state === 'online') {
        setState('offline');
        toast('Now working offline · changes save locally', { variant: 'warning' });
      } else {
        // Going back online
        if (queue > 0) {
          setState('syncing');
          const target = queue;
          let remaining = queue;
          const tick = setInterval(() => {
            remaining--;
            setQueue(remaining);
            if (remaining <= 0) {
              clearInterval(tick);
              banner.classList.remove('syncing');
              banner.classList.add('synced');
              banner.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> All ${target} items synced · you're back online`;
              setTimeout(() => { setState('online'); setQueue(0); }, 1800);
            }
          }, 380);
          toast(`Reconnecting · syncing ${target} item${target !== 1 ? 's' : ''}…`);
        } else {
          setState('online');
          toast('Back online · all up to date');
        }
      }
    });

    // Intercept submit/save actions in capture phase when offline
    document.addEventListener('click', e => {
      if (state !== 'offline') return;
      const btn = e.target.closest('[data-action="submit-approval"], [data-action="save-draft"]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const action = btn.getAttribute('data-action');
      const label = action === 'submit-approval' ? 'Submission RF9030' : 'Draft save';
      window.__mavisConn.enqueue(label);
      const href = btn.getAttribute('data-href');
      if (href) setTimeout(() => { window.location.href = href; }, 800);
    }, true);
  }

  // ============================================================
  // SUPPORT CHAT WIDGET (floating FAB + panel)
  // ============================================================
  function initChatWidget() {
    if (document.querySelector('.chat-fab')) return;

    const fab = document.createElement('button');
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', 'Open support chat');
    fab.innerHTML = `<span class="pulse-ring"></span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="fab-badge">3</span>`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          </span>
          <div>
            <div class="chat-title">MAVIS Support</div>
            <div class="chat-status"><span class="status-dot"></span>AI helpdesk · live agent online</div>
          </div>
        </div>
        <button class="chat-close" aria-label="Close">×</button>
      </div>
      <div class="chat-tabs">
        <button class="chat-tab active" data-chat-tab="chat">Chat</button>
        <button class="chat-tab" data-chat-tab="tickets">My Tickets · 3</button>
      </div>
      <div class="chat-body" data-chat-body>
        <div class="chat-pane" data-chat-pane="chat">
          <div class="chat-msg ai">
            <div class="chat-bubble">Hi Harri — I'm the MAVIS AI helpdesk. I can help troubleshoot, walk you through features, or escalate to a live engineer. What's on your mind?</div>
            <div class="chat-time">just now · AI</div>
          </div>
          <div class="chat-suggestions">
            <button class="chat-suggest">How do I add a finding?</button>
            <button class="chat-suggest">PDF export not working</button>
            <button class="chat-suggest">How to assign a reviewer?</button>
            <button class="chat-suggest" data-live-agent>Talk to a live agent</button>
            <button class="chat-suggest" data-feature-request>Submit a feature request</button>
          </div>
        </div>
        <div class="chat-pane hidden" data-chat-pane="tickets">
          <div class="chat-tickets-list">
            <div class="chat-ticket-card" data-href="12-support.html">
              <div class="chat-ticket-head">
                <span class="chat-ticket-id">SP-1284</span>
                <span class="badge badge-warning"><span class="badge-dot"></span>Open</span>
              </div>
              <div class="chat-ticket-title">Photo annotation tool not saving overlays consistently</div>
              <div class="chat-ticket-meta">Bug · Opened 2 days ago · 1 reply from support</div>
            </div>
            <div class="chat-ticket-card" data-href="12-support.html">
              <div class="chat-ticket-head">
                <span class="chat-ticket-id">SP-1276</span>
                <span class="badge badge-info"><span class="badge-dot"></span>In Progress</span>
              </div>
              <div class="chat-ticket-title">Add bulk-export to Reports list</div>
              <div class="chat-ticket-meta">Feature · Opened 5 days ago · 3 replies</div>
            </div>
            <div class="chat-ticket-card" data-href="12-support.html">
              <div class="chat-ticket-head">
                <span class="chat-ticket-id">SP-1268</span>
                <span class="badge badge-success"><span class="badge-dot"></span>Resolved</span>
              </div>
              <div class="chat-ticket-title">Equipment search returns empty for piping IDs</div>
              <div class="chat-ticket-meta">Bug · Resolved 3 days ago</div>
            </div>
          </div>
          <button class="chat-new-ticket-btn" data-new-ticket>+ Submit a new ticket</button>
          <p class="chat-tickets-empty-cta"><a href="12-support.html">View all tickets →</a></p>
        </div>
      </div>
      <div class="chat-input-bar" data-chat-input-bar>
        <input type="text" placeholder="Type a message..." aria-label="Message">
        <button class="chat-send" aria-label="Send">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    function open() { panel.classList.add('open'); fab.classList.add('hidden'); }
    function close() { panel.classList.remove('open'); fab.classList.remove('hidden'); }

    fab.addEventListener('click', open);
    panel.querySelector('.chat-close').addEventListener('click', close);

    // Tabs
    panel.querySelectorAll('.chat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const which = tab.getAttribute('data-chat-tab');
        panel.querySelectorAll('.chat-tab').forEach(t => t.classList.toggle('active', t === tab));
        panel.querySelectorAll('.chat-pane').forEach(p => p.classList.toggle('hidden', p.getAttribute('data-chat-pane') !== which));
        const inputBar = panel.querySelector('[data-chat-input-bar]');
        inputBar.style.display = which === 'chat' ? 'flex' : 'none';
      });
    });

    // Suggestions
    panel.querySelectorAll('.chat-suggest').forEach(s => {
      s.addEventListener('click', () => {
        const text = s.textContent.trim();
        sendUserMessage(text);
        if (s.hasAttribute('data-live-agent')) {
          setTimeout(() => addAiMessage("Connecting you to a live engineer… You're #2 in queue, average wait ~2 min. Mohd. Hairi (L2 Support) is reviewing your recent activity now.", { agent: false, system: true }), 900);
        } else if (s.hasAttribute('data-feature-request')) {
          setTimeout(() => { openNewTicketModal('Feature Request'); addAiMessage("Opening the feature-request form for you. I've pre-filled type as 'Feature Request' — just describe what you'd like."); }, 600);
        } else {
          setTimeout(() => addAiMessage(pickResponse(text)), 900);
        }
      });
    });

    // Ticket cards
    panel.querySelectorAll('.chat-ticket-card').forEach(c => {
      c.addEventListener('click', () => {
        const href = c.getAttribute('data-href');
        if (href) window.location.href = href;
      });
    });

    // New ticket
    panel.querySelector('[data-new-ticket]').addEventListener('click', () => openNewTicketModal());

    // Send
    const input = panel.querySelector('input');
    const sendBtn = panel.querySelector('.chat-send');
    function send() {
      const text = input.value.trim();
      if (!text) return;
      sendUserMessage(text);
      input.value = '';
      setTimeout(() => addAiMessage(pickResponse(text)), 900);
    }
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });

    function sendUserMessage(text) {
      const body = panel.querySelector('[data-chat-pane="chat"]');
      const suggestions = body.querySelector('.chat-suggestions');
      if (suggestions) suggestions.remove();
      const msg = document.createElement('div');
      msg.className = 'chat-msg user';
      msg.innerHTML = `<div class="chat-bubble"></div><div class="chat-time">just now</div>`;
      msg.querySelector('.chat-bubble').textContent = text;
      body.appendChild(msg);
      scrollChat();
      showTyping();
    }

    function showTyping() {
      const body = panel.querySelector('[data-chat-pane="chat"]');
      body.querySelectorAll('.chat-typing').forEach(t => t.remove());
      const t = document.createElement('div');
      t.className = 'chat-msg ai chat-typing';
      t.innerHTML = `<div class="chat-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
      body.appendChild(t);
      scrollChat();
    }

    function addAiMessage(text, opts = {}) {
      const body = panel.querySelector('[data-chat-pane="chat"]');
      body.querySelectorAll('.chat-typing').forEach(t => t.remove());
      const msg = document.createElement('div');
      msg.className = 'chat-msg ai';
      const label = opts.system ? 'System' : (opts.agent ? 'Mohd. Hairi · L2' : 'AI');
      msg.innerHTML = `<div class="chat-bubble"></div><div class="chat-time">just now · ${label}</div>`;
      msg.querySelector('.chat-bubble').textContent = text;
      body.appendChild(msg);
      scrollChat();
    }

    function scrollChat() {
      const body = panel.querySelector('[data-chat-body]');
      body.scrollTop = body.scrollHeight;
    }

    function pickResponse(input) {
      const i = input.toLowerCase();
      if (/finding|recommendation/.test(i)) return "To add a finding: open a report, go to step 2 (Findings & Recommendations), and click '+ Add Another Finding' at the bottom of the page. Each finding needs a component, photo, rust grade, and priority. Want me to walk you through it?";
      if (/pdf|export/.test(i)) return "PDF generation goes through your browser's print dialog. From a report detail page, click the PDF button in the top right. If it's stuck, try a hard refresh (⌘ Shift R). If that doesn't fix it, type 'live agent' and I'll escalate this as a bug.";
      if (/reviewer|approver|assign|route/.test(i)) return "Reviewer and approver routing is automatic based on plant + role. To override: at step 3 (Review & Submit), click 'Edit' next to Approver. Admin can configure the routing rules in Settings → Workflow.";
      if (/ticket|feature|bug|request/.test(i)) return "Sure — I can help. Click the Tickets tab above (top of this panel) and hit 'Submit a new ticket'. Or tell me the issue here and I'll pre-fill it.";
      if (/live|agent|human/.test(i)) return "I'll route you to a live engineer. Mohd. Hairi (L2 Support) is online — wait time is ~2 min. Want me to connect you now?";
      if (/offline|sync/.test(i)) return "MAVIS works offline by default. Drafts are saved locally and auto-sync when you're back online. Look for the connectivity badge in the top-right of the navbar — orange means there's pending sync.";
      if (/equipment|asset/.test(i)) return "Equipment data lives in the registry (sidebar → Equipment). You can search by tag ID, plant, system, or area. To register new equipment, an admin needs to approve it — open a ticket if you need expedited registration.";
      if (/photo|image|annotat/.test(i)) return "For photo annotation: tap a photo in step 2, then use the toolbar in the top-right of the preview to add rectangles, circles, arrows, or text. All annotations save with the report automatically.";
      if (/audit|log/.test(i)) return "Every action is logged automatically. Admins can view the full trail at sidebar → System → Audit Log. You can filter by user, role, action type, or date range.";
      if (/insight|ai|pattern/.test(i)) return "AI Insights run a scan daily across all reports and detect patterns: corrosion hotspots, predictive failures, duplicate findings, and positive trends. Find them in sidebar → Insights, or hit ⌘K and type /insights.";
      return "Got it. Let me check on that — I'm pulling the relevant docs and recent tickets. If this needs a human eye, type 'live agent' and I'll escalate.";
    }

    panel.openExternally = open; // exposed for slash command
  }

  // ============================================================
  // NEW TICKET MODAL
  // ============================================================
  function openNewTicketModal(presetType) {
    let modal = document.querySelector('.modal-new-ticket');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cmdk-overlay modal-new-ticket';
      modal.innerHTML = `
        <div class="modal-card" style="max-width:520px;" role="dialog" aria-label="Submit a new ticket">
          <div class="modal-header">
            <h3>Submit a new ticket</h3>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin-bottom:14px;">
              <label class="form-label">Title <span class="required">*</span></label>
              <input type="text" class="form-control" placeholder="Brief description of your issue or request" data-ticket-title>
            </div>
            <div class="form-row form-row-2" style="margin-bottom:14px;">
              <div class="form-group">
                <label class="form-label">Type</label>
                <select class="form-control" data-ticket-type>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Question</option>
                  <option>Account Issue</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select class="form-control">
                  <option>Low</option>
                  <option selected>Normal</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom:14px;">
              <label class="form-label">Description</label>
              <textarea class="form-control" style="min-height:100px" placeholder="What's happening? Include any error messages, screenshots, or steps to reproduce."></textarea>
            </div>
            <div class="form-group" style="margin-bottom:6px;">
              <label class="form-label">Attachment</label>
              <div style="display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text-tertiary);">
                <button class="btn btn-ghost btn-sm" type="button" data-toast="Choose a file (mock)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.8l-8.58 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>Attach screenshot</button>
                <span>Optional · max 10 MB</span>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;padding:14px 24px 18px;border-top:1px solid var(--divider);background:var(--surface-secondary);">
            <button class="btn btn-ghost btn-sm modal-close">Cancel</button>
            <button class="btn btn-primary btn-sm" data-submit-ticket>Submit ticket</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('.modal-close')) modal.classList.remove('show');
        if (e.target.closest('[data-submit-ticket]')) {
          const title = modal.querySelector('[data-ticket-title]').value.trim() || 'Untitled ticket';
          modal.classList.remove('show');
          toast(`Ticket SP-1285 submitted — "${title.slice(0, 40)}${title.length > 40 ? '…' : ''}"`);
        }
      });
    }
    if (presetType) {
      const sel = modal.querySelector('[data-ticket-type]');
      if (sel) {
        for (const opt of sel.options) if (opt.text === presetType) { opt.selected = true; break; }
      }
    }
    modal.classList.add('show');
    setTimeout(() => modal.querySelector('[data-ticket-title]')?.focus(), 50);
  }

  // ============================================================
  // MOBILE NAV (hamburger drawer)
  // ============================================================
  function initMobileNav() {
    const navbar = document.querySelector('.navbar');
    const sidebar = document.querySelector('.sidebar');
    if (!navbar || !sidebar) return;

    // Inject hamburger button at start of navbar
    let btn = navbar.querySelector('.navbar-mobile-menu');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'navbar-mobile-menu';
      btn.setAttribute('aria-label', 'Toggle menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = `<span class="menu-icon"><span></span><span></span><span></span></span>`;
      navbar.insertBefore(btn, navbar.firstChild);
    }

    // Inject backdrop
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    function open() {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    }
    function close() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    }
    function toggle() {
      sidebar.classList.contains('open') ? close() : open();
    }

    btn.addEventListener('click', toggle);
    backdrop.addEventListener('click', close);

    // Close on nav link click (so navigating works smoothly)
    sidebar.querySelectorAll('a:not(.disabled)').forEach(a => {
      a.addEventListener('click', () => { setTimeout(close, 50); });
    });

    // Close on resize back to desktop
    let prevDesktop = window.innerWidth > 768;
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth > 768;
      if (isDesktop && !prevDesktop) close();
      prevDesktop = isDesktop;
      // Re-render maps if visible
      if (equipmentMap) setTimeout(() => equipmentMap.invalidateSize(), 50);
      if (reportPinMap) setTimeout(() => reportPinMap.invalidateSize(), 50);
    });

    // Close on Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) close();
    });
  }

  // ============================================================
  // AI CHAT (insights page) — free-form chat that answers questions
  // about reports, equipment, patterns, workload, etc.
  // ============================================================
  function escapeHtmlChat(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // Convert markdown-ish bold (**x**) and bullets/newlines to HTML.
  function renderChatMarkdown(text) {
    const escaped = escapeHtmlChat(text);
    return escaped
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/, '<p>$1</p>');
  }

  function renderChatSources(sources) {
    if (!sources || !sources.length) return '';
    const html = sources.map(s => `
      <a class="ai-chat-source" href="${escapeHtmlChat(s.href || '#')}">
        <span class="ai-chat-source-icon">${escapeHtmlChat(s.icon || '·')}</span>
        <span class="ai-chat-source-body">
          <span class="ai-chat-source-label">${escapeHtmlChat(s.label)}</span>
          <span class="ai-chat-source-sub">${escapeHtmlChat(s.sub || '')}</span>
        </span>
      </a>`).join('');
    return `<div class="ai-chat-sources-label">Sources</div><div class="ai-chat-sources">${html}</div>`;
  }

  function renderChatFollowUps(followUps) {
    if (!followUps || !followUps.length) return '';
    const html = followUps.map(q =>
      `<button class="ai-chat-followup" type="button" data-followup="${escapeHtmlChat(q)}">${escapeHtmlChat(q)}</button>`
    ).join('');
    return `<div class="ai-chat-followups">${html}</div>`;
  }

  function initAiChat() {
    const panel = document.querySelector('.ai-chat-panel');
    if (!panel) return;

    const messagesEl = panel.querySelector('.ai-chat-messages');
    const empty = panel.querySelector('.ai-chat-empty');
    const form = panel.querySelector('.ai-chat-form');
    const textarea = panel.querySelector('.ai-chat-textarea');
    const sendBtn = panel.querySelector('.ai-chat-send');

    if (!messagesEl || !form || !textarea) return;

    let busy = false;

    function autoGrow() {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }
    textarea.addEventListener('input', autoGrow);

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendUser(text) {
      if (empty) empty.style.display = 'none';
      const el = document.createElement('div');
      el.className = 'ai-chat-msg user';
      el.innerHTML = `
        <div class="ai-chat-bubble">${escapeHtmlChat(text)}</div>
        <div class="ai-chat-avatar user">HA</div>`;
      messagesEl.appendChild(el);
      scrollToBottom();
    }

    function appendAiTyping() {
      const el = document.createElement('div');
      el.className = 'ai-chat-msg ai';
      el.innerHTML = `
        <div class="ai-chat-avatar ai">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>
        <div class="ai-chat-bubble">
          <div class="ai-chat-typing"><span></span><span></span><span></span></div>
        </div>`;
      messagesEl.appendChild(el);
      scrollToBottom();
      return el;
    }

    function streamAnswerInto(bubbleEl, answer, onDone) {
      const html = renderChatMarkdown(answer.text);
      // Reveal whole answer at once after a short "thinking" delay so the typing dots feel real,
      // then fade in sources + follow-ups slightly after.
      const delay = 650 + Math.min(answer.text.length * 8, 1400);
      setTimeout(() => {
        bubbleEl.innerHTML = `<div class="ai-chat-text">${html}</div>`;
        scrollToBottom();
        setTimeout(() => {
          const extras = document.createElement('div');
          extras.className = 'ai-chat-extras';
          extras.innerHTML = renderChatSources(answer.sources) + renderChatFollowUps(answer.followUps);
          bubbleEl.appendChild(extras);
          requestAnimationFrame(() => extras.classList.add('show'));
          scrollToBottom();
          if (onDone) onDone();
        }, 240);
      }, delay);
    }

    function ask(question) {
      const text = (question || '').trim();
      if (!text || busy) return;
      busy = true;
      appendUser(text);
      textarea.value = '';
      autoGrow();

      const aiMsg = appendAiTyping();
      const bubble = aiMsg.querySelector('.ai-chat-bubble');
      const answer = findAiAnswer(text);
      streamAnswerInto(bubble, answer, () => { busy = false; });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      ask(textarea.value);
    });
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        ask(textarea.value);
      }
    });

    // Empty-state suggestion clicks + follow-up clicks (event delegation)
    panel.addEventListener('click', e => {
      const fu = e.target.closest('[data-followup]');
      if (fu) {
        const q = fu.getAttribute('data-followup');
        ask(q);
        return;
      }
      const sg = e.target.closest('[data-suggest]');
      if (sg) {
        const q = sg.getAttribute('data-suggest');
        ask(q);
      }
    });

    // ?ask=... seeds the conversation
    const askParam = new URLSearchParams(window.location.search).get('ask');
    if (askParam) {
      setTimeout(() => ask(askParam), 250);
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    injectKbdHint();
    initCommandPalette();
    initToggles();
    initAccordions();
    initTagPills();
    initFilters();
    initPagination();
    initActionButtons();
    initReportTypeCards();
    initTagRemoves();
    initAnnotationToolbar();
    initAddFinding();
    initRemoveFinding();
    initModalTriggers();
    initDisabledNav();
    initStatCards();
    applyQueryFilter();
    initEquipmentMap();
    initReportPinMap();
    initViewTabs();
    initMobileNav();
    initChatWidget();
    initConnectivityToggle();
    initThemeToggle();
    initAiChat();

    // Screenshot helper: ?demo=cmdk|chat|chat-tickets|offline triggers states
    const demoParam = new URLSearchParams(window.location.search).get('demo');
    if (demoParam) {
      setTimeout(() => {
        if (demoParam === 'cmdk') openCmdk();
        else if (demoParam === 'cmdk-search') {
          openCmdk();
          setTimeout(() => {
            const inp = cmdkInput;
            if (inp) {
              inp.value = '/';
              inp.dispatchEvent(new Event('input'));
            }
          }, 200);
        }
        else if (demoParam === 'cmdk-universal') {
          openCmdk();
          setTimeout(() => {
            const inp = cmdkInput;
            if (inp) {
              const q = new URLSearchParams(window.location.search).get('q') || 'mlng';
              inp.value = q;
              inp.dispatchEvent(new Event('input'));
            }
          }, 200);
        }
        else if (demoParam === 'chat') document.querySelector('.chat-fab')?.click();
        else if (demoParam === 'chat-tickets') {
          document.querySelector('.chat-fab')?.click();
          setTimeout(() => document.querySelector('.chat-tab[data-chat-tab="tickets"]')?.click(), 250);
        }
        else if (demoParam === 'offline') {
          if (window.__mavisConn && !window.__mavisConn.isOffline()) {
            document.querySelector('.connectivity-badge')?.click();
            // Queue some items for visible counter
            setTimeout(() => {
              window.__mavisConn.enqueue('Submission RF9030');
              window.__mavisConn.enqueue('Draft RF9031');
              window.__mavisConn.enqueue('Submission RF9032');
            }, 200);
          }
        }
        else if (demoParam === 'ticket-modal') {
          openNewTicketModal();
        }
      }, 350);
    }
  });

})();
