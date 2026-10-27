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
    var priceTxt = p > 0 ? shown + ' USD' + (shown < p ? ' <s style="opacity:.6">' + p + '</s>' : '') : 'Price on request';
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
      var f = document.getElementById("searchForm");
      if (f && f.q.value) f.dispatchEvent(new Event("submit"));
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

  // ---- Search (per-page filter, or jump to IMEI Service from Home) ----
  var form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = form.q.value.toLowerCase();
      if (!list) { location.href = "imei.html?q=" + encodeURIComponent(q); return; }
      list.querySelectorAll(".svc").forEach(function (el) {
        el.style.display = el.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none";
      });
    });
    var pre = new URLSearchParams(location.search).get("q");
    if (pre && list) { form.q.value = pre; form.dispatchEvent(new Event("submit")); }
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
    var price = AT.price(base), bal = Number(AT.profile.balance), short = bal < price;
    body.innerHTML = '<p style="margin:0 0 8px"><b>' + esc(s.name) + '</b></p>' +
      '<p style="margin:0 0 6px">Price: <b>' + AT.money(price) + ' USD</b> &nbsp; Delivery: ' + esc(s.delivery) + '</p>' +
      '<p style="margin:0 0 10px">Your balance: <b>' + AT.money(bal) + ' USD</b></p>' +
      (short ? '<div class="msg">Not enough credit. <a href="add-credit.html" style="text-decoration:underline">Add credit</a> first.</div>' :
        '<form class="form" id="orderForm"><label>IMEI / Serial / Username / Notes</label>' +
        '<textarea name="details" rows="3" maxlength="2000" placeholder="Enter the details this service needs"></textarea>' +
        '<div class="msg" id="orderMsg"></div>' +
        '<button class="btn btn-primary" style="width:100%;margin-top:14px">Confirm &amp; pay ' + AT.money(price) + ' USD</button></form>');
    modal.classList.add("open");
    var form = document.getElementById("orderForm");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = form.querySelector("button"), m = document.getElementById("orderMsg");
      b.disabled = true; m.className = "msg ok"; m.textContent = "Placing order…";
      AT.sb.rpc("place_order", { p_service_id: s.id, p_details: form.details.value.trim() }).then(function (r) {
        if (r.error) { b.disabled = false; m.className = "msg"; m.textContent = r.error.message; return; }
        AT.refreshProfile().then(function () { paintHeader(); });
        body.innerHTML = '<p>✅ Order <b>#' + esc(r.data) + '</b> placed. Track it under <a href="account.html" style="text-decoration:underline">your account</a>.</p>' +
          '<button class="btn btn-primary" data-close>Close</button>';
      });
    });
  }
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-order]");
    if (o) { e.preventDefault(); openOrder(o.getAttribute("data-order")); }
  });
})();
