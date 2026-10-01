/* script.js: all behaviour for Aircraft World. Data comes from aircraft-data.js. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const CATS = ['Fighter','Commercial','Military','Cargo','Private Jet','Helicopter'];
const num = (v, unit) => v == null ? 'Varies / n/a' : v.toLocaleString() + ' ' + unit;
const uniq = key => [...new Set(AIRCRAFT.map(a => a[key]).filter(v => v != null))].sort();

/* ---------- Navigation ---------- */
// Show one view (page section), update the menu highlight, close the mobile menu.
function go(view) {
  $$('.view').forEach(v => v.classList.toggle('active', v.id === view));
  $$('#menu a').forEach(a => a.classList.toggle('on', a.dataset.view === view));
  $('#menu').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}
// Open the database with a category already selected.
function goCat(cat) {
  resetFilters(); $('#fCat').value = cat; renderList(); go('database');
  $$('#menu a').forEach(a => a.classList.toggle('on', a.dataset.cat === cat));
}
// One click listener handles every link/button that has data-view or data-cat.
document.addEventListener('click', e => {
  const t = e.target.closest('[data-view],[data-cat]');
  if (!t) return;
  e.preventDefault();
  t.dataset.cat ? goCat(t.dataset.cat) : go(t.dataset.view);
});
$('#burger').onclick = () => {
  const open = $('#menu').classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', open);
};

/* ---------- Aircraft cards ---------- */
// Build the HTML for one card. If there is no image (or it fails to load) the placeholder stays.
function card(a) {
  const img = a.img ? `<img src="${a.img}" alt="${a.name}" loading="lazy" onerror="this.remove()">` : '';
  return `<article class="card" tabindex="0" data-id="${a.id}">
    <div class="ph">${a.name}${img}</div>
    <div class="cb"><small>${a.cat}${a.gen ? ', generation ' + a.gen : ''}</small>
    <h3>${a.name}</h3><p>${a.maker}, ${a.country}</p><p>${a.role}</p></div></article>`;
}
// Clicking (or pressing Enter on) any card opens its profile.
function cardOpen(e) {
  const c = e.target.closest('.card');
  if (c && (e.type === 'click' || e.key === 'Enter')) openModal(+c.dataset.id);
}
document.addEventListener('click', cardOpen);
document.addEventListener('keydown', cardOpen);

/* ---------- Home page ---------- */
const find = key => AIRCRAFT.find(a => a.name.includes(key));
$('#featured').innerHTML = ['F-22','A350','Rafale','A380'].map(k => card(find(k))).join('');
$('#cats').innerHTML = CATS.map(c => `<div class="cat glass" tabindex="0" data-cat="${c}">
  <h3>${c === 'Military' ? 'Military Aircraft' : c === 'Helicopter' ? 'Helicopters' : c + (c === 'Private Jet' ? 's' : ' Aircraft')}</h3>
  <p>${AIRCRAFT.filter(a => a.cat === c).length} in database</p></div>`).join('');
$('#popular').innerHTML = ['F-22','F-35','Rafale','Typhoon','Su-57','Su-30','A350','A380','777','787','747','E195']
  .map(k => { const a = find(k); return `<button class="chip" data-open="${a.id}">${a.name}</button>`; }).join('');
$('#facts').innerHTML = FACTS.map(f => `<p>${f}</p>`).join('');
$('#popular').onclick = e => { const b = e.target.closest('[data-open]'); if (b) openModal(+b.dataset.open); };

/* ---------- Database: search, filter, sort ---------- */
// Fill a <select> with a label and a list of options.
function fill(id, label, list) {
  $(id).innerHTML = `<option value="">${label}</option>` + list.map(v => `<option>${v}</option>`).join('');
}
fill('#fCat', 'All categories', CATS);
fill('#fCountry', 'All countries', uniq('country'));
fill('#fMaker', 'All manufacturers', uniq('maker'));
fill('#fGen', 'All generations', uniq('gen'));

// Read every control, keep matching aircraft, sort them, and draw the cards.
function renderList() {
  const q = $('#q').value.trim().toLowerCase();
  const f = { cat: $('#fCat').value, country: $('#fCountry').value, maker: $('#fMaker').value, gen: $('#fGen').value };
  let list = AIRCRAFT.filter(a =>
    (!q || [a.name, a.maker, a.country, a.role].join(' ').toLowerCase().includes(q)) &&
    Object.keys(f).every(k => !f[k] || String(a[k]) === f[k]));
  const s = $('#sort').value;
  const year = a => parseInt(a.first);
  list.sort((a, b) => s === 'year' ? year(a) - year(b)
    : s === 'range' ? (b.range || 0) - (a.range || 0)
    : s === 'speed' ? (b.vmax || 0) - (a.vmax || 0)
    : a.name.localeCompare(b.name));
  $('#count').textContent = `${list.length} aircraft found`;
  $('#results').innerHTML = list.length ? list.map(card).join('')
    : '<p class="muted">No aircraft match. Try a different search or reset the filters.</p>';
  $('#dbTitle').textContent = f.cat ? f.cat + ' database' : 'Aircraft database';
}
function resetFilters() { $('#q').value = ''; ['#fCat','#fCountry','#fMaker','#fGen'].forEach(i => $(i).value = ''); $('#sort').value = 'name'; }
$$('.filters input, .filters select').forEach(el => el.addEventListener('input', renderList));
$('#reset').onclick = () => { resetFilters(); renderList(); };

