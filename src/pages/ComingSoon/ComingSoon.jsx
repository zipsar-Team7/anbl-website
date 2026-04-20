import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import logo from '../../assets/logo-new.png';
import './ComingSoon.css';

export default function ComingSoon() {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      particlesRef.current.forEach((particle) => {
        if (!particle) return;
        
        const rect = particle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = centerX - clientX;
        const dy = centerY - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel distance
        const maxDist = 150;
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const tx = (dx / distance) * force * 50;
          const ty = (dy / distance) * force * 50;
          particle.style.transform = `translate(${tx}px, ${ty}px)`;
        } else {
          particle.style.transform = `translate(0, 0)`;
        }
      });
    };

    const handleMouseLeave = () => {
      particlesRef.current.forEach(p => {
        if (p) p.style.transform = `translate(0, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main className="coming-soon-page" ref={containerRef}>
      <div className="container center">
        <div className="coming-soon-header">
          <Link to="/">
            <img src={logo} alt="ANBL Logo" className="cs-logo" />
          </Link>
        </div>
        <div className="coming-soon-content">
          <span className="section-label">Future of Research</span>
          <h1 className="t-h1">ANBL Web Platform</h1>
          <h2 className="t-h2 coming-soon-title">Coming Soon</h2>
          <p className="t-body">
            We are currently engineering a state-of-the-art, AI-driven platform for predictive 
            nanomaterial analysis. This tool will integrate multi-omics datasets and 
            machine learning models to provide rapid biosafety assessments.
          </p>
          <div className="coming-soon-actions">
            <Link to="/contact" className="btn btn-red btn-lg">Join the Waitlist</Link>
            <Link to="/" className="btn btn-outline btn-lg">Back to Home</Link>
          </div>
        </div>
        
        {/* Particle Animation Background — Increased density for "Vibrating" effect */}
        <div className="coming-soon-particles">
          {[...Array(150)].map((_, i) => (
            <div 
              key={i} 
              ref={el => particlesRef.current[i] = el}
              className="cs-particle-wrapper" 
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${15 + Math.random() * 20}s`,
                '--delay': `${-Math.random() * 20}s`,
                '--size': `${2 + Math.random() * 4}px`
              }}
            >
              <div className="cs-particle" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
