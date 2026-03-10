const STORAGE_KEY = 'eaii_mveg_decision_record_v1_1';
const CONTEXT_KEY = 'eaii_mveg_context_v1_1';

function renderArtifactCheckboxes(artifacts){
  return artifacts.map((a, idx) => {
    const id = `art_${idx}`;
    return `
      <label class="pill" style="justify-content:flex-start;">
        <input type="checkbox" id="${id}" data-artifact="${escapeHTML(a.artifact)}" />
        <span><strong>${escapeHTML(a.artifact)}</strong><span class="muted"> — ${escapeHTML(a.purpose)}</span></span>
      </label>
    `;
  }).join('');
}

function renderSignoffTable(){
  const roles = ['Project Lead','DPO','Legal','Security','Board (if applicable)'];
  const rows = roles.map((r, i) => `
    <tr>
      <td>${escapeHTML(r)}</td>
      <td><input type="text" id="sig_name_${i}" placeholder="Name" /></td>
      <td><input type="text" id="sig_title_${i}" placeholder="Title" /></td>
      <td><input type="date" id="sig_date_${i}" /></td>
    </tr>
  `).join('');
  return `
    <table class="table">
      <thead>
        <tr><th>Role</th><th>Name</th><th>Title</th><th>Date</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function collectState(){
  const artifacts = $all('#artifactList input[type="checkbox"]').filter(c => c.checked).map(c => c.dataset.artifact);

  const signoffs = [];
  const roleLabels = ['Project Lead','DPO','Legal','Security','Board (if applicable)'];
  for(let i=0;i<roleLabels.length;i++){
    signoffs.push({
      role: roleLabels[i],
      name: $(`#sig_name_${i}`)?.value.trim() || '',
      title: $(`#sig_title_${i}`)?.value.trim() || '',
      date: $(`#sig_date_${i}`)?.value || ''
    });
  }

  return {
    schema: 'EAII-MVEG-Decision-Record',
    moduleVersion: window.MVEG_DATA?.meta?.Version || 'v1.1',
    savedAtISO: new Date().toISOString(),
    project: {
      nameOrId: $('#projectName')?.value.trim() || '',
      owningAgency: $('#owningAgency')?.value.trim() || '',
      lead: $('#projectLead')?.value.trim() || ''
    },
    gate: $('#gate')?.value || '',
    lane: $('#lane')?.value || '',
    decision: $('#decision')?.value || '',
    keyRisks: $('#keyRisks')?.value.trim() || '',
    conditions: $('#conditions')?.value.trim() || '',
    accountableOwner: $('#owner')?.value.trim() || '',
    reviewExpiryDate: $('#reviewDate')?.value || '',
    evidenceArtifactsAttached: artifacts,
    artifactNotes: $('#artifactNotes')?.value.trim() || '',
    signoffs
  };
}

function applyState(state){
  if(!state) return;

  $('#projectName').value = state.project?.nameOrId || '';
  $('#owningAgency').value = state.project?.owningAgency || '';
  $('#projectLead').value = state.project?.lead || '';
  if(state.gate) $('#gate').value = state.gate;
  if(state.lane) $('#lane').value = state.lane;
  if(state.decision) $('#decision').value = state.decision;

  $('#keyRisks').value = state.keyRisks || '';
  $('#conditions').value = state.conditions || '';
  $('#owner').value = state.accountableOwner || '';
  $('#reviewDate').value = state.reviewExpiryDate || '';

  // artifacts
  const selected = new Set(state.evidenceArtifactsAttached || []);
  $all('#artifactList input[type="checkbox"]').forEach(c => {
    c.checked = selected.has(c.dataset.artifact);
  });
  $('#artifactNotes').value = state.artifactNotes || '';

  // signoffs
  for(let i=0;i<(state.signoffs||[]).length;i++){
    const s = state.signoffs[i];
    if($(`#sig_name_${i}`)) $(`#sig_name_${i}`).value = s.name || '';
    if($(`#sig_title_${i}`)) $(`#sig_title_${i}`).value = s.title || '';
    if($(`#sig_date_${i}`)) $(`#sig_date_${i}`).value = s.date || '';
  }
}

