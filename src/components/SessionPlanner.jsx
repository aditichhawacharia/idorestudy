import { useMemo, useState } from 'react';
import { ArrowRight, CalendarCheck, Clock3, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TIMER_SETTINGS_KEY = 'idorestudy_timer_settings_v1';

export default function SessionPlanner() {
  const navigate = useNavigate();
  const [outcome, setOutcome] = useState('Finish one clearly defined task');
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [cycles, setCycles] = useState(3);
  const [saved, setSaved] = useState(false);

  const breakMinutes = focusMinutes >= 45 ? 10 : 5;
  const plan = useMemo(() => {
    const items = [];
    for (let cycle = 1; cycle <= cycles; cycle += 1) {
      items.push({ label: `Focus block ${cycle}`, minutes: focusMinutes });
      if (cycle < cycles) items.push({ label: `Reset break ${cycle}`, minutes: breakMinutes });
    }
    return items;
  }, [cycles, focusMinutes, breakMinutes]);

  const totalMinutes = plan.reduce((sum, item) => sum + item.minutes, 0);

  const usePlan = () => {
    try {
      localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify({
        studyMinutes: focusMinutes,
        breakMinutes,
      }));
      localStorage.setItem('idorestudy_session_outcome_v1', outcome.trim());
    } catch (error) {
      console.warn('Session settings could not be saved.', error);
    }
    setSaved(true);
    navigate('/study');
  };

  return (
    <section className="planner-card" aria-labelledby="planner-title">
      <div className="planner-grid">
        <div>
          <p className="eyebrow"><CalendarCheck size={16} aria-hidden="true" /> Free session planner</p>
          <h2 id="planner-title" style={{ margin: 0, fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Turn “I should study” into a specific plan.
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
            Define one finish line, choose a focus interval you can sustain, and decide how many cycles you will complete.
            The selected timer settings are saved only in this browser and can be opened directly in the study room.
          </p>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="session-outcome">What should be finished by the end?</label>
              <input
                id="session-outcome"
                value={outcome}
                maxLength={120}
                onChange={(event) => setOutcome(event.target.value)}
                placeholder="Example: solve questions 1-12 and mark mistakes"
              />
            </div>
            <div className="inline-fields">
              <div className="field">
                <label htmlFor="focus-length">Focus length</label>
                <select id="focus-length" value={focusMinutes} onChange={(event) => setFocusMinutes(Number(event.target.value))}>
                  <option value={20}>20 minutes</option>
                  <option value={25}>25 minutes</option>
                  <option value={35}>35 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={50}>50 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cycle-count">Number of focus blocks</label>
                <select id="cycle-count" value={cycles} onChange={(event) => setCycles(Number(event.target.value))}>
                  <option value={1}>1 block</option>
                  <option value={2}>2 blocks</option>
                  <option value={3}>3 blocks</option>
                  <option value={4}>4 blocks</option>
                </select>
              </div>
            </div>
            <button type="button" className="primary-button" onClick={usePlan} disabled={!outcome.trim()}>
              Use this plan in the study room <ArrowRight size={17} aria-hidden="true" />
            </button>
            {saved && <p className="status-message" role="status">Your timer settings were saved on this device.</p>}
          </div>
        </div>

        <div className="plan-output" aria-live="polite">
          <Sparkles size={22} aria-hidden="true" />
          <h3>Your session</h3>
          <p><strong>{outcome.trim() || 'Choose one clear outcome'}</strong><br />About {totalMinutes} minutes total.</p>
          <ol className="plan-list">
            {plan.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <strong>{item.label}</strong>
                <span><Clock3 size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {item.minutes} min</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
