const STORAGE_KEY = 'eaii_mveg_evidence_checklist_v1_1';

const GATES = [
  {key:'gate0', label:'Gate 0'},
  {key:'gate1', label:'Gate 1'},
  {key:'gate2_3', label:'Gate 2-3'}
];

function isApplicable(cellValue){
  return (cellValue || '').trim() !== '';
}

function renderTable(rows, state, focus){
  const show = (gateKey) => (focus==='all' || focus===gateKey);

  const headCells = ['<th>Evidence artifact</th>']
    .concat(GATES.filter(g => show(g.key)).map(g => `<th>${escapeHTML(g.label)}</th>`))
    .join('');

  const body = rows.map((r, idx) => {
    const keyBase = `row_${idx}`;
    const cells = [];
    cells.push(`<td>${escapeHTML(r.evidence_artifact)}</td>`);

    for(const g of GATES){
      if(!show(g.key)) continue;

      const applicable = isApplicable(r[g.key === 'gate2_3' ? 'gate2_3' : g.key]);
      if(!applicable){
        cells.push('<td class="muted">—</td>');
        continue;
      }

      const ckey = `${r.evidence_artifact}__${g.key}`;
      const checked = !!state.completion?.[ckey];
      cells.push(`<td><label class="pill"><input type="checkbox" data-ckey="${escapeHTML(ckey)}" ${checked?'checked':''}> Complete</label></td>`);
    }

    return `<tr>${cells.join('')}</tr>`;
  }).join('');

  return `
    <table class="table">
      <thead><tr>${headCells}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function collectState(){
  const completion = {};
  $all('#tableWrap input[type="checkbox"]').forEach(chk => {
    completion[chk.dataset.ckey] = chk.checked;
  });

  return {
    schema: 'EAII-MVEG-StageGate-Evidence-Checklist',
    moduleVersion: window.MVEG_DATA?.meta?.Version || 'v1.1',
    savedAtISO: new Date().toISOString(),
    projectName: $('#projectName')?.value.trim() || '',
    focus: $('#gateFocus')?.value || 'all',
    completion,
    notes: $('#notes')?.value.trim() || ''
  };
}

function applyState(state){
  if(!state) return;
  $('#projectName').value = state.projectName || '';
  $('#gateFocus').value = state.focus || 'all';
  $('#notes').value = state.notes || '';

  // re-render then apply checks
  render();
}

function render(){
  const d = window.MVEG_DATA;
  if(!d) return;

  const focus = $('#gateFocus').value;
  const state = loadLocal(STORAGE_KEY) || {completion:{}};

  // Ensure we keep in-memory completion from current checkboxes if already rendered
  const live = $all('#tableWrap input[type="checkbox"]').length ? collectState() : null;
  const completion = live ? live.completion : (state.completion || {});

  const stateForRender = {completion};
  $('#tableWrap').innerHTML = renderTable(d.evidence_matrix || [], stateForRender, focus);

  // Wire changes
  $all('#tableWrap input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', () => {
      // no-op; state collected on save/export
    });
  });
}

function markAllInView(value){
  $all('#tableWrap input[type="checkbox"]').forEach(chk => {
    chk.checked = value;
  });
}

function init(){
  const d = window.MVEG_DATA;
  if(!d) return;

  // Prefill project name from trigger context if available
  const trig = loadLocal('eaii_mveg_trigger_v1_1');
  if(trig?.header?.projectName && !$('#projectName').value){
    $('#projectName').value = trig.header.projectName;
  }

  // Load saved
  const saved = loadLocal(STORAGE_KEY);
  if(saved) applyState(saved);
  else render();

  $('#gateFocus').addEventListener('change', () => render());

  // Buttons
  $('#btn-mark-required').addEventListener('click', () => markAllInView(true));
  $('#btn-clear-view').addEventListener('click', () => markAllInView(false));

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
    if(!confirm('Reset the checklist? This will not delete your saved draft unless you also clear it.')) return;
    $('#projectName').value = '';
    $('#gateFocus').value = 'all';
    $('#notes').value = '';
    markAllInView(false);
    render();
  });

  $('#btn-json').addEventListener('click', () => {
    const state = collectState();
    const base = (state.projectName || 'evidence_checklist').replaceAll(/[^a-z0-9_-]+/gi,'_').slice(0,60);
    downloadJSON(state, `${base}_mveg_evidence_checklist.json`);
  });
}

document.addEventListener('DOMContentLoaded', init);
