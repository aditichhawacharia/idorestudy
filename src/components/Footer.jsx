import { Coffee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { showGooglePrivacyChoices } from '../lib/adsense.js';

export default function Footer() {
  const navigate = useNavigate();

  const openPrivacyChoices = async () => {
    const opened = await showGooglePrivacyChoices();
    if (!opened) navigate('/privacy#privacy-choices');
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true"><Coffee size={20} /></span>
              <span className="brand-name">IdoréStudy</span>
            </Link>
            <p className="footer-copy">
              A free, independent study companion with an original focus planner, practical study guides,
              and an optional K-pop-inspired YouTube study room. No account is required.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <div className="footer-links">
              <Link to="/study">Study room</Link>
              <Link to="/resources">Study guides</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h2 className="footer-heading">Policies</h2>
            <div className="footer-links">
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of use</Link>
              <Link to="/content-policy">Content and takedown policy</Link>
              <button type="button" className="footer-link-button" onClick={openPrivacyChoices}>
                Privacy and cookie settings
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IdoréStudy. Independent and fan-made.</span>
          <span>Not affiliated with or endorsed by any artist, label, or entertainment company.</span>
        </div>
      </div>
    </footer>
  );
}
