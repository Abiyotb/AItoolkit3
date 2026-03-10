function renderMeta(meta){
  const rows = Object.entries(meta).map(([k,v]) => `
    <tr><th>${escapeHTML(k)}</th><td>${escapeHTML(v)}</td></tr>
  `).join('');
  return `<table class="table"><tbody>${rows}</tbody></table>`;
}

function renderRoles(roles){
  const rows = roles.map(r => `
    <tr>
      <td>${escapeHTML(r.role)}</td>
      <td>${escapeHTML(r.responsibilities)}</td>
      <td>${escapeHTML(r.signs_approves)}</td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead>
        <tr><th>Role</th><th>Minimum responsibilities</th><th>Signs / approves</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderLanes(lanes){
  const rows = lanes.map(l => `
    <tr>
      <td>${escapeHTML(l.lane)}</td>
      <td>${escapeHTML(l.characteristics)}</td>
      <td>${escapeHTML(l.minimum_review)}</td>
      <td>${escapeHTML(l.minimum_evidence)}</td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead>
        <tr><th>Lane</th><th>Typical characteristics</th><th>Minimum review</th><th>Minimum evidence</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderTriggers(title, triggers){
  const rows = triggers.map(t => `
    <tr>
      <td><strong>${escapeHTML(t.id)}</strong></td>
      <td>${escapeHTML(t.question)}</td>
    </tr>
  `).join('');
  return `
    <h3>${escapeHTML(title)}</h3>
    <table class="table">
      <thead><tr><th style="width:100px">ID</th><th>Trigger question</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderGatesSummary(gates){
  const rows = gates.map(g => `
    <tr>
      <td>${escapeHTML(g.gate)}</td>
      <td>${escapeHTML(g.when)}</td>
      <td>${escapeHTML(g.outcome)}</td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead><tr><th>Gate</th><th>When</th><th>Outcome</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderArtifacts(artifacts){
  const rows = artifacts.map(a => `
    <tr>
      <td>${escapeHTML(a.artifact)}</td>
      <td>${escapeHTML(a.purpose)}</td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead><tr><th>Artifact</th><th>Purpose</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderList(items){
  return `<ul>${items.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>`;
}

function renderGateDetails(gateDetails){
  // gateDetails is an object keyed by heading
  const order = Object.keys(gateDetails);
  return order.map(h => {
    const lines = gateDetails[h] || [];
    const content = `<div class="small">${lines.map(l => `<p class="small" style="margin:8px 0;">${escapeHTML(l)}</p>`).join('')}</div>`;
    return `<details><summary>${escapeHTML(h.replace(/^\d+\.\d+\s*/,'').trim())}</summary>${content}</details>`;
  }).join('');
}

function renderEvidenceMatrix(rows){
  const body = rows.map(r => `
    <tr>
      <td>${escapeHTML(r.evidence_artifact)}</td>
      <td>${escapeHTML(r.gate0)}</td>
      <td>${escapeHTML(r.gate1)}</td>
      <td>${escapeHTML(r.gate2_3)}</td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead><tr><th>Evidence artifact</th><th>Gate 0</th><th>Gate 1</th><th>Gate 2-3</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  if(!window.MVEG_DATA) return;
  const d = window.MVEG_DATA;

  $('#mveg-meta').innerHTML = renderMeta(d.meta);
  $('#mveg-note').textContent = d.note || '';
  $('#mveg-quickuse').textContent = d.quick_use || '';

  $('#mveg-docmap').innerHTML = renderList(d.document_map || []);
  $('#mveg-purpose').innerHTML = renderList(d.purpose_and_scope || []);
  $('#mveg-roles-intro').innerHTML = (d.roles_intro||[]).map(x=>`<p>${escapeHTML(x)}</p>`).join('');
  $('#mveg-roles').innerHTML = renderRoles(d.roles);

  $('#mveg-risk-intro').innerHTML = (d.risk_lanes_intro||[]).map(x=>`<p>${escapeHTML(x)}</p>`).join('');
  $('#mveg-lanes').innerHTML = renderLanes(d.lanes);

  const rule = d.decision_rule || {};
  $('#mveg-decisionrule').innerHTML = `
    <div class="callout">
      <strong>Decision rule (minimum viable)</strong>
      <ul>
        <li>${escapeHTML(rule.lane3 || '')}</li>
        <li>${escapeHTML(rule.lane2 || '')}</li>
        <li>${escapeHTML(rule.lane1 || '')}</li>
      </ul>
      <div class="btn-row">
        <a class="btn primary" href="trigger-checklist.html">Open the interactive Trigger Checklist</a>
      </div>
    </div>
  `;

  $('#mveg-trigger-intro').innerHTML = (d.trigger_intro||[]).map(x=>`<p>${escapeHTML(x)}</p>`).join('');
  $('#mveg-triggers').innerHTML =
    renderTriggers('High-Risk triggers (automatic escalation to Lane 3)', d.high_risk_triggers)
    + renderTriggers('Moderate-Risk triggers (route to Lane 2 unless combined with High-Risk)', d.moderate_risk_triggers);

  $('#mveg-stage-intro').innerHTML = (d.stage_gates_intro||[]).map(x=>`<p>${escapeHTML(x)}</p>`).join('');
  $('#mveg-gates-summary').innerHTML = renderGatesSummary(d.gates_summary);
  $('#mveg-gate-details').innerHTML = renderGateDetails(d.gate_details);

  $('#mveg-starter-intro').innerHTML = (d.starter_pack_intro||[]).map(x=>`<p>${escapeHTML(x)}</p>`).join('');
  $('#mveg-artifacts').innerHTML = renderArtifacts(d.artifacts);

  $('#mveg-impl').innerHTML = renderList(d.implementation_guidance || []);
  $('#mveg-refs').innerHTML = renderList(d.references || []);

  $('#mveg-evidence-matrix').innerHTML = renderEvidenceMatrix(d.evidence_matrix || []);
});
