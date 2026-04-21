import { labData } from '../../data/labData';
import './Projects.css';

export default function Projects() {
  const { grants } = labData;

  return (
    <main className="projects-page">
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
          <span className="section-label">Our Work</span>
          <h1 className="t-h1">Research Projects & Grants</h1>
          <p className="t-body-large">
            Driving innovation through strategic research initiatives and 
            national/international collaborations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2">Ongoing Research</h2>
          </div>
          <div className="projects-grid">
            {grants.filter(g => g.type === 'Ongoing').map((grant, i) => (
              <div key={i} className="project-card">
                <div className="project-card__content">
                  <div className="project-tag">Ongoing</div>
                  <h3 className="t-h3">{grant.title}</h3>
                  <div className="project-meta">
                    <p><strong>Agency:</strong> {grant.agency}</p>
                    <p><strong>Period:</strong> {grant.period}</p>
                    <p><strong>Funding:</strong> {grant.funding}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2">Completed Initiatives</h2>
          </div>
          <div className="projects-grid">
            {grants.filter(g => g.type === 'Completed').map((grant, i) => (
              <div key={i} className="project-card project-card--completed">
                <div className="project-card__content">
                  <div className="project-tag project-tag--completed">Completed</div>
                  <h3 className="t-h3">{grant.title}</h3>
                  <div className="project-meta">
                    <p><strong>Agency:</strong> {grant.agency}</p>
                    <p><strong>Period:</strong> {grant.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
