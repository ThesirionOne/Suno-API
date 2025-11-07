import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>AI Music Generator</h1>
        <p className="subtitle">Create unique music with artificial intelligence</p>
        <Link to="/generate" className="cta-button">
          Start Creating Music
        </Link>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎵</div>
          <h3>Multiple Genres</h3>
          <p>Choose from various music styles and genres</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Generation</h3>
          <p>Get your music in seconds</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎹</div>
          <h3>Custom Tempo</h3>
          <p>Control the speed and feel of your music</p>
        </div>
      </div>
    </div>
  );
}
