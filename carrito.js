/* Carrito Boys & Girls LM — un solo carrito para todo catalogo.boysandgirlslm.com */
(function () {
  if (window.__bgCart) return; window.__bgCart = true;
  var KEY = 'bg_carrito_v1';
  var WA_DEFAULT = '526688328530';
  var LETTERS = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  /* ---------- estilos ---------- */
  var css = `
.bgc,.bgc *{box-sizing:border-box}
.bgc{--c-bg:#ffffff;--c-ink:#16233b;--c-muted:#5b6472;--c-line:#dfe2e8;--c-soft:#f3f5f9;--c-acc:#16233b;--c-acc-ink:#ffffff;--c-wa:#25d366;--c-wa-ink:#06301f;--c-warn:#b3261e;font-family:"Work Sans",ui-sans-serif,system-ui,-apple-system,sans-serif;color:var(--c-ink)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .bgc{--c-bg:#1b212a;--c-ink:#eceef0;--c-muted:#9aa3ae;--c-line:#2f3743;--c-soft:#232a35;--c-acc:#dfe7f3;--c-acc-ink:#16233b;--c-warn:#ff8a80}}
:root[data-theme="dark"] .bgc{--c-bg:#1b212a;--c-ink:#eceef0;--c-muted:#9aa3ae;--c-line:#2f3743;--c-soft:#232a35;--c-acc:#dfe7f3;--c-acc-ink:#16233b;--c-warn:#ff8a80}
.bgc-add{white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:6px;width:100%;background:#16233b;color:#fff;border:0;border-radius:8px;padding:8px 6px;font:inherit;font-weight:700;font-size:.74rem;cursor:pointer}
.bgc-add svg{width:14px;height:14px}
.bgc-add.bgc-added{background:#1e7b34}
a.wa-btn.bgc-secondary,a.bgc-secondary{background:transparent!important;color:inherit!important;border:1px solid #25d366!important;font-weight:600!important;font-size:.68rem!important;padding:6px!important;margin-top:6px}
.bgc-fab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:900;display:flex;align-items:center;gap:8px;background:var(--c-acc);color:var(--c-acc-ink);border:0;border-radius:999px;padding:12px 18px;font:inherit;font-weight:700;font-size:.9rem;box-shadow:0 8px 24px -8px rgba(0,0,0,.45);cursor:pointer}
.bgc-fab svg{width:20px;height:20px}
.bgc-fab .bgc-n{background:var(--c-wa);color:var(--c-wa-ink);border-radius:999px;min-width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;padding:0 6px}
.bgc-ov{position:fixed;inset:0;z-index:950;background:rgba(8,12,18,.55);display:flex;justify-content:flex-end;align-items:stretch}
.bgc-ov[hidden],.bgc-fab[hidden],.bgc-toast[hidden]{display:none!important}
.bgc-panel{background:var(--c-bg);width:min(440px,100%);height:100%;display:flex;flex-direction:column;box-shadow:-10px 0 40px -20px rgba(0,0,0,.5)}
.bgc-ov.bgc-sheet{align-items:flex-end;justify-content:center}
.bgc-ov.bgc-sheet .bgc-panel{height:auto;max-height:88vh;width:min(460px,100%);border-radius:16px 16px 0 0;padding-bottom:env(safe-area-inset-bottom,0px)}
@media (min-width:700px){.bgc-ov.bgc-sheet{align-items:center}.bgc-ov.bgc-sheet .bgc-panel{border-radius:16px}}
.bgc-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 16px 12px;border-bottom:1px solid var(--c-line)}
.bgc-hd h3{margin:0;font-family:"Fraunces",Georgia,serif;font-size:1.15rem;font-weight:600;color:var(--c-ink)}
.bgc-x{width:34px;height:34px;border-radius:50%;border:0;background:var(--c-soft);color:var(--c-ink);font-size:1.2rem;cursor:pointer;flex:none}
.bgc-body{flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:10px}
.bgc-ft{border-top:1px solid var(--c-line);padding:12px 16px calc(14px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:10px}
.bgc-item{display:grid;grid-template-columns:56px 1fr;gap:10px;padding:10px;border:1px solid var(--c-line);border-radius:12px;background:var(--c-bg)}
.bgc-item.bgc-missing{border-color:var(--c-warn)}
.bgc-th{width:56px;height:70px;border-radius:8px;background:var(--c-soft);object-fit:cover}
.bgc-meta{min-width:0;display:flex;flex-direction:column;gap:3px}
.bgc-brand{font-size:.62rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c-muted)}
.bgc-name{font-weight:600;font-size:.82rem;line-height:1.3;overflow-wrap:anywhere}
.bgc-det{font-size:.7rem;color:var(--c-muted);overflow-wrap:anywhere}
.bgc-row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:4px}
.bgc-price{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:.92rem;white-space:nowrap}
.bgc-lbl{font-size:.72rem;font-weight:600;color:var(--c-ink);margin-top:4px}
.bgc-lbl em{font-style:normal;color:var(--c-warn);font-weight:600}
.bgc-chips{display:flex;flex-wrap:wrap;gap:6px}
.bgc-chip{border:1px solid var(--c-line);background:var(--c-bg);color:var(--c-ink);border-radius:999px;padding:6px 11px;font:inherit;font-size:.74rem;font-weight:600;cursor:pointer}
.bgc-chip[aria-pressed="true"]{background:var(--c-acc);color:var(--c-acc-ink);border-color:var(--c-acc)}
.bgc-in{width:100%;font:inherit;font-size:.85rem;padding:9px 10px;border-radius:8px;border:1px solid var(--c-line);background:var(--c-bg);color:var(--c-ink)}
.bgc-qty{display:inline-flex;align-items:center;border:1px solid var(--c-line);border-radius:8px;overflow:hidden}
.bgc-qty button{width:30px;height:30px;border:0;background:var(--c-soft);color:var(--c-ink);font-size:1rem;cursor:pointer}
.bgc-qty span{min-width:30px;text-align:center;font-weight:600;font-size:.85rem;font-variant-numeric:tabular-nums}
.bgc-rm{border:0;background:none;color:var(--c-muted);font:inherit;font-size:.72rem;text-decoration:underline;cursor:pointer;padding:4px}
.bgc-total{display:flex;justify-content:space-between;align-items:baseline;font-size:.85rem}
.bgc-total b{font-family:"Fraunces",Georgia,serif;font-size:1.15rem}
.bgc-note{font-size:.72rem;color:var(--c-muted);line-height:1.4}
.bgc-send{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--c-wa);color:var(--c-wa-ink);border:0;border-radius:10px;padding:13px;font:inherit;font-weight:700;font-size:.92rem;text-decoration:none;cursor:pointer;text-align:center}
.bgc-send[aria-disabled="true"]{opacity:.5}
.bgc-warn{font-size:.74rem;color:var(--c-warn);font-weight:600}
.bgc-primary{background:var(--c-acc);color:var(--c-acc-ink);border:0;border-radius:10px;padding:13px;font:inherit;font-weight:700;font-size:.92rem;cursor:pointer}
.bgc-empty{padding:40px 10px;text-align:center;color:var(--c-muted);font-size:.85rem}
.bgc-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(80px + env(safe-area-inset-bottom,0px));z-index:960;background:#16233b;color:#fff;border-radius:999px;padding:10px 16px;font-size:.82rem;font-weight:600;box-shadow:0 8px 24px -8px rgba(0,0,0,.45);display:flex;gap:12px;align-items:center;white-space:nowrap}
.bgc-toast button{background:none;border:0;color:#8fd4a3;font:inherit;font-weight:700;cursor:pointer;padding:0}
.bgc-chip:focus-visible,.bgc-add:focus-visible,.bgc-fab:focus-visible,.bgc-send:focus-visible,.bgc-primary:focus-visible{outline:2px solid #6c9bd8;outline-offset:2px}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- almacenamiento ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return mem || []; } }
  var mem = null;
  function save(c) { mem = c; try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} render(); }
  var cart = load(); mem = cart;
  window.addEventListener('storage', function (e) { if (e.key === KEY) { cart = load(); render(); } });

  var fmt = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ICON_BAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';
  var ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var ICON_CART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2l1.6-6.8H6.2"/></svg>';
  var ICON_WA = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.6 6.32A8.86 8.86 0 0 0 12.02 3.5c-4.87 0-8.83 3.96-8.83 8.83 0 1.56.41 3.08 1.18 4.42L3.1 21.5l4.87-1.28a8.8 8.8 0 0 0 4.05 1h.01c4.87 0 8.83-3.96 8.83-8.83 0-2.36-.92-4.58-2.59-6.24zM12.02 19.7h-.01a7.33 7.33 0 0 1-3.74-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.32 7.32 0 0 1-1.12-3.9c0-4.05 3.3-7.35 7.36-7.35 1.96 0 3.81.77 5.2 2.16a7.3 7.3 0 0 1 2.15 5.2c0 4.05-3.3 7.35-7.35 7.35zm4.03-5.5c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.85s.8 2.15.91 2.3c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.3-.53 1.49-1.05.18-.52.18-.96.13-1.05-.06-.1-.2-.15-.42-.26z"/></svg>';

  /* ---------- lectura de cada pieza ---------- */
  function sizeOptions(line) {
    if (!line) return [];
    var s = line.replace(/^\s*(tallas?\s*:?|cintura)\s*/i, '').trim();
    var BABY = ['0-3 m', '3-6 m', '6-12 m', '12-18 m', '18-24 m'], TOD = ['2T', '3T', '4T', '5T'];
    if (/0-3 m a Toddler 5T/i.test(s)) return BABY.concat(TOD);
    if (/0-3 m a 18-24 m/i.test(s)) return BABY;
    if (/12-18 m a 5T/i.test(s)) return ['12-18 m', '18-24 m'].concat(TOD);
    if (/XS \(4-5\) a XXL \(14-16\)/i.test(s)) return ['XS (4-5)', 'S (6-7)', 'M (8)', 'L (10)', 'XL (12)', 'XXL (14-16)'];
    var lr = s.match(/\b(XXS|XS|S|M|L|XL|XXL|XXXL)\b(?:\s*\([^)]*\))?\s+a\s+(XXS|XS|S|M|L|XL|XXL|XXXL)\b/i);
    if (lr) { var a = LETTERS.indexOf(lr[1].toUpperCase()), b = LETTERS.indexOf(lr[2].toUpperCase()); if (a > -1 && b >= a) return LETTERS.slice(a, b + 1); }
    if (/·|consultar| a /i.test(s) && !/\//.test(s)) return [];
    if (/\sy\s|,/.test(s)) {
      var unit = (s.match(/\s(meses|años|m)\s*$/i) || [])[1] || '';
      return s.replace(/\s(meses|años)\s*$/i, '').split(/\s+y\s+|,\s*/).map(function (x) { return (x.trim() + (unit && !/m$/i.test(x.trim()) ? ' ' + unit : '')).trim(); }).filter(Boolean);
    }
    if (/\//.test(s)) return s.replace(/\(consultar[^)]*\)/i, '').split('/').map(function (x) { return x.trim(); }).filter(Boolean);
    return [];
  }
  function parseCard(card) {
    var a = card.querySelector('a[href*="wa.me/"]'); if (!a) return null;
    var u; try { u = new URL(a.href); } catch (e) { return null; }
    var text = u.searchParams.get('text') || '';
    var num = (u.pathname.match(/\d{8,}/) || [WA_DEFAULT])[0];
    var blocks = text.split('\n\n');
    var head = blocks[0] || '';
    var lines = (blocks[1] || '').split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    var nameEl = card.querySelector('.card-name');
    var name = lines[0] || (nameEl ? nameEl.textContent.trim() : '');
    var det = lines.slice(1).filter(function (l) { return !/^precio/i.test(l); });
    var tallaLine = det.filter(function (l) { return /^(tallas?|talla:|kids|baby|toddler|cintura)/i.test(l); })[0] || '';
    var info = det.filter(function (l) { return l !== tallaLine; });
    var pm = text.match(/Precio:\s*\$\s*([\d,]+)/i);
    var price = pm ? parseInt(pm[1].replace(/,/g, ''), 10) : null;
    var cm = head.match(/cat[aá]logo\s+(.+?):\s*$/i);
    var catalogo = cm ? cm[1] : document.title.replace(/\s*·\s*Cat[aá]logo\s*$/i, '');
    var mk = card.querySelector('.card-marca');
    var marca = mk ? mk.textContent.trim() : '';
    var img = card.querySelector('img[src^="data:"]');
    var all = Array.prototype.filter.call(document.querySelectorAll('article.card'), function (c) { return c.querySelector('a[href*="wa.me/"]'); });
    var page = location.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '') || 'inicio';
    var ref = page + '/' + (all.indexOf(card) + 1);
    return { ref: ref, num: num, name: name, info: info.join(' · '), tallaLine: tallaLine, sizes: sizeOptions(tallaLine), price: price,
             catalogo: catalogo, marca: marca, page: location.pathname, imgEl: img };
  }
  function thumbOf(imgEl) {
    try {
      if (!imgEl || !imgEl.naturalWidth) return '';
      var c = document.createElement('canvas'); var w = 96, h = Math.round(96 * imgEl.naturalHeight / imgEl.naturalWidth);
      c.width = w; c.height = Math.min(h, 140); c.getContext('2d').drawImage(imgEl, 0, 0, w, h);
      return c.toDataURL('image/jpeg', 0.7);
    } catch (e) { return ''; }
  }

  /* ---------- botones en las tarjetas ---------- */
  function decorate() {
    document.querySelectorAll('article.card').forEach(function (card) {
      if (card.__bgc) return; var a = card.querySelector('a[href*="wa.me/"]'); if (!a) return; card.__bgc = true;
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'bgc-add'; btn.innerHTML = ICON_PLUS + 'Agregar';
      btn.addEventListener('click', function (ev) { ev.stopPropagation(); var p = parseCard(card); if (p) openPicker(p, btn); });
      a.parentNode.insertBefore(btn, a);
      a.classList.add('bgc-secondary');
      if (!/av[ií]same/i.test(a.textContent)) { var svg = a.querySelector('svg'); a.textContent = ''; if (svg) a.appendChild(svg); a.appendChild(document.createTextNode(' Preguntar')); }
    });
  }

  /* ---------- UI ---------- */
  var root = document.createElement('div'); root.className = 'bgc';
  root.innerHTML =
    '<button class="bgc-fab" type="button" hidden aria-label="Ver carrito">' + ICON_CART + '<span>Mi carrito</span><span class="bgc-n">0</span></button>' +
    '<div class="bgc-ov bgc-sheet" id="bgcPick" hidden><div class="bgc-panel" role="dialog" aria-modal="true" aria-labelledby="bgcPickT"><div class="bgc-hd"><h3 id="bgcPickT">Elige tu talla</h3><button class="bgc-x" type="button" aria-label="Cerrar">&times;</button></div><div class="bgc-body" id="bgcPickB"></div><div class="bgc-ft"><div class="bgc-warn" id="bgcPickW" hidden>Elige una talla para continuar</div><button class="bgc-primary" type="button" id="bgcPickOk">Agregar al carrito</button></div></div></div>' +
    '<div class="bgc-ov" id="bgcCart" hidden><div class="bgc-panel" role="dialog" aria-modal="true" aria-labelledby="bgcCartT"><div class="bgc-hd"><h3 id="bgcCartT">Mi carrito</h3><button class="bgc-x" type="button" aria-label="Cerrar">&times;</button></div><div class="bgc-body" id="bgcList"></div><div class="bgc-ft" id="bgcFt"></div></div></div>' +
    '<div class="bgc-toast" hidden><span id="bgcToastT">Agregado al carrito</span><button type="button" id="bgcToastB">Ver carrito</button></div>';
  document.body.appendChild(root);
  var fab = root.querySelector('.bgc-fab'), pick = root.querySelector('#bgcPick'), cartOv = root.querySelector('#bgcCart'), toast = root.querySelector('.bgc-toast');
  fab.addEventListener('click', function () { openCart(); });
  [pick, cartOv].forEach(function (ov) {
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.hidden = true; });
    ov.querySelector('.bgc-x').addEventListener('click', function () { ov.hidden = true; });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { pick.hidden = true; cartOv.hidden = true; } });
  root.querySelector('#bgcToastB').addEventListener('click', function () { toast.hidden = true; openCart(); });

  var pending = null, tt;
  function sizeControl(sizes, current, onPick, idp) {
    var box = document.createElement('div');
    if (sizes.length) {
      box.className = 'bgc-chips';
      sizes.forEach(function (s) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'bgc-chip'; b.textContent = s; b.setAttribute('aria-pressed', current === s ? 'true' : 'false');
        b.addEventListener('click', function () { box.querySelectorAll('.bgc-chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); onPick(s); });
        box.appendChild(b);
      });
    } else {
      var i = document.createElement('input'); i.className = 'bgc-in'; i.id = idp; i.placeholder = 'Escribe la talla (ej. 4, 6-12 m, 5T)'; i.value = current || '';
      i.addEventListener('input', function () { onPick(i.value.trim()); }); box.appendChild(i);
    }
    return box;
  }
  function openPicker(p, btn) {
    pending = { p: p, talla: '', qty: 1, btn: btn };
    var b = root.querySelector('#bgcPickB'); b.innerHTML = '';
    var head = document.createElement('div'); head.className = 'bgc-meta';
    head.innerHTML = (p.marca ? '<span class="bgc-brand">' + esc(p.marca) + '</span>' : '') + '<span class="bgc-name">' + esc(p.name) + '</span>' +
      (p.info ? '<span class="bgc-det">' + esc(p.info) + '</span>' : '') + (p.tallaLine ? '<span class="bgc-det">' + esc(p.tallaLine) + '</span>' : '') +
      '<span class="bgc-price">' + (p.price ? fmt(p.price) + ' MXN' : 'Precio por confirmar') + '</span>';
    b.appendChild(head);
    var l = document.createElement('div'); l.className = 'bgc-lbl'; l.textContent = p.sizes.length ? 'Talla' : 'Talla que buscas'; b.appendChild(l);
    b.appendChild(sizeControl(p.sizes, '', function (v) { pending.talla = v; root.querySelector('#bgcPickW').hidden = true; }, 'bgcPickIn'));
    var l2 = document.createElement('div'); l2.className = 'bgc-lbl'; l2.textContent = 'Cantidad'; b.appendChild(l2);
    var q = document.createElement('div'); q.className = 'bgc-qty'; q.innerHTML = '<button type="button" aria-label="Menos">−</button><span>1</span><button type="button" aria-label="Más">+</button>';
    var qs = q.querySelector('span'); var qb = q.querySelectorAll('button');
    qb[0].addEventListener('click', function () { pending.qty = Math.max(1, pending.qty - 1); qs.textContent = pending.qty; });
    qb[1].addEventListener('click', function () { pending.qty = Math.min(20, pending.qty + 1); qs.textContent = pending.qty; });
    b.appendChild(q);
    root.querySelector('#bgcPickW').hidden = true;
    pick.hidden = false;
  }
  root.querySelector('#bgcPickOk').addEventListener('click', function () {
    if (!pending) return;
    if (!pending.talla) { root.querySelector('#bgcPickW').hidden = false; return; }
    var p = pending.p; cart = load();
    var ex = cart.filter(function (x) { return (x.ref && p.ref ? x.ref === p.ref : x.name === p.name) && x.talla === pending.talla && x.catalogo === p.catalogo && x.price === p.price && x.info === p.info; })[0];
    if (ex) ex.qty += pending.qty;
    else cart.push({ id: Date.now() + Math.random().toString(36).slice(2, 6), name: p.name, marca: p.marca, catalogo: p.catalogo, info: p.info, tallaLine: p.tallaLine,
                     ref: p.ref, sizes: p.sizes, talla: pending.talla, qty: pending.qty, price: p.price, num: p.num, page: p.page, thumb: thumbOf(p.imgEl) });
    save(cart); pick.hidden = true;
    if (pending.btn) { var bt = pending.btn; bt.classList.add('bgc-added'); bt.innerHTML = 'Agregado ✓'; setTimeout(function () { bt.classList.remove('bgc-added'); bt.innerHTML = ICON_PLUS + 'Agregar'; }, 1800); }
    root.querySelector('#bgcToastT').textContent = 'Agregado al carrito (' + count() + ')';
    toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 3500);
    pending = null;
  });

  function count() { return cart.reduce(function (s, x) { return s + (x.qty || 1); }, 0); }
  function openCart() { cart = load(); render(); cartOv.hidden = false; }
  function message() {
    var groups = {}; var order = [];
    cart.forEach(function (x) { var g = x.marca && x.marca !== x.catalogo && !/ralph lauren|cat & jack/i.test(x.catalogo) ? x.catalogo : (x.catalogo || x.marca); if (!groups[g]) { groups[g] = []; order.push(g); } groups[g].push(x); });
    var m = 'Hola, quiero hacer este pedido del catálogo Boys & Girls LM:\n';
    var n = 0, total = 0, pend = 0;
    order.forEach(function (g) {
      m += '\n*' + g + '*\n';
      groups[g].forEach(function (x) {
        n++; m += n + '. ' + (x.marca && g.indexOf(x.marca) < 0 && x.marca !== 'Polo Ralph Lauren' ? x.marca + ' — ' : '') + x.name + '\n';
        if (x.info) m += '   ' + x.info + '\n';
        m += '   Talla: ' + x.talla + ' · Cantidad: ' + x.qty + '\n';
        if (x.ref) m += '   Ref: ' + x.ref + '\n';
        if (x.price) { m += '   Precio: ' + fmt(x.price) + ' MXN' + (x.qty > 1 ? ' c/u' : '') + '\n'; total += x.price * x.qty; } else { m += '   Precio: por confirmar\n'; pend++; }
      });
    });
    m += '\nTotal: ' + fmt(total) + ' MXN (' + count() + (count() === 1 ? ' pieza' : ' piezas') + ')' + (pend ? ' + ' + pend + ' por confirmar' : '') + '\n\n¿Me confirmas disponibilidad en mis tallas y si aplica alguna promoción? ¡Gracias!';
    return m;
  }
  function render() {
    var c = count();
    fab.hidden = c === 0; fab.querySelector('.bgc-n').textContent = c;
    var list = root.querySelector('#bgcList'), ft = root.querySelector('#bgcFt');
    if (!list) return;
    list.innerHTML = ''; ft.innerHTML = '';
    if (!cart.length) { list.innerHTML = '<div class="bgc-empty">Tu carrito está vacío.<br>Toca "Agregar" en las piezas que te gusten.</div>'; return; }
    var missing = 0, total = 0, pend = 0;
    cart.forEach(function (x) {
      if (!x.talla) missing++;
      if (x.price) total += x.price * x.qty; else pend++;
      var it = document.createElement('div'); it.className = 'bgc-item' + (x.talla ? '' : ' bgc-missing');
      it.innerHTML = (x.thumb ? '<img class="bgc-th" alt="" src="' + x.thumb + '">' : '<div class="bgc-th"></div>') +
        '<div class="bgc-meta">' + '<span class="bgc-brand">' + esc(x.marca || x.catalogo) + (x.marca && x.catalogo && x.catalogo !== x.marca ? ' · ' + esc(x.catalogo) : '') + '</span>' +
        '<span class="bgc-name">' + esc(x.name) + '</span>' + (x.info ? '<span class="bgc-det">' + esc(x.info) + '</span>' : '') +
        '<div class="bgc-lbl">Talla ' + (x.talla ? '' : '<em>· falta elegir</em>') + '</div><div class="bgc-sz"></div>' +
        '<div class="bgc-row"><div class="bgc-qty"><button type="button" aria-label="Menos">−</button><span>' + x.qty + '</span><button type="button" aria-label="Más">+</button></div>' +
        '<span class="bgc-price">' + (x.price ? fmt(x.price * x.qty) : 'Por confirmar') + '</span></div>' +
        '<div><button class="bgc-rm" type="button">Quitar</button></div></div>';
      it.querySelector('.bgc-sz').appendChild(sizeControl(x.sizes || [], x.talla, function (v) { x.talla = v; try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} it.classList.toggle('bgc-missing', !v); updateFt(); }, 'bgcSz' + x.id));
      var qb = it.querySelectorAll('.bgc-qty button');
      qb[0].addEventListener('click', function () { x.qty = Math.max(1, x.qty - 1); save(cart); });
      qb[1].addEventListener('click', function () { x.qty = Math.min(20, x.qty + 1); save(cart); });
      it.querySelector('.bgc-rm').addEventListener('click', function () { cart = cart.filter(function (y) { return y !== x; }); save(cart); });
      list.appendChild(it);
    });
    ft.innerHTML = '<div class="bgc-total"><span>Total (' + c + (c === 1 ? ' pieza' : ' piezas') + ')</span><b>' + fmt(total) + ' MXN</b></div>' +
      (pend ? '<div class="bgc-note">' + pend + (pend === 1 ? ' pieza tiene' : ' piezas tienen') + ' precio por confirmar.</div>' : '') +
      '<div class="bgc-note">Al enviar, te llega por WhatsApp la lista completa. Te confirmamos disponibilidad en tu talla y si aplica alguna promoción.</div>' +
      '<div class="bgc-warn" id="bgcMiss" hidden></div>' +
      '<a class="bgc-send" id="bgcSend" target="_blank" rel="noopener">' + ICON_WA + 'Enviar pedido por WhatsApp</a>' +
      '<button class="bgc-rm" type="button" id="bgcEmpty">Vaciar carrito</button>';
    ft.querySelector('#bgcEmpty').addEventListener('click', function () { var b = this; if (b.dataset.ok) { cart = []; save(cart); } else { b.dataset.ok = 1; b.textContent = 'Toca otra vez para vaciar'; } });
    ft.querySelector('#bgcSend').addEventListener('click', function (e) {
      if (cart.some(function (x) { return !x.talla; })) { e.preventDefault(); var w = ft.querySelector('#bgcMiss'); w.hidden = false; w.textContent = 'Elige la talla de todas las piezas antes de enviar.'; var f = list.querySelector('.bgc-missing'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
    updateFt();
  }
  function updateFt() {
    var s = root.querySelector('#bgcSend'); if (!s) return;
    var miss = cart.filter(function (x) { return !x.talla; }).length;
    var num = (cart[0] && cart[0].num) || WA_DEFAULT;
    s.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent(message());
    s.setAttribute('aria-disabled', miss ? 'true' : 'false');
    var w = root.querySelector('#bgcMiss'); if (w && !miss) w.hidden = true;
  }

  decorate(); render();
  var raf = 0; new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; decorate(); }); }).observe(document.body, { childList: true, subtree: true });
})();
