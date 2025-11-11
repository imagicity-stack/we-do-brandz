import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <main className="not-found">
    <div className="main-container">
      <div className="card">
        <span className="tag">404</span>
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back on track.</p>
        <div className="not-found-actions">
          <Link to="/" className="primary-button">
            Go home
          </Link>
          <Link to="/services" className="secondary-button">
            Browse services
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound;
