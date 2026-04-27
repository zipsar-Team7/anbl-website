import React from 'react';

const ArrivingSoon = ({ toolName }) => {
  return (
    <div className="fade-in" style={{ padding: '64px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border)' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>🚧</div>
      <h1 className="t-h2">{toolName} is Arriving Soon</h1>
      <p className="t-body" style={{ maxWidth: '500px', margin: '16px auto' }}>
        We are currently finalizing the datasets and biology-informed AI models for this platform. Check back soon for the full release.
      </p>
      <div style={{ marginTop: '32px' }}>
        <span className="doc-status status-arriving-soon">Development Phase</span>
      </div>
    </div>
  );
};

export default ArrivingSoon;
