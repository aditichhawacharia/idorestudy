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
          <div className="footer-brand-column">
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true"><Coffee size={19} /></span>
              <span className="brand-copy">
                <span className="brand-name">IdoréStudy</span>
                <span className="brand-tagline">K-pop study room</span>
              </span>
            </Link>
            <p className="footer-copy">
              A free, independent K-pop focus room with a configurable timer, local task list, optional
              third-party ambience, and an original library of practical study guides.
            </p>
            <Link className="footer-cta" to="/#choose-buddy">Choose a study buddy</Link>
          </div>

          <div>
            <h2 className="footer-heading">Study</h2>
            <div className="footer-links">
              <Link to="/study">Study room lobby</Link>
              <Link to="/#choose-buddy">Choose a K-pop study buddy</Link>
              <Link to="/resources">All study guides</Link>
              <Link to="/resources/pomodoro-study-session">Plan a focus session</Link>
              <Link to="/resources/active-recall-guide">Active recall guide</Link>
            </div>
          </div>

          <div>
            <h2 className="footer-heading">About</h2>
            <div className="footer-links">
              <Link to="/about">About IdoréStudy</Link>
              <Link to="/editorial-policy">Editorial policy</Link>
              <Link to="/content-policy">Content and takedown policy</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/sitemap">HTML sitemap</Link>
            </div>
          </div>

          <div>
            <h2 className="footer-heading">Legal</h2>
            <div className="footer-links">
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of use</Link>
              <Link to="/disclaimer">Educational disclaimer</Link>
              <button type="button" className="footer-link-button" onClick={openPrivacyChoices}>
                Privacy and cookie settings
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IdoréStudy. Independent and fan-made.</span>
          <span>Not affiliated with or endorsed by any artist, label, agency, or entertainment company.</span>
        </div>
      </div>
    </footer>
  );
}
