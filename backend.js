/* Supabase wrapper shared by the public site and the admin panel.
   Exposes window.AT. Needs the supabase-js CDN script + config.js loaded first. */
(function () {
  var cfg = window.AT_CONFIG || {};
  // Tidy common paste mistakes: spaces, quotes, trailing "/", or "/rest/v1", "/auth/v1" on the end.
  if (cfg.SUPABASE_URL) {
    cfg.SUPABASE_URL = String(cfg.SUPABASE_URL).trim()
      .replace(/\/(rest|auth|storage)\/v1.*$/i, "").replace(/\/+$/, "");
  }
  if (cfg.SUPABASE_ANON_KEY) cfg.SUPABASE_ANON_KEY = String(cfg.SUPABASE_ANON_KEY).trim();
  var configured = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    cfg.SUPABASE_URL.indexOf("YOUR-PROJECT") === -1 && window.supabase);

  var AT = window.AT = {
    configured: configured,
    sb: null,
    session: null,
    profile: null,
    discounts: { user: 0, reseller: 10, distributor: 20 },
    listeners: []
  };

  // Escape any text before putting it into innerHTML (stops script injection).
  AT.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  AT.money = function (n) { return (Math.round(Number(n || 0) * 100) / 100).toFixed(2); };
  AT.price = function (base) {
    var pct = AT.discounts[(AT.profile && AT.profile.tier) || "user"] || 0;
    return Math.round(base * (1 - pct / 100) * 100) / 100;
  };
  // Total for quantity-based services (credits): unit price x qty, tier discount, rounded once.
  // Mirrors place_order() in supabase/migration_quantity.sql so the preview equals the charge.
  AT.total = function (base, qty) {
    var pct = AT.discounts[(AT.profile && AT.profile.tier) || "user"] || 0;
    return Math.round(base * qty * (1 - pct / 100) * 100) / 100;
  };
  AT.onChange = function (fn) { AT.listeners.push(fn); };
  function emit() { AT.listeners.forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } }); }

  AT.refreshProfile = function () {
    if (!AT.sb || !AT.session) { AT.profile = null; return Promise.resolve(null); }
    return AT.sb.from("profiles").select("*").eq("id", AT.session.user.id).single()
      .then(function (r) { AT.profile = r.data || null; return AT.profile; });
  };

  AT.signUp = function (email, password, name, phone) {
    return AT.sb.auth.signUp({
      email: email, password: password,
      options: { data: { full_name: name, phone: phone } }
    });
  };
  AT.signIn = function (email, password) {
    return AT.sb.auth.signInWithPassword({ email: email, password: password });
  };
  AT.signOut = function () { return AT.sb.auth.signOut(); };

  AT.loadServices = function (includeInactive) {
    var q = AT.sb.from("services").select("*").order("name", { ascending: true }).range(0, 4999);
    if (!includeInactive) q = q.eq("active", true);
    return q;
  };

  AT.ready = new Promise(function (resolve) {
    if (!configured) { resolve(AT); return; }
    AT.sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

    AT.sb.from("tier_discounts").select("*").then(function (r) {
      if (r.data) r.data.forEach(function (d) { AT.discounts[d.tier] = Number(d.percent); });
    });

    AT.sb.auth.getSession().then(function (r) {
      AT.session = r.data.session;
      return AT.refreshProfile();
    }).then(function () { resolve(AT); emit(); }, function () { resolve(AT); });

    AT.sb.auth.onAuthStateChange(function (event, session) {
      AT.session = session;
      // defer: calling supabase inside this callback can deadlock
      setTimeout(function () { AT.refreshProfile().then(emit); }, 0);
    });
  });
})();
