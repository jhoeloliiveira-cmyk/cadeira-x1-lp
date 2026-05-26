/* global React, ReactDOM */
// X1 Barber Chair landing page — app.jsx

const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   ICONS — line, 1.5px stroke, currentColor
   ============================================================ */
const Icon = {
  Arrow: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14" /><path d="m13 5 7 7-7 7" />
    </svg>
  ),
  Check: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  X: (p) => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Recline: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 19h18" /><path d="M5 19v-3a3 3 0 0 1 3-3h6" />
      <path d="m20 9-8 5-3-5" /><circle cx="20" cy="6" r="1.5" />
    </svg>
  ),
  Diamond: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 3h12l4 6-10 12L2 9z" /><path d="m6 3 6 6 6-6" /><path d="M2 9h20" />
    </svg>
  ),
  Shield: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Lever: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" /><path d="M12 9V3M12 21v-6M3 12h6M15 12h6" />
    </svg>
  ),
  Headrest: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="6" y="3" width="12" height="7" rx="2" /><path d="M12 10v4" /><rect x="4" y="14" width="16" height="7" rx="2" />
    </svg>
  ),
  Frame: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4h16v16H4z" /><path d="M4 9h16M4 15h16M9 4v16M15 4v16" />
    </svg>
  ),
  Upholstery: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 8c4-4 12-4 16 0v8c-4 4-12 4-16 0z" /><path d="M8 8v8M12 8v8M16 8v8" />
    </svg>
  ),
  Foam: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 10c3-2 5-2 6 0s3 2 6 0 5-2 6 0" /><path d="M3 15c3-2 5-2 6 0s3 2 6 0 5-2 6 0" />
    </svg>
  ),
  Footrest: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7h18" /><path d="M5 7v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" /><path d="M9 15v3M15 15v3M6 21h12" />
    </svg>
  ),
};

/* ============================================================
   SCROLL UTIL
   ============================================================ */