function prefillFromContext(){
  const ctx = loadLocal(CONTEXT_KEY);
  const savedTriggers = loadLocal('eaii_mveg_trigger_v1_1');
  let laneFromTriggers = null;

  if(savedTriggers && savedTriggers.assignedLane){
    laneFromTriggers = `Lane ${savedTriggers.assignedLane}`;
  }else if(ctx && ctx.assignedLane){
    laneFromTriggers = `Lane ${ctx.assignedLane}`;
  }

  // Populate lane if blank or default
  if(laneFromTriggers){
    $('#lane').value = laneFromTriggers;
    $('#laneHint').textContent = `Prefilled from Trigger Checklist: ${laneFromTriggers}`;
  }else{
    $('#laneHint').textContent = 'Tip: complete the Trigger Checklist first to prefill lane assignment.';
  }

  // Prefill project header
  const header = savedTriggers?.header || ctx?.header;
  if(header){
    if(!$('#projectName').value) $('#projectName').value = header.projectName || '';
    if(!$('#owningAgency').value) $('#owningAgency').value = header.owningAgency || '';
    if(!$('#projectLead').value) $('#projectLead').value = header.projectLead || '';
  }

  // Show prefill banner
  const bannerBits = [];
  if(laneFromTriggers) bannerBits.push(`<span class="badge"><strong>Lane</strong>: ${escapeHTML(laneFromTriggers)}</span>`);
  if(savedTriggers?.highYesIds?.length) bannerBits.push(`<span class="badge danger"><strong>High YES</strong>: ${escapeHTML(savedTriggers.highYesIds.join(', '))}</span>`);
  if(savedTriggers?.modYesIds?.length) bannerBits.push(`<span class="badge warn"><strong>Moderate YES</strong>: ${escapeHTML(savedTriggers.modYesIds.join(', '))}</span>`);

  $('#prefill').innerHTML = `
    <strong>Prefill from Trigger Checklist (if available)</strong>
    <div class="small" style="margin-top:8px;">
      ${bannerBits.length ? bannerBits.join(' ') : 'No Trigger Checklist draft found in this browser yet.'}
    </div>
    <div class="btn-row">
      <a class="btn" href="trigger-checklist.html">Open Trigger Checklist</a>
    </div>
  `;
}

function init(){
  const d = window.MVEG_DATA;
  if(!d) return;

  $('#artifactList').innerHTML = renderArtifactCheckboxes(d.artifacts || []);
  $('#signoffTable').innerHTML = renderSignoffTable();

  // default review date
  const reviewEl = $('#reviewDate');
  if(reviewEl && !reviewEl.value) reviewEl.value = todayISO();

  // Load saved decision record
  const saved = loadLocal(STORAGE_KEY);
  if(saved) applyState(saved);

  // Prefill lane/header from trigger checklist
  prefillFromContext();

  // Buttons
  $('#btn-save').addEventListener('click', () => {
    const state = collectState();
    saveLocal(STORAGE_KEY, state);
    alert('Saved locally in this browser.');
  });

  $('#btn-load').addEventListener('click', () => {
    const state = loadLocal(STORAGE_KEY);
    if(!state) return alert('No saved draft found in this browser.');
    applyState(state);
    alert('Loaded saved draft.');
  });

  $('#btn-reset').addEventListener('click', () => {
    if(!confirm('Reset the form? This will not delete your saved draft unless you also clear it.')) return;
    // reset basics
    $all('#form input[type="text"], #form textarea').forEach(el => el.value = '');
    $all('#form input[type="date"]').forEach(el => el.value = '');
    $all('#artifactList input[type="checkbox"]').forEach(el => el.checked = false);
    $('#gate').value = 'Gate 0';
    $('#lane').value = 'Lane 1';
    $('#decision').value = 'Approve';
    $('#reviewDate').value = todayISO();
    prefillFromContext();
  });

  $('#btn-json').addEventListener('click', () => {
    const state = collectState();
    const base = (state.project?.nameOrId || 'decision_record').replaceAll(/[^a-z0-9_-]+/gi,'_').slice(0,60);
    downloadJSON(state, `${base}_mveg_decision_record.json`);
  });
}

document.addEventListener('DOMContentLoaded', init);
