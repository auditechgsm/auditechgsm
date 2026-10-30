/* Shared layout + data for all pages.
   In your PHP source, move the header/footer/modal HTML below into header.php and footer.php. */
(function () {
  var PAGES = [
    ["index.html", "Home"],
    ["tool-rents.html", "Tool Rents & Remote"],
    ["imei.html", "IMEI Service"],
    ["activation.html", "Activation & Credits"],
    ["mdm.html", "MDM Files"],
    ["anti-crack.html", "Anti Crack"]
  ];
  var current = location.pathname.split("/").pop() || "index.html";
  var DEFAULT_PRICE = 5;

  // ---- Sample data: replace with your database import ----
  var DATA = window.SERVICES || { rent: [], activation: [], imei: [], mdm: [], anticrack: [] };

  // ---- Header ----
  var ticker = ["Tool Rents ONLINE", "IMEI Service ONLINE", "Activations ONLINE", "MDM Files ONLINE", "Anti Crack ONLINE"];
  var set = '<div class="ticker-set">' + ticker.map(function (t) {
    var p = t.split(" "), s = p.pop();
    return '<span class="pill">' + p.join(" ") + '<span class="on">● ' + s + '</span></span>';
  }).join("") + '</div>';

  var nav = PAGES.map(function (p) {
    return '<a href="' + p[0] + '"' + (p[0] === current ? ' class="active"' : '') + '>' + p[1] + '</a>';
  }).join("");

  var header =
    '<div class="ticker"><div class="ticker-track">' + set + set + '</div></div>' +
    '<header class="site"><div class="container bar">' +
    '<a href="index.html" class="logo">AUDI<span>TECH</span> GSM</a>' +
    '<nav class="main">' + nav + '</nav>' +
    '<select class="cur" aria-label="Currency"><option>USD</option><option>KES</option><option>UGX</option><option>TZS</option><option>NGN</option><option>ZAR</option></select>' +
    '<span id="authSlot"><button class="btn btn-primary" data-open="auth">Login / Register</button></span>' +
    '</div></header>';

  // ---- Footer + modals ----
  var footer =
    '<div class="trust"><div class="container row">' +
    '<div><b>⚡ Quick Delivery</b><span>Results within minutes</span></div>' +
    '<div><b>🔐 Secure</b><span>Encrypted platform</span></div>' +
    '<div><b>🎧 Support</b><span>Help when you need it</span></div>' +
    '<div><b>💳 Easy Recharge</b><span>Binance &amp; more</span></div></div></div>' +
    '<footer><div class="container"><div class="cols">' +
    '<div><h4>Contact</h4><a href="mailto:audcyber21@gmail.com">audcyber21@gmail.com</a><a href="https://wa.me/254799330764" target="_blank" rel="noopener">WhatsApp: +254 799 330 764</a><a href="https://t.me/auditechh" target="_blank" rel="noopener">Telegram: @auditechh</a><a>Mon - Sun, 8 AM - 11:59 PM EAT</a></div>' +
    '<div><h4>Services</h4>' + PAGES.slice(1).map(function (p) { return '<a href="' + p[0] + '">' + p[1] + '</a>'; }).join("") + '</div>' +
    '<div><h4>Company</h4><a href="#">About Us</a><a href="#">Contact Us</a><a href="#">Reseller Panel</a></div>' +
    '<div><h4>Legal</h4><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Refund Policy</a></div>' +
    '</div><div class="copy">© 2026 AUDITECH GSM. All rights reserved.</div></div></footer>' +

    '<div class="modal" id="welcome"><div class="box"><button class="x" data-close>×</button>' +
    '<h3>Welcome to Auditech GSM</h3>' +
    '<p style="margin:0 0 10px;color:#cbd5e1;font-size:13px">Add credit to your account, then order any service.</p>' +
    '<div class="pay"><b>🟡 Binance Pay</b><br>Binance ID: <b>775300013</b><br>Name: <b>Alphatech1</b></div>' +
    '<div class="pay"><b>🟢 M-Pesa Till Number</b><br>Till: <b>8248090</b><br>Name: <b>Audryans Cyber</b></div>' +
    '<div class="pay"><b>🟢 M-Pesa Send Money</b><br>Number: <b>+254 799 330 764</b><br>Name: <b>Brian Mboga</b></div>' +
    '<p style="margin:6px 0 10px;color:#cbd5e1;font-size:12px">Pay with any method above, then upload your payment screenshot on the Add Credit page. Credit is added after confirmation.</p>' +
    '<div style="text-align:center;margin:6px 0"><a class="btn btn-primary" href="add-credit.html">Upload payment proof →</a></div>' +
    '<h3 style="margin-top:14px;font-size:15px;color:#facc15">Membership tiers</h3>' +
    '<div class="tier"><b>User:</b> standard rates.</div><div class="tier"><b>Reseller:</b> discounted rates.</div><div class="tier"><b>Distributor:</b> bigger price reductions and priority support.</div>' +
    '<div style="margin-top:12px;text-align:center"><button class="btn btn-primary" data-close>Got it</button></div></div></div>' +

    '<div class="modal" id="auth"><div class="authbox"><button class="x" data-close>×</button>' +
    '<h3 style="margin-top:0" id="authTitle">Log In</h3>' +
    '<form class="form" id="authForm">' +
    '<div id="regFields" style="display:none"><label>Full name</label><input name="name" autocomplete="name">' +
    '<label>Phone / WhatsApp</label><input name="phone" autocomplete="tel"></div>' +
    '<label>Email</label><input name="email" type="email" required autocomplete="email">' +
    '<label>Password</label><input name="password" type="password" required minlength="6" autocomplete="current-password">' +
    '<div class="msg" id="authMsg"></div>' +
    '<button class="btn btn-primary" id="authSubmit" style="width:100%;margin-top:16px">Log In</button></form>' +
    '<button class="btn btn-ghost" id="authSwitch" style="width:100%;margin-top:10px">Create Account</button></div></div>' +

    '<div class="modal" id="orderModal"><div class="authbox"><button class="x" data-close>×</button>' +
    '<h3 style="margin-top:0">Place order</h3><div id="orderBody"></div></div></div>';

  document.getElementById("site-header").innerHTML = header;
  document.getElementById("site-footer").innerHTML = footer;

  // ---- Service cards ----
  var esc = function (x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var SVC = {};          // id -> service row, for the order popup
  var live = false;      // true once services came from Supabase

  function card(s) {
    SVC[s.id] = s;
    var initials = s.name.split(" ").slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
    var p = Number(s.price), shown = window.AT ? AT.price(p) : p;
    var unit = s.unit_based ? ' / credit' : '';
    var priceTxt = p > 0 ? shown + ' USD' + unit + (shown < p ? ' <s style="opacity:.6">' + p + '</s>' : '') : 'Price on request';
    var thumb = s.logo_url ? '<div class="thumb logo"><img src="' + esc(s.logo_url) + '" alt="" loading="lazy"></div>' : '<div class="thumb">' + esc(initials) + '</div>';
    return '<a class="svc" href="#" data-order="' + esc(s.id) + '">' + thumb + '<div><div class="t">' + esc(s.name) + '</div>' +
      '<span class="badge b-price">' + priceTxt + '</span><span class="badge b-time">' + esc(s.delivery || "Instant") + '</span></div></a>';
  }
  // Fallback rows from services.js (used only if Supabase isn't configured / unreachable)
  function fromStatic(cat) {
    return (DATA[cat] || []).map(function (n, i) { return { id: "s-" + cat + i, name: n[0], price: n[1], delivery: n[2] || "Instant", category: cat }; });
  }
  var list = document.getElementById("list");
  var cat = document.body.getAttribute("data-cat");
  var recent = document.getElementById("recent");
  var ROWS = null;       // all services (array)

  function render() {
    SVC = {};
    if (list && cat) {
      var rows = ROWS.filter(function (r) { return r.category === cat; });
      list.innerHTML = rows.length ? rows.map(card).join("")
        : '<p class="empty">Nothing here yet. The admin adds items from the panel.</p>';
      applyFilter();
    }
    if (recent) {
      var pool = ROWS.filter(function (r) { return r.category === "rent" || r.category === "activation"; });
      if (live) pool = pool.slice().sort(function (a, b) { return String(b.created_at).localeCompare(String(a.created_at)); });
      recent.innerHTML = pool.slice(0, 6).map(card).join("");
    }
  }
  function staticRows() {
    return fromStatic("rent").concat(fromStatic("activation"), fromStatic("imei"), fromStatic("mdm"), fromStatic("anticrack"));
  }
  ROWS = staticRows();
  if (!window.AT || !AT.configured) { render(); }
  else {
    if (list) list.innerHTML = '<p class="empty">Loading…</p>';
    AT.ready.then(function () { return AT.loadServices(false); }).then(function (r) {
      if (r.error) throw r.error;
      ROWS = r.data; live = true; render();
    }).catch(function (e) { console.error(e); ROWS = staticRows(); render(); });
  }

  // ---- Search: filters as the user types ----
  var form = document.getElementById("searchForm");
  var noMatch = null;
  var CAT_PAGE = { rent: "tool-rents.html", activation: "activation.html", imei: "imei.html", mdm: "mdm.html", anticrack: "anti-crack.html" };

  function tokens(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); }
  function matches(name, toks) {
    var n = name.toLowerCase();
    for (var i = 0; i < toks.length; i++) if (n.indexOf(toks[i]) === -1) return false;
    return true;
  }

  // Category pages: show/hide the cards already on the page (every word must match)
  function applyFilter() {
    if (!form || !list) return;
    var toks = tokens(form.q.value), shown = 0, cards = list.querySelectorAll(".svc");
    cards.forEach(function (el) {
      var t = el.querySelector(".t");
      var ok = !toks.length || matches(t ? t.textContent : el.textContent, toks);
      el.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    if (!noMatch) {
      noMatch = document.createElement("p");
      noMatch.className = "empty";
      list.parentNode.insertBefore(noMatch, list.nextSibling);
    }
    var hasCards = cards.length > 0;
    noMatch.style.display = toks.length && hasCards && !shown ? "" : "none";
    noMatch.textContent = 'No services match "' + form.q.value.trim() + '".';
  }

  // Home page: live dropdown of the best matches across ALL categories
  var drop = null;
  function homeDropdown() {
    if (!form || list) return;
    var toks = tokens(form.q.value);
    if (!drop) {
      drop = document.createElement("div");
      drop.className = "sresults";
      form.appendChild(drop);
    }
    if (!toks.length) { drop.style.display = "none"; drop.innerHTML = ""; return; }
    var hits = ROWS.filter(function (r) { return matches(r.name, toks); });
    SVC = {};
    drop.innerHTML = hits.length
      ? hits.slice(0, 8).map(card).join("") +
        (hits.length > 8 ? '<div class="more">' + (hits.length - 8) + ' more - press Enter to see them in their category</div>' : "")
      : '<div class="more">No services match "' + esc(form.q.value.trim()) + '".</div>';
    drop.style.display = "block";
  }

  if (form) {
    form.q.setAttribute("autocomplete", "off");
    form.q.addEventListener("input", function () { applyFilter(); homeDropdown(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = form.q.value.trim();
      if (!list) {
        // Home: jump to the category of the best match (falls back to IMEI)
        var toks = tokens(q), first = toks.length ? ROWS.filter(function (r) { return matches(r.name, toks); })[0] : null;
        location.href = (first && CAT_PAGE[first.category] || "imei.html") + "?q=" + encodeURIComponent(q);
        return;
      }
      applyFilter();
    });
    // close the home dropdown when clicking elsewhere
    document.addEventListener("click", function (e) {
      if (drop && !e.target.closest("#searchForm")) drop.style.display = "none";
    });
    form.q.addEventListener("focus", function () { homeDropdown(); });
    var pre = new URLSearchParams(location.search).get("q");
    if (pre && list) { form.q.value = pre; applyFilter(); }
  }

  // ---- Modals ----
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) document.getElementById(o.getAttribute("data-open")).classList.add("open");
    if (e.target.closest("[data-close]")) e.target.closest(".modal").classList.remove("open");
  });
  if (current === "index.html" && !sessionStorage.getItem("welcomed")) {
    setTimeout(function () { document.getElementById("welcome").classList.add("open"); }, 1000);
    try { sessionStorage.setItem("welcomed", "1"); } catch (e) {}
  }

  // ---- Account state in header ----
  function paintHeader() {
    var slot = document.getElementById("authSlot");
    if (!slot || !window.AT || !AT.configured) return;
    var p = AT.profile;
    var cur = document.querySelector("select.cur");
    if (cur) cur.style.display = p ? "none" : "";   // hide currency selector while logged in
    if (!p) { slot.innerHTML = '<button class="btn btn-primary" data-open="auth">Login / Register</button>'; return; }
    slot.innerHTML = '<span class="acct"><a class="bal" href="add-credit.html" title="Add credit">$' + AT.money(p.balance) + ' +</a>' +
      '<a class="btn btn-ghost" href="account.html">Account</a>' +
      (p.is_admin ? '<a class="btn btn-ghost" href="admin.html">Admin</a>' : '') +
      '<button class="btn btn-primary" id="logoutBtn">Logout</button></span>';
  }
  if (window.AT) AT.onChange(function () { paintHeader(); if (live && (list || recent)) render(); });
  if (window.AT) AT.ready.then(paintHeader);

  // ---- Login / Register ----
  var mode = "login";
  function setMode(m) {
    mode = m;
    var reg = m === "register";
    document.getElementById("authTitle").textContent = reg ? "Create Account" : "Log In";
    document.getElementById("authSubmit").textContent = reg ? "Create Account" : "Log In";
    document.getElementById("authSwitch").textContent = reg ? "I already have an account" : "Create Account";
    document.getElementById("regFields").style.display = reg ? "block" : "none";
    document.getElementById("authMsg").textContent = "";
  }
  function authMsg(t, ok) { var m = document.getElementById("authMsg"); m.textContent = t; m.className = "msg" + (ok ? " ok" : ""); }
  document.getElementById("authSwitch").addEventListener("click", function () { setMode(mode === "login" ? "register" : "login"); });
  document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!window.AT || !AT.configured) { authMsg("Backend is not connected yet. Add your Supabase keys in config.js."); return; }
    var f = e.target, btn = document.getElementById("authSubmit");
    btn.disabled = true; authMsg("Please wait…", true);
    var job = mode === "register"
      ? AT.signUp(f.email.value.trim(), f.password.value, f.name.value.trim(), f.phone.value.trim())
      : AT.signIn(f.email.value.trim(), f.password.value);
    job.then(function (r) {
      btn.disabled = false;
      if (r.error) { authMsg(r.error.message); return; }
      if (mode === "register" && !r.data.session) { authMsg("Account created. Check your email to confirm it, then log in.", true); setMode("login"); authMsg("Account created. Check your email to confirm it, then log in.", true); return; }
      f.reset(); document.getElementById("auth").classList.remove("open");
    }, function (err) { btn.disabled = false; authMsg(err.message || "Something went wrong."); });
  });
  document.addEventListener("click", function (e) {
    if (e.target.id === "logoutBtn") AT.signOut().then(function () { if (/account|add-credit/.test(current)) location.href = "index.html"; });
  });

  // ---- Ordering ----
  function openOrder(id) {
    var s = SVC[id], body = document.getElementById("orderBody"), modal = document.getElementById("orderModal");
    if (!s) return;
    if (!window.AT || !AT.configured || !live) { alert("Ordering is not available yet - the backend is not connected."); return; }
    if (!AT.profile) { document.getElementById("auth").classList.add("open"); setMode("login"); authMsg("Please log in to place an order.", true); return; }
    var base = Number(s.price);
    if (base <= 0) { body.innerHTML = '<p><b>' + esc(s.name) + '</b></p><p>This service is priced on request. Contact us on WhatsApp or Telegram (see footer) for a quote.</p>'; modal.classList.add("open"); return; }

    var unitBased = !!s.unit_based, minQty = Math.max(1, parseInt(s.min_qty, 10) || 1), bal = Number(AT.profile.balance);
    var unitPrice = AT.price(base);

    body.innerHTML = '<p style="margin:0 0 8px"><b>' + esc(s.name) + '</b></p>' +
      '<p style="margin:0 0 6px">' + (unitBased ? 'Price per credit: <b>' + AT.money(unitPrice) + ' USD</b>' : 'Price: <b>' + AT.money(unitPrice) + ' USD</b>') +
      ' &nbsp; Delivery: ' + esc(s.delivery) + '</p>' +
      '<p style="margin:0 0 10px">Your balance: <b>' + AT.money(bal) + ' USD</b></p>' +
      '<form class="form" id="orderForm">' +
      (unitBased ?
        '<label>How many credits?' + (minQty > 1 ? ' (minimum ' + minQty + ')' : '') + '</label>' +
        '<div class="qty"><button type="button" class="btn btn-ghost" data-step="-1" aria-label="Less">−</button>' +
        '<input name="qty" type="number" inputmode="numeric" min="' + minQty + '" max="100000" step="1" value="' + minQty + '" required>' +
        '<button type="button" class="btn btn-ghost" data-step="1" aria-label="More">+</button></div>' +
        '<div class="qtyquick">' + [minQty, 10, 25, 50, 100].filter(function (n, i, a) { return n >= minQty && a.indexOf(n) === i; }).map(function (n) {
          return '<button type="button" class="btn btn-ghost btn-sm" data-qty="' + n + '">' + n + '</button>'; }).join("") + '</div>' +
        '<div class="totalbox">Total: <b id="orderTotal"></b> USD <span id="orderLeft"></span></div>' : '') +
      '<label>IMEI / Serial / Username / Notes</label>' +
      '<textarea name="details" rows="3" maxlength="2000" placeholder="Enter the details this service needs"></textarea>' +
      '<div class="msg" id="orderMsg"></div>' +
      '<button class="btn btn-primary" id="orderBtn" style="width:100%;margin-top:14px"></button></form>';
    modal.classList.add("open");

    var form = document.getElementById("orderForm"), btn = document.getElementById("orderBtn"), msg = document.getElementById("orderMsg");

    // Reads the quantity box; returns null if it is empty / not a whole number / below the minimum
    function readQty() {
      if (!unitBased) return 1;
      var raw = form.qty.value.trim();
      if (!/^\d+$/.test(raw)) return null;
      var n = parseInt(raw, 10);
      return n >= minQty && n <= 100000 ? n : null;
    }
    function refresh() {
      var q = readQty();
      var total = q == null ? null : AT.total(base, q);
      if (unitBased) {
        document.getElementById("orderTotal").textContent = total == null ? "-" : AT.money(total);
        document.getElementById("orderLeft").textContent = total != null && total <= bal ? "(balance after: " + AT.money(bal - total) + ")" : "";
      }
      msg.className = "msg";
      if (q == null) { msg.textContent = "Enter a whole number" + (minQty > 1 ? " of at least " + minQty : "") + "."; btn.disabled = true; btn.textContent = "Enter quantity"; return; }
      if (total > bal) {
        msg.innerHTML = 'Not enough credit (need ' + AT.money(total) + ' USD). <a href="add-credit.html" style="text-decoration:underline">Add credit</a> first.';
        btn.disabled = true; btn.textContent = "Not enough credit"; return;
      }
      msg.textContent = ""; btn.disabled = false;
      btn.innerHTML = 'Confirm &amp; pay ' + AT.money(total) + ' USD';
    }
    if (unitBased) {
      form.qty.addEventListener("input", refresh);
      form.addEventListener("click", function (e) {
        var st = e.target.closest("[data-step]"), qk = e.target.closest("[data-qty]");
        if (!st && !qk) return;
        var cur = readQty(); if (cur == null) cur = minQty;
        form.qty.value = qk ? qk.getAttribute("data-qty") : Math.min(100000, Math.max(minQty, cur + Number(st.getAttribute("data-step"))));
        refresh();
      });
    }
    refresh();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = readQty(); if (q == null) { refresh(); return; }
      btn.disabled = true; msg.className = "msg ok"; msg.textContent = "Placing order…";
      var args = { p_service_id: s.id, p_details: form.details.value.trim() };
      if (unitBased) args.p_qty = q;   // normal services keep the old call shape
      AT.sb.rpc("place_order", args).then(function (r) {
        if (r.error) { btn.disabled = false; msg.className = "msg"; msg.textContent = r.error.message; return; }
        AT.refreshProfile().then(function () { paintHeader(); });
        body.innerHTML = '<p>✅ Order <b>#' + esc(r.data) + '</b> placed' + (unitBased ? ' (' + q + ' credits)' : '') + '. Track it under <a href="account.html" style="text-decoration:underline">your account</a>.</p>' +
          '<button class="btn btn-primary" data-close>Close</button>';
      });
    });
  }
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-order]");
    if (o) { e.preventDefault(); openOrder(o.getAttribute("data-order")); }
  });
})();
