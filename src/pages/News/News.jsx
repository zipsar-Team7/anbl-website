import './News.css';

const newsItems = [
  {
    date: 'April 15, 2026',
    title: 'Dr. Haribalan Perumalsamy receives RDA Joint Research Grant',
    category: 'Grant',
    summary: 'The lab has been awarded a major grant for research on plant growth promotion using silica-based seed treatments.'
  },

  {
    date: 'February 20, 2026',
    title: 'ANBL Lab Website Launched',
    category: 'Lab Update',
    summary: 'We are excited to announce the launch of our new research portal, showcasing our work in nanomedicine and AI.'
  }
];

export default function News() {
  return (
    <main className="news-page">
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
          <span className="section-label">Updates</span>
          <h1 className="t-h1">Lab News & Events</h1>
          <p className="t-body-large">
            Stay updated with the latest breakthroughs, awards, and activities from ANBL.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="news-list">
            {newsItems.map((item, i) => (
              <article key={i} className="news-item">
                <div className="news-item__meta">
                  <span className="news-item__date">{item.date}</span>
                  <span className="news-item__category">{item.category}</span>
                </div>
                <div className="news-item__content">
                  <h2 className="t-h3">{item.title}</h2>
                  <p className="t-body">{item.summary}</p>
                  {/* <button className="btn-text">Read More →</button> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
