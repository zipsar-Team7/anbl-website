import './Opportunities.css';

export default function Opportunities() {
  return (
    <main className="opp-page">
      <section className="inner-hero">
        <div className="container">
          <div className="inner-hero__content reveal-up">
            <span className="section-label">Join Our Team</span>
            <h1 className="t-h1">Opportunities</h1>
            <p className="t-body inner-hero__sub">
              We are always looking for passionate researchers to join the Advanced Nanomedicine & Biosafety Lab.
            </p>
          </div>
        </div>
      </section>

      <section className="section opp-section">
        <div className="container narrow">
          <div className="opp-grid">
            <div className="opp-card">
              <h2 className="opp-card__title">Graduate Students</h2>
              <p className="opp-card__text">
                We are looking for motivated MS and PhD students interested in nanomedicine, AI-driven biosafety, 
                and nanoparticle-biological interactions. Candidates with backgrounds in Biotechnology, 
                Nanotechnology, Computer Science, or related fields are encouraged to apply.
              </p>
              <div className="opp-card__meta">
                <span><strong>Status:</strong> Open for Fall 2024</span>
              </div>
            </div>

            <div className="opp-card">
              <h2 className="opp-card__title">Undergraduate Interns</h2>
              <p className="opp-card__text">
                Undergraduate students at Hanyang University who are interested in gaining research experience 
                in a cutting-edge laboratory environment are welcome to apply for internships.
              </p>
              <div className="opp-card__meta">
                <span><strong>Status:</strong> Open Year-round</span>
              </div>
            </div>

            <div className="opp-card opp-card--highlight">
              <h2 className="opp-card__title">Postdoctoral Researchers</h2>
              <p className="opp-card__text">
                Positions are available for PhD holders with expertise in machine learning, computational 
                biology, or experimental nanomedicine. Please send your CV and research statement directly to the PI.
              </p>
              <div className="opp-card__meta">
                <span><strong>Status:</strong> Inquire via Email</span>
              </div>
            </div>
          </div>

          <div className="opp-apply">
            <h2 className="opp-apply__title">How to Apply</h2>
            <p className="opp-apply__text">
              If you are interested in joining our lab, please send an email to <strong>{`anbl@hanyang.ac.kr`}</strong> with:
            </p>
            <ul className="opp-apply__list">
              <li>Detailed CV (including publication list)</li>
              <li>Brief statement of research interests</li>
              <li>Academic transcripts (for students)</li>
            </ul>
            <a href="mailto:anbl@hanyang.ac.kr" className="btn btn-red btn-lg">Apply Now</a>
          </div>
        </div>
      </section>
    </main>
  );
}
