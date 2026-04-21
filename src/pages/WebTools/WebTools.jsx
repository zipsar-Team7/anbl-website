import { labData } from '../../data/labData';
import './WebTools.css';

const { webTools } = labData;

export default function WebTools() {
  return (
    <main className="webtools-page">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="inner-hero__bg-gradient" aria-hidden="true" />
        <div className="inner-hero__particles">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="vibrating-particle" 
              style={{ 
                bottom: `${Math.random() * 80}px`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">AI Platforms</span>
            <h1 className="t-h1">Web-Based Research Tools</h1>
            <p className="t-body inner-hero__sub">
              Access our laboratory's proprietary AI frameworks and curated 
              databases designed to accelerate nanomedicine research and biosafety screening.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ─────────────────────────────────── */}
      <section className="section tools-section">
        <div className="container">
          <div className="tools-grid">
            {webTools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-card__header">
                  <span className="tool-category">{tool.category}</span>
                  <span className={`tool-status status--${tool.status.toLowerCase().replace(' ', '-')}`}>
                    {tool.status}
                  </span>
                </div>
                <h3 className="t-h3">{tool.name}</h3>
                <p className="t-body tool-desc">{tool.description}</p>
                <div className="tool-card__footer">
                  <a href={tool.link} className="btn btn-outline-red btn-sm">
                    {tool.status === 'Available' || tool.status === 'Early Access' ? 'Access Tool' : 'View Documentation'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS BANNER ────────────────────────── */}
      <section className="section info-banner-section">
        <div className="container">
          <div className="info-banner">
            <div className="info-banner__content">
              <h2 className="t-h3">Request Institution-Wide Access</h2>
              <p className="t-body">
                We provide specialized API access and private database instances 
                for collaborating research institutions and industry partners.
              </p>
            </div>
            <a href="/contact" className="btn btn-red">Contact for Partnership</a>
          </div>
        </div>
      </section>
    </main>
  );
}
