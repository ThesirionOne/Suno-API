import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          AI Music Studio
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link
            to="/generate"
            className={location.pathname === '/generate' ? 'nav-link active' : 'nav-link'}
          >
            Generate
          </Link>
        </div>
      </div>
    </nav>
  );
}
