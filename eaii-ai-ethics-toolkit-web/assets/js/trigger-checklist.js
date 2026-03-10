const STORAGE_KEY = 'eaii_mveg_trigger_v1_1';

function renderTriggerItem(t, level){
  const name = `${t.id}_answer`;
  const notesId = `${t.id}_notes`;
  return `
    <div class="card" style="margin-top:12px;">
      <div style="display:flex; gap:12px; align-items:flex-start; justify-content:space-between; flex-wrap:wrap;">
        <div style="min-width:260px; flex: 1;">
          <div class="badge ${level==='high'?'danger':'warn'}"><strong>${escapeHTML(t.id)}</strong> <span class="muted">${level==='high'?'High risk':'Moderate risk'}</span></div>
          <p style="margin:10px 0 0;">${escapeHTML(t.question)}</p>
        </div>
        <div style="min-width:260px;">
          <div class="radio-row" role="group" aria-label="${escapeHTML(t.id)} answer">
            <label class="pill"><input type="radio" name="${escapeHTML(name)}" value="yes"> YES</label>
            <label class="pill"><input type="radio" name="${escapeHTML(name)}" value="no"> NO</label>
            <label class="pill"><input type="radio" name="${escapeHTML(name)}" value="na"> N/A</label>
          </div>
        </div>
      </div>
      <div class="field" style="margin-top:10px;">
        <label for="${escapeHTML(notesId)}">Notes / evidence</label>
        <textarea id="${escapeHTML(notesId)}" name="${escapeHTML(notesId)}" placeholder="Mitigation, evidence link, or rationale"></textarea>
      </div>
    </div>
  `;
}

function computeLane(state){
  const items = state.items || [];
  const highYes = items.filter(x => x.level==='high' && x.answer==='yes');
  const modYes = items.filter(x => x.level==='moderate' && x.answer==='yes');
  let lane = 1;
  if(highYes.length > 0) lane = 3;
  else if(modYes.length >= 2) lane = 2;
  return {lane, highYesCount: highYes.length, modYesCount: modYes.length, highYes, modYes};
}

function collectState(){
  const d = window.MVEG_DATA;
  const items = [];
  const collect = (triggers, level) => {
    for(const t of triggers){
      const name = `${t.id}_answer`;
      const notesId = `${t.id}_notes`;
      const answerEl = document.querySelector(`input[name="${name}"]:checked`);
      const notesEl = document.getElementById(notesId);
      items.push({
        id: t.id,
        level,
        question: t.question,
        answer: answerEl ? answerEl.value : '',
        notes: notesEl ? notesEl.value.trim() : ''
      });
    }
  };
  collect(d.high_risk_triggers || [], 'high');
  collect(d.moderate_risk_triggers || [], 'moderate');

  const header = {
    projectName: $('#projectName')?.value.trim() || '',
    owningAgency: $('#owningAgency')?.value.trim() || '',
    projectLead: $('#projectLead')?.value.trim() || '',
    dateCompleted: $('#dateCompleted')?.value || '',
    generalNotes: $('#generalNotes')?.value.trim() || ''
  };

  const state = {
    schema: 'EAII-MVEG-Trigger-Checklist',
    moduleVersion: window.MVEG_DATA?.meta?.Version || 'v1.1',
    savedAtISO: new Date().toISOString(),
    header,
    items
  };
  const comp = computeLane(state);
  state.assignedLane = comp.lane;
  state.highYesCount = comp.highYesCount;
  state.modYesCount = comp.modYesCount;
  state.highYesIds = comp.highYes.map(x=>x.id);
  state.modYesIds = comp.modYes.map(x=>x.id);
  return state;
}

function applyState(state){
  if(!state) return;
  $('#projectName').value = state.header?.projectName || '';
  $('#owningAgency').value = state.header?.owningAgency || '';
  $('#projectLead').value = state.header?.projectLead || '';
  $('#dateCompleted').value = state.header?.dateCompleted || '';
  $('#generalNotes').value = state.header?.generalNotes || '';

  for(const item of (state.items || [])){
    const name = `${item.id}_answer`;
    if(item.answer){
      const el = document.querySelector(`input[name="${name}"][value="${item.answer}"]`);
      if(el) el.checked = true;
    }
    const notesEl = document.getElementById(`${item.id}_notes`);
    if(notesEl) notesEl.value = item.notes || '';
  }

  updateKPIs();
}