/* ---------- Detail modal ---------- */
// Build and show the full profile for one aircraft, including similar aircraft.
function openModal(id) {
  const a = AIRCRAFT[id];
  const rows = [['Manufacturer',a.maker],['Country',a.country],['First flight',a.first],['Role',a.role],
    ['Crew / capacity',a.crew],['Engines',a.engine],['Max speed',num(a.vmax,'km/h')],['Cruise speed',num(a.cruise,'km/h')],
    ['Range',num(a.range,'km')],['Service ceiling',num(a.ceiling,'m')],['Max takeoff weight',num(a.mtow,'kg')],
    ['Length',num(a.len,'m')],['Wingspan',num(a.span,'m')]];
  if (a.gen) rows.splice(4, 0, ['Generation', a.gen]);
  const similar = AIRCRAFT.filter(x => x.cat === a.cat && x.id !== id).slice(0, 3);
  $('#mBody').innerHTML = `<div class="ph">${a.name}${a.img ? `<img src="${a.img}" alt="${a.name}" onerror="this.remove()">` : ''}</div>
    <div class="inner"><small class="muted">${a.cat}</small><h2 id="mTitle" style="margin:4px 0 0">${a.name}</h2>
    <div class="specs">${rows.map(r => `<div class="spec"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>
    <h3>Interesting fact</h3><p class="muted">${a.fact}</p>
    <h3>Similar aircraft</h3><div class="chips">${similar.map(s => `<button class="chip" data-open="${s.id}">${s.name}</button>`).join('')}</div></div>`;
  $('#mBody').onclick = e => { const b = e.target.closest('[data-open]'); if (b) { openModal(+b.dataset.open); $('.modal').scrollTop = 0; } };
  $('#modal').hidden = false; document.body.style.overflow = 'hidden'; $('#mClose').focus();
}
function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }
$('#mClose').onclick = closeModal;
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- Compare tool ---------- */
const opts = AIRCRAFT.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
$('#cmpA').innerHTML = $('#cmpB').innerHTML = opts;
$('#cmpA').value = find('F-22').id; $('#cmpB').value = find('Rafale').id;

// Draw a two-column table. Rows where the values differ are highlighted; no "winner" is chosen.
function renderCompare() {
  const a = AIRCRAFT[$('#cmpA').value], b = AIRCRAFT[$('#cmpB').value];
  const rows = [['Manufacturer','maker'],['Country','country'],['Type','cat'],['Role','role'],['First flight','first'],
    ['Generation','gen'],['Engines','engine'],['Max speed','vmax','km/h'],['Cruise speed','cruise','km/h'],
    ['Range','range','km'],['Service ceiling','ceiling','m'],['Max takeoff weight','mtow','kg'],
    ['Length','len','m'],['Wingspan','span','m'],['Crew / capacity','crew']];
  const val = (x, r) => r[2] ? num(x[r[1]], r[2]) : (x[r[1]] == null ? 'n/a' : x[r[1]]);
  $('#cmpTable').innerHTML = `<thead><tr><th></th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>` +
    rows.map(r => `<tr class="${val(a, r) !== val(b, r) ? 'diff' : ''}"><th>${r[0]}</th><td>${val(a, r)}</td><td>${val(b, r)}</td></tr>`).join('') + '</tbody>';
}
$('#cmpA').onchange = $('#cmpB').onchange = renderCompare;
$('#swap').onclick = () => { const t = $('#cmpA').value; $('#cmpA').value = $('#cmpB').value; $('#cmpB').value = t; renderCompare(); };

/* ---------- Quiz ---------- */
const shuffle = arr => [...arr].sort(() => Math.random() - .5);
let qs, qi, score;
// Reset the quiz with shuffled questions, then show the first one.
function startQuiz() { qs = shuffle(QUIZ); qi = 0; score = 0; showQ(); }
function showQ() {
  if (qi >= qs.length) {
    $('#quizBox').innerHTML = `<p class="muted">Final score</p><div class="big">${score} / ${qs.length}</div>
      <p>${score >= 16 ? 'Excellent flying!' : score >= 10 ? 'Solid work. Try again for a higher score.' : 'Keep exploring the database, then try again.'}</p>
      <button class="btn" id="again">Restart quiz</button>`;
    $('#again').onclick = startQuiz; return;
  }
  const [q, right, ...wrong] = qs[qi];
  $('#quizBox').innerHTML = `<p class="muted">Question ${qi + 1} of ${qs.length} · Score ${score}</p>
    <div class="bar"><i style="width:${qi / qs.length * 100}%"></i></div><h3 style="font-size:1.6rem;margin-bottom:16px">${q}</h3>
    ${shuffle([right, ...wrong]).map(o => `<button class="opt">${o}</button>`).join('')}
    <p class="fb" id="fb"></p><button class="btn" id="next" hidden>${qi + 1 === qs.length ? 'See score' : 'Next question'}</button>`;
  $$('.opt').forEach(btn => btn.onclick = () => {
    const ok = btn.textContent === right; if (ok) score++;
    $$('.opt').forEach(o => { o.disabled = true; if (o.textContent === right) o.classList.add('ok'); });
    if (!ok) btn.classList.add('no');
    $('#fb').textContent = ok ? 'Correct!' : 'Not quite. The correct answer is: ' + right;
    $('#next').hidden = false; $('#next').focus();
    $('#next').onclick = () => { qi++; showQ(); };
  });
}

/* ---------- Start ---------- */
renderList(); renderCompare(); startQuiz(); go('home');
