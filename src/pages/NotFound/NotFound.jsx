import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container center">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="t-h1">Page Not Found</h1>
          <p className="t-body">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-red btn-lg">Return Home</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Report an Issue</Link>
          </div>
        </div>
        
        {/* Abstract background particles */}
        <div className="not-found-visual" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="error-particle" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }} />
          ))}
        </div>
      </div>
    </main>
  );
}
