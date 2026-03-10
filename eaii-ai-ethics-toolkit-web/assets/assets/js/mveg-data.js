/* Auto-generated from EAII_MVEG_Minimum_Viable_Ethics_Gate_v1_1.docx */
window.MVEG_DATA = {
  "module": {
    "title": "Minimum Viable Ethics Gate",
    "subtitle": "Trigger Checklist and Stage-Gates for Responsible AI Delivery"
  },
  "meta": {
    "Version": "v1.1 (Draft for internal use)",
    "Date": "8 March 2026",
    "Prepared for": "Strengthening EAII Project - Component 1.4",
    "Prepared by": "[Insert name/title]",
    "Related deliverables": "Baseline Assessment + AI Governance Toolkit packaging"
  },
  "note": "Note: This module provides practical governance controls and templates. It does not replace binding laws, regulations, or official directives.",
  "quick_use": "Quick use: Complete the Trigger Checklist at Gate 0. If any High-Risk trigger is YES, route to Enhanced Review (Lane 3) and complete a full impact assessment (PDIA/DPIA) before data/model work proceeds.",
  "document_map": [
    "This module defines a minimum viable \"ethics gate\" to be applied before proceeding to dataset preparation, model development, deployment, and post-deployment monitoring.",
    "Sections:",
    "Purpose and scope",
    "Roles and decision rights",
    "Risk lanes and escalation logic",
    "Trigger checklist (risk screening)",
    "Stage-gates and required evidence artifacts",
    "Minimum evidence artifacts (starter pack)",
    "Annexes: templates and forms"
  ],
  "purpose_and_scope": [
    "Purpose. To provide a lightweight, repeatable control that screens AI initiatives early, assigns a risk lane, and enforces stage-gate approvals with standard evidence artifacts.",
    "Scope. Applies to EAII-led and EAII-supported AI initiatives across the AI life cycle (plan, build, deploy, monitor). It is designed to be embedded into existing project intake, SDLC steps, and inter-agency delivery workflows.",
    "Key principle. Ethics is operationalized through delivery practices (templates, tests, logs, and approval records) rather than standalone statements of principle."
  ],
  "roles_intro": [
    "The ethics gate works when decision rights are explicit and evidence is recorded. The table below defines minimum roles for EAII and inter-agency adoption."
  ],
  "roles": [
    {
      "role": "Project Lead / Product Owner",
      "responsibilities": "Owns use-case definition, completes Gate 0 intake pack, maintains risk register, ensures required artifacts are produced.",
      "signs_approves": "Gate 0 (Lane 1), Gate 1-3 (with other approvers)"
    },
    {
      "role": "Data Protection Officer (DPO) / Data Privacy Focal",
      "responsibilities": "Advises on lawful basis, privacy-by-design, DPIA/PDIA completion, cross-border safeguards, breach readiness, DSAR/complaints handling.",
      "signs_approves": "Gate 0-3 for Lane 2-3; endorses DPIA/PDIA"
    },
    {
      "role": "Legal / Compliance",
      "responsibilities": "Supports contracting, controller-processor role clarity, data sharing agreements, procurement clauses, and legal risk conditions.",
      "signs_approves": "Gate 0-3 for Lane 2-3 (as applicable)"
    },
    {
      "role": "Ethics & Data Review Board (or interim panel)",
      "responsibilities": "Independent oversight for high-risk use cases; reviews DPIA/PDIA, stakeholder impacts, and mitigation plans; may require redesign.",
      "signs_approves": "Gate 0-3 for Lane 3"
    },
    {
      "role": "Security / IT",
      "responsibilities": "Verifies security-by-design controls, access control, logging, incident response, and vendor security requirements.",
      "signs_approves": "Gate 1-3 where security controls are required"
    }
  ],
  "risk_lanes_intro": [
    "Assign each project to a risk lane at Gate 0 based on the Trigger Checklist. Higher lanes require stronger evidence and independent review.",
    "Decision rule (minimum viable):",
    "If any High-Risk trigger is YES -> Lane 3 (Enhanced Review).",
    "If no High-Risk triggers and two or more Moderate-Risk triggers are YES -> Lane 2 (Standard Review).",
    "If no High-Risk triggers and zero or one Moderate-Risk trigger is YES -> Lane 1 (Fast Track)."
  ],
  "lanes": [
    {
      "lane": "Lane 1 - Fast Track (Low risk)",
      "characteristics": "No personal data or minimal non-sensitive data; outputs are advisory; human makes the final decision; limited scale.",
      "minimum_review": "Project Lead + DPO/Legal quick check",
      "minimum_evidence": "Use-case brief; Trigger Checklist; Decision record"
    },
    {
      "lane": "Lane 2 - Standard Review (Moderate risk)",
      "characteristics": "Personal data may be processed; limited scale; clear human oversight; no automated high-impact decisions.",
      "minimum_review": "Project Lead + DPO + Legal (as needed)",
      "minimum_evidence": "Lane 1 evidence + DPIA/PDIA-lite; Dataset Card; Evaluation plan"
    },
    {
      "lane": "Lane 3 - Enhanced Review (High risk)",
      "characteristics": "Sensitive data, large-scale processing, automated decisions, cross-border transfer, health/biometrics/minors, or other high-impact contexts.",
      "minimum_review": "Ethics/Data Review Board + DPO + Legal + Security",
      "minimum_evidence": "Full DPIA/PDIA; Dataset Card; Model Card; Risk register; Monitoring & incident plan; Vendor safeguards (if applicable)"
    }
  ],
  "trigger_intro": [
    "Complete at Gate 0 (Intake & Triage). Record YES/NO and notes. Where a trigger is YES, document mitigation actions and required approvals.",
    "4.1 High-Risk triggers (automatic escalation to Lane 3)",
    "4.2 Moderate-Risk triggers (route to Lane 2 unless combined with High-Risk)"
  ],
  "high_risk_triggers": [
    {
      "id": "HR1",
      "question": "Does the system support or automate decisions affecting rights/entitlements (e.g., benefits, licensing, enforcement, employment, education, healthcare)?"
    },
    {
      "id": "HR2",
      "question": "Will the project process sensitive personal data (e.g., health, genetic, biometric, or other special categories)?"
    },
    {
      "id": "HR3",
      "question": "Are children/minors or other highly vulnerable groups central to the dataset or decision outputs?"
    },
    {
      "id": "HR4",
      "question": "Will there be cross-border transfer of personal data or use of cloud/third-party APIs that may transfer data outside Ethiopia?"
    },
    {
      "id": "HR5",
      "question": "Is this large-scale processing (population-scale datasets, national registries, or broad profiling)?"
    },
    {
      "id": "HR6",
      "question": "Is biometric identification/verification or categorization involved?"
    },
    {
      "id": "HR7",
      "question": "Could failure cause physical harm or critical infrastructure disruption (safety-critical context)?"
    }
  ],
  "moderate_risk_triggers": [
    {
      "id": "MR1",
      "question": "Does the project process any personal data (even if not sensitive)?"
    },
    {
      "id": "MR2",
      "question": "Is data combined from multiple agencies or reused beyond its original purpose (repurposing)?"
    },
    {
      "id": "MR3",
      "question": "Is a third-party vendor model/service used with limited transparency or audit access?"
    },
    {
      "id": "MR4",
      "question": "Does the system generate content for users (risk of harmful, incorrect, or misleading outputs)?"
    },
    {
      "id": "MR5",
      "question": "Will the model adapt in production or be retrained frequently (drift and change-control risk)?"
    }
  ],
  "stage_gates_intro": [
    "Apply the stage-gates below to ensure ethics, privacy, safety, and accountability are embedded throughout the AI life cycle. Gate outcomes must be recorded in the approvals log."
  ],
  "gates_summary": [
    {
      "gate": "Gate 0: Intake & Triage",
      "when": "Before any data access or procurement",
      "outcome": "Approve / Approve with conditions / Reject"
    },
    {
      "gate": "Gate 1: Data Readiness",
      "when": "Before dataset preparation and data sharing",
      "outcome": "Data cleared for use under documented conditions"
    },
    {
      "gate": "Gate 2: Model Readiness",
      "when": "Before training/finetuning and before production-like testing",
      "outcome": "Model cleared for pilot/deployment readiness work"
    },
    {
      "gate": "Gate 3: Deployment Readiness",
      "when": "Before go-live / pilot with real users",
      "outcome": "Authorize deployment with defined monitoring and review dates"
    },
    {
      "gate": "Gate 4: Post-Deployment Review",
      "when": "Periodic (e.g., quarterly) and on major change",
      "outcome": "Continue / modify / suspend / retire decision"
    }
  ],
  "gate_details": {
    "5.1 Gate 0 - Intake & Triage": [
      "When: Before any data access, data request, procurement, or external engagement that involves data processing.",
      "Purpose: Define the use-case and intended users; screen risk; assign lane; set required safeguards and conditions before work proceeds.",
      "Minimum required evidence:",
      "Use-case brief (purpose, users, decision context, beneficiaries, constraints).",
      "Completed Trigger Checklist (Section 4 / Annex A).",
      "Ethics Gate Decision Record (Annex B) including lane assignment and conditions.",
      "Initial Risk Register (risks, owners, planned controls).",
      "Minimum approvers: Lane 1: Project Lead + DPO/Legal quick check; Lane 2: Project Lead + DPO (+ Legal as needed); Lane 3: Ethics/Data Review Board + DPO + Legal (+ Security as needed).",
      "Output: Approve / Approve with conditions / Reject (or request redesign)."
    ],
    "5.2 Gate 1 - Data Readiness": [
      "When: Before dataset preparation, labeling, linkage, data sharing, or onboarding data into EAII environments.",
      "Purpose: Ensure lawful basis, clear purpose, minimization, security controls, and enforceable data-sharing safeguards.",
      "Minimum required evidence:",
      "Data inventory (sources, categories, sensitivity, retention, access roles).",
      "Dataset Card / Datasheet (purpose, provenance, representativeness, rights, limitations).",
      "Impact assessment: DPIA/PDIA (lite for Lane 2; full for Lane 3).",
      "Data sharing agreement / contract (where data is shared or jointly processed).",
      "Cross-border transfer assessment (if applicable) and safeguards (contractual + technical).",
      "Minimum approvers: Project Lead + DPO + Security (+ Legal for sharing/contracting; Board for Lane 3 where applicable).",
      "Output: Data cleared for use under documented conditions (or blocked pending controls)."
    ],
    "5.3 Gate 2 - Model Readiness": [
      "When: Before training/finetuning and before production-like testing with real or representative data.",
      "Purpose: Confirm evaluation plan (performance, fairness, robustness, security), governance artifacts, and human oversight arrangements.",
      "Minimum required evidence:",
      "Evaluation plan (metrics, test sets, bias/fairness checks, robustness/security tests).",
      "Draft Model Card (intended use, limitations, evaluation approach).",
      "Updated Risk Register with mitigations implemented or planned.",
      "Human oversight plan (who reviews, what they see, fallback and escalation).",
      "Privacy and security review (e.g., leakage risks, access controls, audit logs).",
      "Minimum approvers: Project Lead + DPO + relevant technical lead (+ Board for Lane 3).",
      "Output: Model cleared for pilot/deployment readiness work (or blocked pending mitigations)."
    ],
    "5.4 Gate 3 - Deployment Readiness": [
      "When: Before go-live or piloting with real users, including integration into live decision workflows.",
      "Purpose: Verify transparency measures, monitoring, incident readiness, and operational accountability.",
      "Minimum required evidence:",
      "Final Model Card and user guidance/notice (as applicable).",
      "Monitoring plan (drift, performance, bias, user feedback, incident thresholds).",
      "Incident and breach response playbook (including reporting roles and timelines).",
      "Operational logs templates: DSAR/complaints log, breach register, approvals register, cross-border log (if applicable).",
      "Minimum approvers: Project Lead + DPO + Security (+ Board for Lane 3).",
      "Output: Authorize deployment with defined monitoring cadence and review dates (or block deployment)."
    ],
    "5.5 Gate 4 - Post-Deployment Review": [
      "When: Periodic (e.g., quarterly) and whenever the system scope, data, model, or deployment context changes materially.",
      "Purpose: Detect drift and harms; review complaints and incidents; enforce change control and continuous improvement.",
      "Minimum required evidence:",
      "Monitoring report (key metrics, drift, model performance, fairness indicators).",
      "Incident/complaints summary and corrective actions.",
      "Updated risk register and decision on continuation/changes.",
      "Re-run Gate 0 triage if scope or data/model changes increase risk profile.",
      "Minimum approvers: System owner + DPO (+ Board for high-risk changes).",
      "Output: Continue / modify / suspend / retire decision."
    ]
  },
  "starter_pack_intro": [
    "The minimum viable ethics gate requires a small set of templates that make decisions auditable and repeatable. Include these templates in the EAII AI Ethics Toolkit package."
  ],
  "artifacts": [
    {
      "artifact": "Ethics Gate Trigger Checklist",
      "purpose": "Gate 0 risk screening and lane assignment (Annex A)."
    },
    {
      "artifact": "Ethics Gate Decision Record",
      "purpose": "One-page record: decision, lane, conditions, sign-offs, expiry/review date (Annex B)."
    },
    {
      "artifact": "Impact Assessment (PDIA/DPIA) template",
      "purpose": "Required for high-risk projects; \"lite\" version for moderate risk."
    },
    {
      "artifact": "Dataset Card / Datasheet",
      "purpose": "Dataset purpose, provenance, composition, representativeness, rights, and limitations."
    },
    {
      "artifact": "Model Card",
      "purpose": "Intended use, evaluation results, limitations, risks, and human oversight."
    },
    {
      "artifact": "Risk Register + Mitigation Tracker",
      "purpose": "Single source of truth for risks, controls, owners, and status."
    },
    {
      "artifact": "Operational logs",
      "purpose": "DSAR/complaints log; breach register; cross-border transfer log; approvals log."
    },
    {
      "artifact": "Vendor due diligence checklist (if applicable)",
      "purpose": "Audit rights, security assurances, processor duties, and data transfer safeguards."
    }
  ],
  "implementation_guidance": [
    "Embed Gate 0 (Trigger Checklist) into project intake and require completion before any data access.",
    "Create an approvals log (simple register) to record gate outcomes, conditions, owners, and review dates.",
    "Pilot the ethics gate on 2-3 priority use cases and adjust triggers and evidence thresholds based on lessons learned.",
    "Establish an interim Ethics/Data Review Panel while a permanent review board is formalized (especially for health and other high-risk contexts).",
    "Train project teams and focal points on how to complete the trigger checklist, DPIA/PDIA, and dataset/model documentation."
  ],
  "references": [
    "This minimum viable ethics gate is aligned with: (i) Ethiopia binding instruments referenced in the EAII evidence pack, and (ii) widely used international responsible AI governance references.",
    "Federal Democratic Republic of Ethiopia. Personal Data Protection Proclamation No. 1321/2024. Federal Negarit Gazette (No. 35), 24 July 2024.",
    "UNESCO. Recommendation on the Ethics of Artificial Intelligence. 2021.",
    "NIST. AI Risk Management Framework (AI RMF 1.0). 2023.",
    "ISO/IEC 42001:2023. Information technology - Artificial intelligence - Management system.",
    "Gebru, T. et al. Datasheets for Datasets. 2018.",
    "Mitchell, M. et al. Model Cards for Model Reporting. 2019.",
    "Government of Canada. Algorithmic Impact Assessment (AIA) - public sector risk screening tool. (Referenced as an example template)."
  ],
  "evidence_matrix": [
    {
      "evidence_artifact": "Use-case brief",
      "gate0": "☐",
      "gate1": "",
      "gate2_3": ""
    },
    {
      "evidence_artifact": "Trigger checklist (Annex A)",
      "gate0": "☐",
      "gate1": "",
      "gate2_3": ""
    },
    {
      "evidence_artifact": "Decision record (Annex B)",
      "gate0": "☐",
      "gate1": "☐",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Risk register + mitigations",
      "gate0": "☐",
      "gate1": "☐",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Data inventory",
      "gate0": "",
      "gate1": "☐",
      "gate2_3": ""
    },
    {
      "evidence_artifact": "Dataset card / datasheet",
      "gate0": "",
      "gate1": "☐",
      "gate2_3": ""
    },
    {
      "evidence_artifact": "DPIA/PDIA (lite/full)",
      "gate0": "",
      "gate1": "☐",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Evaluation plan",
      "gate0": "",
      "gate1": "",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Model card (draft/final)",
      "gate0": "",
      "gate1": "",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Monitoring plan",
      "gate0": "",
      "gate1": "",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Incident & breach response plan",
      "gate0": "",
      "gate1": "",
      "gate2_3": "☐"
    },
    {
      "evidence_artifact": "Operational logs templates (DSAR, breach, cross-border)",
      "gate0": "",
      "gate1": "",
      "gate2_3": "☐"
    }
  ],
  "decision_rule": {
    "lane3": "If any High-Risk trigger is YES -> Lane 3 (Enhanced Review).",
    "lane2": "If no High-Risk triggers and two or more Moderate-Risk triggers are YES -> Lane 2 (Standard Review).",
    "lane1": "If no High-Risk triggers and zero or one Moderate-Risk trigger is YES -> Lane 1 (Fast Track)."
  }
};