const scrollToForm = (e) => {
  if (e) e.preventDefault();
  const t = document.getElementById('quote-form');
  if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   CTA BUTTON (single CTA, repeated, all scroll to form)
   ============================================================ */
const CTAButton = ({ label = 'Request a Quote', className = '', onClick }) => (
  <button
    type="button"
    className={`btn-cta ${className}`}
    onClick={onClick || scrollToForm}
  >
    <span>{label}</span>
    <span className="arrow"><Icon.Arrow /></span>
  </button>
);

/* ============================================================
   NAV
   ============================================================ */
const Nav = () => (
  <nav className="nav">
    <div className="container nav-inner">
      <a href="#top" className="brand" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'});}}>
        <img src="assets/barbermaxx-logo.png" alt="Barber Maxx" />
        <span className="brand-divider" aria-hidden />
        <span className="brand-tag">X1 <span className="accent">·</span> Pro Series</span>
      </a>
      <div className="nav-meta" aria-hidden>
        <span className="dot" />
        <span>In Stock · Ships from US</span>
      </div>
      <CTAButton className="nav-cta" />
    </div>
  </nav>
);

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => (
  <section className="hero" id="top">
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="reveal hero-stamp">
          <img src="assets/barbermaxx-logo.png" alt="Barber Maxx" />
          <span className="txt">Presented by <strong>Barber Maxx</strong></span>
        </div>
        <div className="reveal"><span className="eyebrow">X1 · Professional Barber Chair</span></div>
        <div className="hero-headline reveal reveal-1">
          <h1 className="display">
            Upgrade Your<br />
            Barbershop With<br />
            <span className="accent">The X1</span> <span className="stroke">Barber</span><br />
            Chair.
          </h1>
        </div>
        <p className="lead reveal reveal-2">
          Racing-inspired design, professional comfort, and heavy-duty construction
          built for barbers who want their shop to look as sharp as their cuts.
        </p>
        <div className="hero-actions reveal reveal-3">
          <CTAButton />
          <a href="#features" className="btn-ghost" onClick={(e)=>{e.preventDefault();document.getElementById('features').scrollIntoView({behavior:'smooth'});}}>
            See Features
          </a>
        </div>
        <div className="hero-meta reveal reveal-4">
          <span className="benefit-badge"><span className="ico"><Icon.Recline /></span>Reclining Comfort</span>
          <span className="benefit-badge"><span className="ico"><Icon.Diamond /></span>Premium Black Finish</span>
          <span className="benefit-badge"><span className="ico"><Icon.Shield /></span>Heavy-Duty Structure</span>
        </div>
      </div>

      <div className="hero-image reveal reveal-2">
        <div className="stage" />
        <div className="grid-lines" />
        <div className="hero-tag top-right">138° Recline</div>
        <div className="hero-tag mid-left">Carbon Steel 1020</div>
        <div className="hero-tag bot-right">Stainless Footrest</div>
        <img src="assets/x1-three-quarter.jpg" alt="X1 Barber Chair — three-quarter view" loading="eager" />
        <div className="hero-floor" />
      </div>
    </div>
  </section>
);

/* ============================================================
   MARQUEE
   ============================================================ */
const Marquee = () => {
  const items = [
    'Built For The Daily Cut',
    'Made For Professional Barbers',
    'Heavy-Duty Carbon Steel',
    'Stainless Steel Footrest',
    'Reclining System',
    'Adjustable Headrest',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">
              {t}<span className="sep" />
            </span>
            {i % 2 === 1 && (
              <img src="assets/barbermaxx-logo.png" alt="" className="marquee-logo" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   PAIN
   ============================================================ */
const Pain = () => (
  <section className="pain">
    <div className="container pain-grid">
      <div className="reveal">
        <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>Section 02 · The Reality</span>
        <h2 className="pain-quote" style={{ marginTop: 20 }}>
          Your chair says <br className="hide-sm" />
          <span className="accent">a lot</span> before<br className="hide-sm" />
          the first cut begins.
        </h2>
      </div>

      <div className="pain-points reveal reveal-1">
        <p className="lead" style={{ marginBottom: 8 }}>
          An old, uncomfortable, or visually weak chair makes the entire shop feel
          less premium — no matter how good the cut is. A strong barber chair raises
          the client experience and the perceived value of every service you sell.
        </p>

        <div className="pain-point">
          <span className="num">01</span>
          <div>
            <h4 className="pain-h">Worn-Out Chairs Lower Your Price Ceiling</h4>
            <p>Clients pay for the room as much as the cut. Faded vinyl and weak posture limit what you can charge.</p>
          </div>
        </div>
        <div className="pain-point">
          <span className="num">02</span>
          <div>
            <h4 className="pain-h">Uncomfortable Seats Cut Sessions Short</h4>
            <p>If a client shifts every 90 seconds, you lose precision — and they lose the reason to come back.</p>
          </div>
        </div>
        <div className="pain-point">
          <span className="num">03</span>
          <div>
            <h4 className="pain-h">A Statement Chair Sells The Shop</h4>
            <p>Every photo, every walk-in, every social post starts with the chair. Make sure yours is doing the work.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   DESIRE
   ============================================================ */
const desireItems = [
  { idx: '01', lbl: 'Racing-Inspired Design', meta: 'Sculpted Back', key: true },
  { idx: '02', lbl: 'Comfortable Backrest & Seat', meta: 'Multi-Density Foam' },
  { idx: '03', lbl: 'Reclining System', meta: 'Up to 138°' },
  { idx: '04', lbl: 'Adjustable Headrest', meta: 'Travel +75mm' },
  { idx: '05', lbl: 'Stainless Steel Footrest', meta: 'Laser-Engraved' },
  { idx: '06', lbl: 'Strong Black Professional Look', meta: 'Matte / Premium' },
  { idx: '07', lbl: 'Built For Daily Barbershop Use', meta: 'Carbon Steel 1020' },
];

const Desire = () => (
  <section className="desire" id="desire">
    <div className="container">
      <div className="desire-header">
        <div className="reveal">
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>Section 03 · The Centerpiece</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            A centerpiece, not<br />just a <span style={{color:'var(--c-accent)'}}>seat.</span>
          </h2>
        </div>
        <p className="lead reveal reveal-1">
          The X1 is engineered to anchor the room. Racing-style geometry,
          professional-grade materials, and the kind of presence that makes the
          rest of the shop level up to match.
        </p>
      </div>

      <div className="desire-grid">
        <div className="desire-image reveal">
          <img src="assets/x1-front.jpg" alt="X1 Barber Chair — front view" loading="lazy" />
        </div>
        <div className="desire-list reveal reveal-1">
          {desireItems.map((it) => (
            <div key={it.idx} className={`item ${it.key ? 'is-key' : ''}`}>
              <span className="idx">{it.idx}</span>
              <span className="lbl">{it.lbl}</span>
              <span className="meta">{it.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   FEATURES
   ============================================================ */
const features = [
  { n: '01', Ico: Icon.Lever,      h: 'Reclining System',     p: 'Solid machined steel components with smooth lever activation. Locks securely at any angle up to 138°.' },
  { n: '02', Ico: Icon.Headrest,   h: 'Adjustable Headrest',  p: 'Travel range designed to adapt to clients of any size and to every service — from a fade to a hot-towel shave.' },
  { n: '03', Ico: Icon.Frame,      h: 'Reinforced Structure', p: 'Carbon steel 1020 frame with electrostatic paint coating. Built to absorb the impact of a full barbershop day.' },
  { n: '04', Ico: Icon.Upholstery, h: 'Premium Upholstery',   p: 'Heavy synthetic / vinyl-style upholstery in a deep matte black finish. Wipes clean. Resists fading.' },
  { n: '05', Ico: Icon.Foam,       h: 'Comfortable Foam Layers', p: 'Multi-density foam stack — firm support at the base, plush response on top. Comfortable through hour-long appointments.' },
  { n: '06', Ico: Icon.Footrest,   h: 'Stainless Steel Footrest', p: 'Brushed stainless steel finish, laser-cut and engraved. Built for daily steps in and out of the chair.' },
];

const Features = () => (
  <section className="features" id="features">
    <div className="container">
      <div className="features-head">
        <div className="reveal">
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>Section 04 · Engineered</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            Built right.<br />
            Down to <span style={{color:'var(--c-accent)'}}>every</span> stitch.
          </h2>
        </div>
        <p className="lead reveal reveal-1">
          Every component on the X1 is specified for one job — to keep working,
          looking sharp, and feeling premium through years of daily use.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((f, i) => (
          <article key={f.n} className={`feature-card reveal reveal-${(i % 4) + 1}`}>
            <span className="num">{f.n}</span>
            <div className="ico-wrap"><f.Ico /></div>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   VISUAL BANNER
   ============================================================ */
const VisualBanner = () => (
  <section className="visual-banner">
    <img src="assets/barbermaxx-logo.png" alt="" className="visual-banner-watermark" aria-hidden />
    <div className="container visual-grid">
      <div className="visual-copy reveal">
        <span className="eyebrow">Section 05 · In The Room</span>
        <h2 className="display">
          Built to <span className="accent">impress.</span><br />
          Designed to <span className="accent">perform.</span>
        </h2>
        <p className="lead">
          Ready for the daily rhythm of a real barbershop — cut after cut,
          client after client, day after day.
        </p>
        <div className="visual-stats">
          <div className="stat">
            <span className="v">138<span className="u">°</span></span>
            <span className="k">Max Recline</span>
          </div>
          <div className="stat">
            <span className="v">680<span className="u">mm</span></span>
            <span className="k">Base Diameter</span>
          </div>
          <div className="stat">
            <span className="v">1020<span className="u">·</span></span>
            <span className="k">Carbon Steel Frame</span>
          </div>
          <div className="stat">
            <span className="v">+75<span className="u">mm</span></span>
            <span className="k">Headrest Travel</span>
          </div>
        </div>
        <div><CTAButton /></div>
      </div>

      <div className="visual-image reveal reveal-1">
        <div className="ring" />
        <div className="ring inner" />
        <img src="assets/x1-back.jpg" alt="X1 Barber Chair — rear view detail" loading="lazy" />
      </div>
    </div>
  </section>
);

/* ============================================================
   COMPARISON
   ============================================================ */
const Compare = () => (
  <section className="compare">
    <div className="container">
      <div className="compare-head">
        <div className="reveal">
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>Section 06 · Side By Side</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            Same shop.<br />
            <span style={{color:'var(--c-accent)'}}>Different</span> chair.
          </h2>
        </div>
        <p className="lead reveal reveal-1">
          Swapping the centerpiece changes how the room reads — to walk-ins,
          on social, and in your daily routine behind the chair.
        </p>
      </div>

      <div className="compare-grid">
        <div className="compare-card old reveal">
          <span className="compare-label">Old chair</span>
          <h3 className="compare-name">The Worn-Out Setup</h3>
          <ul>
            <li><span className="mk"><Icon.X /></span>Worn-out appearance</li>
            <li><span className="mk"><Icon.X /></span>Less comfort for the client</li>
            <li><span className="mk"><Icon.X /></span>Weak shop perception</li>
            <li><span className="mk"><Icon.X /></span>Lower premium feel</li>
            <li><span className="mk"><Icon.X /></span>Limits what you can charge</li>
          </ul>
        </div>

        <div className="compare-vs reveal reveal-1" aria-hidden>VS</div>

        <div className="compare-card x1 reveal reveal-2">
          <span className="compare-label"><span style={{width:6,height:6,background:'var(--c-accent)',borderRadius:'50%',display:'inline-block',boxShadow:'0 0 12px var(--c-accent-glow)'}} />X1 Barber Chair</span>
          <h3 className="compare-name">The Statement Centerpiece</h3>
          <ul>
            <li><span className="mk"><Icon.Check /></span>Strong visual impact</li>
            <li><span className="mk"><Icon.Check /></span>More comfort for the client</li>
            <li><span className="mk"><Icon.Check /></span>Professional shop presence</li>
            <li><span className="mk"><Icon.Check /></span>Premium experience, top to bottom</li>
            <li><span className="mk"><Icon.Check /></span>Raises the value of every cut</li>
          </ul>
          <div style={{ marginTop: 8 }}>
            <CTAButton />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   FORM
   ============================================================ */
const initialForm = {
  name: '', business: '', email: '', phone: '', location: '', quantity: '1', message: '',
};

function validateForm(f) {
  const errs = {};
  if (!f.name.trim()) errs.name = 'Please enter your name.';
  if (!f.business.trim()) errs.business = 'Please enter your business name.';
  if (!f.email.trim()) errs.email = 'Please enter your email.';
  else if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = 'Please enter a valid email.';
  if (!f.phone.trim()) errs.phone = 'Please enter a phone number.';
  if (!f.location.trim()) errs.location = 'Please enter your city / state.';
  return errs;
}

const LeadForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const update = (k) => (e) => {
    const v = e.target.value;
    setForm((prev) => ({ ...prev, [k]: v }));
    if (touched[k]) {
      setErrors(validateForm({ ...form, [k]: v }));
    }
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateForm(form));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    setErrors(errs);
    setTouched({ name: true, business: true, email: true, phone: true, location: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="form-success reveal in">
        <div className="ok-mk"><Icon.Check /></div>
        <h3>Request Received.</h3>
        <p>
          Thanks, {form.name.split(' ')[0] || 'there'}. We've got your details for{' '}
          <strong>{form.business || 'your shop'}</strong>. A specialist will reach out
          within one business day with pricing and shipping options for{' '}
          {form.quantity} {form.quantity === '1' ? 'chair' : 'chairs'}.
        </p>
        <button type="button" className="btn-ghost" onClick={() => { setSubmitted(false); setForm(initialForm); setErrors({}); setTouched({}); }}>
          Submit Another Request <Icon.Arrow />
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form reveal reveal-1" onSubmit={onSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="f-name">Name<span className="req">*</span></label>
        <input id="f-name" type="text" autoComplete="name"
          className={errors.name && touched.name ? 'invalid' : ''}
          value={form.name} onChange={update('name')} onBlur={blur('name')} placeholder="Your full name" />
        {errors.name && touched.name && <span className="err">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="f-biz">Business Name<span className="req">*</span></label>
        <input id="f-biz" type="text" autoComplete="organization"
          className={errors.business && touched.business ? 'invalid' : ''}
          value={form.business} onChange={update('business')} onBlur={blur('business')} placeholder="Shop / studio name" />
        {errors.business && touched.business && <span className="err">{errors.business}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="f-email">Email<span className="req">*</span></label>
        <input id="f-email" type="email" autoComplete="email"
          className={errors.email && touched.email ? 'invalid' : ''}
          value={form.email} onChange={update('email')} onBlur={blur('email')} placeholder="you@yourshop.com" />
        {errors.email && touched.email && <span className="err">{errors.email}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="f-phone">Phone Number<span className="req">*</span></label>
        <input id="f-phone" type="tel" autoComplete="tel"
          className={errors.phone && touched.phone ? 'invalid' : ''}
          value={form.phone} onChange={update('phone')} onBlur={blur('phone')} placeholder="(555) 555-5555" />
        {errors.phone && touched.phone && <span className="err">{errors.phone}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="f-loc">City / State<span className="req">*</span></label>
        <input id="f-loc" type="text"
          className={errors.location && touched.location ? 'invalid' : ''}
          value={form.location} onChange={update('location')} onBlur={blur('location')} placeholder="e.g. Miami, FL" />
        {errors.location && touched.location && <span className="err">{errors.location}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="f-qty">How Many Chairs?</label>
        <select id="f-qty" value={form.quantity} onChange={update('quantity')}>
          <option value="1">1 chair</option>
          <option value="2">2 chairs</option>
          <option value="3">3 chairs</option>
          <option value="4-5">4–5 chairs</option>
          <option value="6-10">6–10 chairs</option>
          <option value="10+">10+ chairs (multi-location)</option>
        </select>
      </div>
      <div className="form-field col-2">
        <label htmlFor="f-msg">Message</label>
        <textarea id="f-msg" rows="4" value={form.message} onChange={update('message')}
          placeholder="Anything we should know — timeline, color preferences, shipping details…" />
      </div>

      <div className="submit-row">
        <p className="privacy">
          We use your details only to follow up on this request. No spam, no resale.
        </p>
        <CTAButton onClick={onSubmit} />
      </div>
    </form>
  );
};

const FormSection = () => (
  <section className="form-section" id="quote-form">
    <div className="container form-grid">
      <aside className="form-aside reveal">
        <img src="assets/barbermaxx-logo.png" alt="Barber Maxx" className="form-aside-logo" />
        <span className="eyebrow">Section 07 · Get Pricing</span>
        <h2 className="section-title">
          Request a<br /><span style={{color:'var(--c-accent)'}}>Quote.</span>
        </h2>
        <p className="lead">
          Tell us about your shop. We'll send pricing, lead time, and shipping options
          tailored to your setup — usually within one business day.
        </p>
        <ul className="checklist">
          <li><span className="mk"><Icon.Check /></span> Direct pricing from the manufacturer</li>
          <li><span className="mk"><Icon.Check /></span> Multi-chair & multi-location quotes</li>
          <li><span className="mk"><Icon.Check /></span> Ships from US warehousing</li>
          <li><span className="mk"><Icon.Check /></span> No spam. One specialist, one follow-up.</li>
        </ul>
      </aside>

      <LeadForm />
    </div>
  </section>
);

/* ============================================================
   CLOSING
   ============================================================ */
const Closing = () => (
  <section className="closing">
    <img src="assets/barbermaxx-logo.png" alt="" className="closing-logo-bg" aria-hidden />
    <div className="container closing-inner">
      <img src="assets/barbermaxx-logo.png" alt="Barber Maxx" className="closing-logo reveal" />
      <span className="eyebrow reveal reveal-1">Section 08 · The Standard</span>
      <h2 className="display reveal reveal-2">
        Your barbershop<br />
        deserves a chair<br />
        that matches the<br />
        <span className="accent">level of your work.</span>
      </h2>
      <div className="reveal reveal-3"><CTAButton /></div>
      <div className="closing-meta reveal reveal-4">
        <span>X1 Barber Chair</span>
        <span className="dot" />
        <span>By Barber Maxx</span>
        <span className="dot" />
        <span>Built For Professionals</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <img src="assets/barbermaxx-logo.png" alt="Barber Maxx" className="footer-logo" />
      <span>© 2026 Barber Maxx · X1 Barber Chair · United States Distribution</span>
    </div>
  </footer>
);

/* ============================================================
   TWEAKS
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#11d27a",
  "displayFont": "Anton",
  "heroLayout": "split",
  "heroBleed": false
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  // accent color
  const c = t.accent;
  root.style.setProperty('--c-accent', c);

  // derive helpers
  const hexToRgb = (hex) => {
    const m = hex.replace('#','');
    const n = parseInt(m.length===3 ? m.split('').map(x=>x+x).join('') : m, 16);
    return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
  };
  try {
    const { r, g, b } = hexToRgb(c);
    const darker = `rgb(${Math.max(0,r-25)}, ${Math.max(0,g-25)}, ${Math.max(0,b-25)})`;
    root.style.setProperty('--c-accent-hover', darker);
    root.style.setProperty('--c-accent-soft', `rgba(${r}, ${g}, ${b}, 0.12)`);
    root.style.setProperty('--c-accent-line', `rgba(${r}, ${g}, ${b}, 0.35)`);
    root.style.setProperty('--c-accent-glow', `rgba(${r}, ${g}, ${b}, 0.45)`);
  } catch(e) {}

  // display font
  const fontMap = {
    'Anton':        "'Anton', 'Impact', sans-serif",
    'Bebas Neue':   "'Bebas Neue', 'Anton', 'Impact', sans-serif",
    'Oswald':       "'Oswald', 'Anton', 'Impact', sans-serif",
    'Archivo Black':"'Archivo Black', 'Anton', sans-serif",
  };
  root.style.setProperty('--font-display', fontMap[t.displayFont] || fontMap['Anton']);
}

function App() {
  const [tweaks, setTweak] = (window.useTweaks || (()=>[TWEAK_DEFAULTS,()=>{}]))(TWEAK_DEFAULTS);
  useReveal();
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakColor = window.TweakColor;
  const TweakSelect = window.TweakSelect;
  const TweakToggle = window.TweakToggle;
  const TweakRadio = window.TweakRadio;

  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Marquee />
      <Pain />
      <Desire />
      <Features />
      <VisualBanner />
      <Compare />
      <FormSection />
      <Closing />
      <Footer />

      {TweaksPanel && (
        <TweaksPanel>
          <TweakSection label="Theme" />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            options={['#11d27a', '#4F86C6', '#e63946', '#f59e0b', '#ffffff']}
            onChange={(v) => setTweak('accent', v)}
          />
          <TweakSection label="Typography" />
          <TweakSelect
            label="Display font"
            value={tweaks.displayFont}
            options={['Anton', 'Bebas Neue', 'Oswald', 'Archivo Black']}
            onChange={(v) => setTweak('displayFont', v)}
          />
        </TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
