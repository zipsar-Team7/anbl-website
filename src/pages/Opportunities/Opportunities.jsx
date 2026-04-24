import './Opportunities.css';

const positions = [
  {
    title: 'Postdoctoral Researcher',
    type: 'Full-time',
    location: 'Seoul, Hanyang University',
    description: 'We are seeking a highly motivated postdoctoral researcher to work on AI-driven nanotoxicology and multi-omics integration.'
  },
  {
    title: 'Graduate Student (Ph.D./M.S.)',
    type: 'Academic',
    location: 'Seoul, Hanyang University',
    description: 'Multiple positions available for students interested in nanomedicine, immunology, and computational biology.'
  },
  {
    title: 'Undergraduate Research Assistant',
    type: 'Part-time / Internship',
    location: 'Seoul, Hanyang University',
    description: 'Join our lab to gain hands-on experience in advanced nanotechnology and biosafety research.'
  }
];

export default function Opportunities() {
  return (
    <main className="opps-page">
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
            <span className="section-label">Join Us</span>
            <h1 className="t-h1">Research Opportunities</h1>
            <p className="inner-hero__sub">
              Become part of a multidisciplinary team at the intersection of nanotechnology and AI.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2">Open Positions</h2>
            <p className="t-body">
              We are always looking for passionate individuals. Even if there are no 
              specific listings below, feel free to reach out.
            </p>
          </div>

          <div className="positions-list">
            {positions.map((pos, i) => (
              <div key={i} className="position-card">
                <div className="position-card__header">
                  <h3 className="t-h3">{pos.title}</h3>
                  <span className="position-type">{pos.type}</span>
                </div>
                <p className="position-loc">📍 {pos.location}</p>
                <p className="t-body">{pos.description}</p>
                <div className="position-card__footer">
                  <a href="/contact" className="btn btn-red">Apply Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
