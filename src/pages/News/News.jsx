import { labData } from '../../data/labData';
import './News.css';

export default function News() {
  const newsItems = [
    {
      date: '2024.04.15',
      category: 'Achievement',
      title: 'Our lab received the Best Research Award from Hanyang University.',
      desc: 'Recognized for our contributions to AI-driven nanomedicine research.'
    },
    {
      date: '2024.03.10',
      category: 'Publication',
      title: 'New research on interpretable biosafety models published in Nature Nanotechnology.',
      desc: 'Collaborative work with international partners on predictive frameworks.'
    },
    {
      date: '2024.01.20',
      category: 'Event',
      title: 'ANBL Lab Winter Symposium held at Seoul Campus.',
      desc: 'Researchers and students presented their latest findings in nanobiology.'
    }
  ];

  return (
    <main className="news-page">
      <section className="inner-hero">
        <div className="container">
          <div className="inner-hero__content reveal-up">
            <span className="section-label">Media & Updates</span>
            <h1 className="t-h1">Lab News</h1>
            <p className="t-body inner-hero__sub">
              Stay updated with the latest research breakthroughs, awards, and events from ANBL.
            </p>
          </div>
        </div>
      </section>

      <section className="section news-section">
        <div className="container narrow">
          <div className="news-list">
            {newsItems.map((item, i) => (
              <article key={i} className="news-item">
                <div className="news-item__meta">
                  <span className="news-item__date">{item.date}</span>
                  <span className="news-item__category">{item.category}</span>
                </div>
                <h2 className="news-item__title">{item.title}</h2>
                <p className="news-item__desc">{item.desc}</p>
                <button className="news-item__link">Read More ↗</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
