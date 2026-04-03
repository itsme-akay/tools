/* =============================================
   Color Contrast Checker — app.js
   Digital BigHit · Ajay K.
   ============================================= */

let textColor = '#5cffb3';
let bgColor   = '#10421e';
let activeTab = 'regular';

/* ── COLOR UTILS ── */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
}

function luminance(rgb) {
  return ['r', 'g', 'b'].reduce((acc, c, i) => {
    let v = rgb[c] / 255;
    v = v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    return acc + v * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function contrast(c1, c2) {
  const r1 = hexToRgb(c1), r2 = hexToRgb(c2);
  if (!r1 || !r2) return 1;
  const l1 = luminance(r1), l2 = luminance(r2);
  const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function barColor(r) {
  if (r >= 7)   return '#059669';
  if (r >= 4.5) return '#d97706';
  if (r >= 3)   return '#ea580c';
  return '#dc2626';
}

/* ── SYNC COLOR INPUT ── */
function syncColor(which, val) {
  if (which === 'text') {
    textColor = val;
    document.getElementById('textColorHex').value   = val;
    document.getElementById('textColorPicker').value = val.length === 7 ? val : textColor;
    document.getElementById('textSwatch').style.background = val;
  } else {
    bgColor = val;
    document.getElementById('bgColorHex').value   = val;
    document.getElementById('bgColorPicker').value = val.length === 7 ? val : bgColor;
    document.getElementById('bgSwatch').style.background = val;
  }
  update();
}

/* ── TABS ── */
function setTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderPreview();
}

/* ── RENDER PREVIEW ── */
function renderPreview() {
  const box = document.getElementById('previewBox');
  box.style.background = bgColor;
  box.style.color      = textColor;

  if (activeTab === 'regular') {
    box.innerHTML = `
      <p class="body">This is regular body text at 16px. Clear and readable content ensures everyone can engage with your message comfortably.</p>
      <p class="small">Small text like captions, footnotes, and fine print also need to meet contrast standards for users with visual impairments.</p>`;

  } else if (activeTab === 'large') {
    box.innerHTML = `
      <h2>Large Heading Text</h2>
      <p class="large">Large text (18px+ or 14px bold) has a relaxed contrast requirement of 3:1 for AA, making it easier to style boldly.</p>`;

  } else {
    box.innerHTML = `
      <div class="graphic-row">
        <div class="graphic-icon" style="border-color:${textColor}">★</div>
        <div class="graphic-bar" style="background:${textColor}"></div>
      </div>
      <div class="graphic-btns">
        <button class="graphic-btn" style="border-color:${textColor};color:${textColor}">Button A</button>
        <button class="graphic-btn" style="border-color:${textColor};color:${textColor}">Button B</button>
        <button class="graphic-btn" style="border-color:${textColor};color:${textColor}">Button C</button>
      </div>
      <p class="caption">Icons, borders, charts, and UI components need a 3:1 ratio against adjacent colors.</p>`;
  }
}

/* ── MAIN UPDATE ── */
function update() {
  const r   = contrast(textColor, bgColor);
  const bc  = barColor(r);
  const pct = Math.min(((r - 1) / 20) * 100, 100);

  // Ratio number
  document.getElementById('ratioNum').textContent   = r.toFixed(2) + ':1';
  document.getElementById('ratioNum').style.color   = bc;

  // Bar
  document.getElementById('barFill').style.width      = pct + '%';
  document.getElementById('barFill').style.background = bc;

  // WCAG rows
  const rows = [
    { label: 'Normal Text',             level: 'AA',  sub: 'Min 4.5:1', pass: r >= 4.5 },
    { label: 'Normal Text',             level: 'AAA', sub: 'Min 7:1',   pass: r >= 7   },
    { label: 'Large Text',              level: 'AA',  sub: 'Min 3:1',   pass: r >= 3   },
    { label: 'Large Text',              level: 'AAA', sub: 'Min 4.5:1', pass: r >= 4.5 },
    { label: 'Graphic / UI Components', level: '',    sub: 'Min 3:1',   pass: r >= 3   },
  ];

  document.getElementById('wcagRows').innerHTML = rows.map(row => `
    <div class="wcag-row">
      <span class="wcag-label">
        ${row.label}${row.level ? ' — ' + row.level : ''}
        <span class="wcag-sub">${row.sub}</span>
      </span>
      <span class="badge ${row.pass ? 'pass' : 'fail'}">${row.pass ? 'Pass' : 'Fail'}</span>
    </div>`).join('');

  renderPreview();
}

/* ── INIT ── */
document.getElementById('textSwatch').style.background = textColor;
document.getElementById('bgSwatch').style.background   = bgColor;
update();
