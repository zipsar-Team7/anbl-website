import { useState } from 'react';
import './Database.css';

const browseTags = [
  'Silver Nanoparticles', 'Gold Nanoparticles', 'Titanium Dioxide',
  'Carbon Nanotubes', 'Lipid Nanoparticles', 'Silica Nanoparticles',
  'Zinc Oxide NPs', 'Copper Nanoparticles', 'Iron Oxide NPs',
  'Polymeric NPs', 'Quantum Dots', 'Dendrimers',
];

const workflowSteps = [
  {
    num: '01',
    icon: '⌨️',
    title: 'Enter Nanomaterial Parameters',
    desc: 'Input physicochemical properties: size, surface charge, coating, concentration, and exposure duration.',
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'AI Model Processes Your Query',
    desc: 'Our ML pipeline — trained on curated multi-omics and CyTOF datasets — evaluates biological interactions across cell types.',
  },
  {
    num: '03',
    icon: '📊',
    title: 'Receive Predictions & Reports',
    desc: 'Obtain biosafety confidence scores, toxicity flags, and therapeutic predictions. Download full PDF report.',
  },
];

const tiers = [
  {
    name: 'Free Tier',
    price: 'Free',
    period: 'Always',
    id: 'tier-free',
    features: [
      '10 queries / month',
      'Basic biosafety prediction',
      'Polymer database access (read-only)',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Research Access',
    price: 'Contact Us',
    period: 'Institutional',
    id: 'tier-research',
    features: [
      'Unlimited queries',
      'Full AI-AOP prediction engine',
      'Disease-specific models',
      'API access (100K req/month)',
      'Priority support',
      'Exportable CSV & PDF reports',
    ],
    cta: 'Request Access',
    highlight: true,
  },
  {
    name: 'Developer / API',
    price: 'Tiered',
    period: 'Per-request',
    id: 'tier-api',
    features: [
      'RESTful API access',
      'Batch prediction endpoint',
      'Webhook support',
      'API key management dashboard',
      'Swagger / OpenAPI docs',
    ],
    cta: 'View API Docs',
    highlight: false,
  },
];

export default function Database() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) setSubmitted(true);
  };

  return (
    <main id="database-page">

      {/* ── PORTAL HERO ──────────────────────────────────── */}
      <section className="db-hero" id="db-hero">
        <div className="db-hero__grid" aria-hidden="true" />
        <div className="container db-hero__inner">
          <div className="db-hero__badge">
            <span className="badge">Beta · v0.9.2</span>
            <span className="db-hero__status">
              <span className="db-status-dot" /> System Operational
            </span>
          </div>
          <h1 className="t-hero db-hero__title">
            Predictive Nanomedicine<br />
            <span className="t-red">Database Portal</span>
          </h1>
          <p className="t-body db-hero__sub">
            Query our AI-powered platform to predict nanoparticle biosafety, toxicity thresholds, and therapeutic efficacy — before any lab experiment.
          </p>

          {/* Central search */}
          <form className="db-search-form" onSubmit={handleSearch} id="db-search-form">
            <div className="db-search-wrap">
              <span className="db-search-icon">🔬</span>
              <input
                id="db-search-input"
                className="db-search-input"
                type="text"
                placeholder="e.g. Silver nanoparticle, 50nm, citrate coating, 24h…"
                value={query}
                onChange={e => { setQuery(e.target.value); setSubmitted(false); }}
              />
              <button type="submit" className="btn btn-red db-search-btn" id="db-search-btn">
                Predict
              </button>
            </div>
          </form>

          {submitted && (
            <div className="db-result-preview" id="db-result-preview">
              <div className="db-result-row">
                <span className="t-label">Query</span>
                <span className="db-result-val">{query}</span>
              </div>
              <div className="db-result-row">
                <span className="t-label">Biosafety Score</span>
                <span className="db-result-val t-red">74 / 100 — Moderate Risk</span>
              </div>
              <div className="db-result-row">
                <span className="t-label">Model Confidence</span>
                <span className="db-result-val">88.3%</span>
              </div>
              <p className="t-sm" style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                ⚠ Demo result only. Sign in for full prediction report.
              </p>
            </div>
          )}

          <p className="db-hero__hint t-sm">
            Try: "50nm gold nanoparticle, PEG coating, liver cells, 48h" · or browse categories below
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Workflow</span>
            <h2 className="t-h1" style={{ marginTop: 8 }}>How It Works</h2>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map((step, idx) => (
              <div key={step.num} className="workflow-card" id={`workflow-step-${step.num}`}>
                <div className="workflow-connector" aria-hidden="true">
                  {idx < workflowSteps.length - 1 && <div className="workflow-line" />}
                </div>
                <div className="workflow-icon">{step.icon}</div>
                <div className="workflow-num">{step.num}</div>
                <h3 className="t-h3 workflow-title">{step.title}</h3>
                <p className="t-body workflow-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE CATEGORIES ─────────────────────────────── */}
      <section className="section-sm browse-section" id="browse-categories">
        <div className="container">
          <span className="section-label">Quick Browse</span>
          <h2 className="t-h2" style={{ marginTop: 8, marginBottom: 32 }}>Popular Nanomaterial Categories</h2>
          <div className="browse-grid">
            {browseTags.map(tag => (
              <button
                key={tag}
                className="browse-tag"
                id={`browse-${tag.replace(/\s/g, '-').toLowerCase()}`}
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPER ACCESS ──────────────────────────────── */}
      <section className="section api-section" id="developer-access">
        <div className="container api-inner">
          <div className="api-text">
            <span className="section-label">Developer Access</span>
            <h2 className="t-h2" style={{ marginTop: 8, marginBottom: 16 }}>REST API Documentation</h2>
            <p className="t-body">
              Integrate ANBL's prediction engine into your own research workflows. Our RESTful API supports batch queries, webhook callbacks, and structured JSON responses.
            </p>
            <div className="api-code-block" id="api-code-example">
              <pre><code>{`POST /api/v1/predict
Content-Type: application/json

{
  "material": "AgNP",
  "size_nm": 50,
  "coating": "citrate",
  "cell_type": "HepG2",
  "exposure_h": 24,
  "concentration_ug_ml": 10
}`}</code></pre>
            </div>
            <a href="#tier-api" className="btn btn-red" style={{ marginTop: 24 }} id="btn-api-docs">
              View Full API Docs →
            </a>
          </div>
          <div className="api-stats">
            {[
              { val: '< 200ms', lbl: 'Avg. Response Time' },
              { val: '99.9%', lbl: 'API Uptime SLA' },
              { val: 'v1.0', lbl: 'Current API Version' },
            ].map(s => (
              <div key={s.lbl} className="api-stat-card card">
                <div className="api-stat-val t-red">{s.val}</div>
                <div className="t-sm">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS TIERS ──────────────────────────────────── */}
      <section className="section tiers-section" id="access-tiers">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Access Tiers</span>
            <h2 className="t-h1" style={{ marginTop: 8 }}>Choose Your Access Level</h2>
            <p className="t-body" style={{ marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
              From individual researchers to institutional partners — flexible access options for every use case.
            </p>
          </div>
          <div className="tiers-grid">
            {tiers.map(tier => (
              <div
                key={tier.id}
                id={tier.id}
                className={`tier-card card ${tier.highlight ? 'tier-card--highlight' : ''}`}
              >
                {tier.highlight && (
                  <div className="tier-card__popular">Most Popular</div>
                )}
                <p className="tier-name t-label">{tier.name}</p>
                <div className="tier-price">
                  <span className="tier-price__val">{tier.price}</span>
                  <span className="tier-price__period t-sm"> / {tier.period}</span>
                </div>
                <div className="divider-sm" />
                <ul className="tier-features">
                  {tier.features.map(f => (
                    <li key={f} className="tier-feature">
                      <span className="tier-check">✓</span>
                      <span className="t-body" style={{ fontSize: 14 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:harijai2004@hanyang.ac.kr"
                  className={`btn ${tier.highlight ? 'btn-red' : 'btn-outline'} btn-lg`}
                  style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}
                  id={`tier-cta-${tier.id}`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