function stateToCSV(state){
  const header = [
    'id','risk_level','question','answer','notes'
  ];
  const rows = (state.items || []).map(i => [
    i.id,
    i.level,
    i.question,
    i.answer,
    i.notes
  ]);
  const esc = (v) => {
    const s = (v ?? '').toString().replaceAll('"','""');
    return `"${s}"`;
  };
  const lines = [header.map(esc).join(',')].concat(rows.map(r => r.map(esc).join(',')));
  return lines.join('\n');
}

function updateKPIs(){
  const state = collectState();
  const lane = state.assignedLane;
  $('#lane').textContent = `Lane ${lane}`;
  $('#highYes').textContent = String(state.highYesCount);
  $('#modYes').textContent = String(state.modYesCount);

  // Badge styling
  const laneEl = $('#lane');
  laneEl.style.color = '';
  // we keep simple: lane color via badge text in decision rule box

  // Decision rule summary
  const highList = (state.highYesIds || []).length ? state.highYesIds.join(', ') : 'None';
  const modList = (state.modYesIds || []).length ? state.modYesIds.join(', ') : 'None';

  const laneBadgeClass = lane===3 ? 'danger' : (lane===2 ? 'warn' : 'ok');

  $('#decisionRule').innerHTML = `
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <span class="badge ${laneBadgeClass}"><strong>Assigned:</strong> Lane ${lane}</span>
      <span class="badge"><strong>High YES:</strong> ${escapeHTML(highList)}</span>
      <span class="badge"><strong>Moderate YES:</strong> ${escapeHTML(modList)}</span>
    </div>
    <div class="small" style="margin-top:10px;">
      <div><strong>Decision rule:</strong></div>
      <ul style="margin:8px 0 0;">
        <li>${escapeHTML(window.MVEG_DATA?.decision_rule?.lane3 || '')}</li>
        <li>${escapeHTML(window.MVEG_DATA?.decision_rule?.lane2 || '')}</li>
        <li>${escapeHTML(window.MVEG_DATA?.decision_rule?.lane1 || '')}</li>
      </ul>
    </div>
  `;

  // Store lane in a shared context key for other forms
  saveLocal('eaii_mveg_context_v1_1', {
    assignedLane: lane,
    highYesIds: state.highYesIds,
    modYesIds: state.modYesIds,
    lastUpdatedISO: new Date().toISOString(),
    header: state.header
  });
}

function wireAutoUpdate(){
  $('#form').addEventListener('input', () => updateKPIs());
  $('#form').addEventListener('change', () => updateKPIs());
}

function init(){
  const d = window.MVEG_DATA;
  if(!d) return;

  // Default date
  const dateEl = $('#dateCompleted');
  if(dateEl && !dateEl.value) dateEl.value = todayISO();

  $('#highTriggers').innerHTML = (d.high_risk_triggers || []).map(t => renderTriggerItem(t, 'high')).join('');
  $('#moderateTriggers').innerHTML = (d.moderate_risk_triggers || []).map(t => renderTriggerItem(t, 'moderate')).join('');

  // Load if context exists
  const saved = loadLocal(STORAGE_KEY);
  if(saved) applyState(saved);

  wireAutoUpdate();
  updateKPIs();

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
    // Reset radios + text
    $all('input[type="radio"]').forEach(r => r.checked = false);
    $all('textarea').forEach(t => t.value = '');
    $('#projectName').value = '';
    $('#owningAgency').value = '';
    $('#projectLead').value = '';
    $('#dateCompleted').value = todayISO();
    updateKPIs();
  });

  $('#btn-json').addEventListener('click', () => {
    const state = collectState();
    const base = (state.header?.projectName || 'trigger_checklist').replaceAll(/[^a-z0-9_-]+/gi,'_').slice(0,60);
    downloadJSON(state, `${base}_mveg_trigger_checklist.json`);
  });

  $('#btn-csv').addEventListener('click', () => {
    const state = collectState();
    const base = (state.header?.projectName || 'trigger_checklist').replaceAll(/[^a-z0-9_-]+/gi,'_').slice(0,60);
    downloadText(stateToCSV(state), `${base}_mveg_trigger_checklist.csv`, 'text/csv;charset=utf-8');
  });
}

document.addEventListener('DOMContentLoaded', init);
