import { groupPalettes } from '../data/studyBuddies.js';

export default function BuddyArtwork({ buddy, compact = false, decorative = false }) {
  const palette = groupPalettes[buddy.group] || ['#B87496', '#4E3A65'];
  const cleanName = buddy.name.replace(/\([^)]*\)/g, '').trim();
  const initials = cleanName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`buddy-artwork${compact ? ' compact' : ''}`}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : `${buddy.name} from ${buddy.group}`}
      style={{
        '--buddy-start': palette[0],
        '--buddy-end': palette[1],
      }}
    >
      <span className="buddy-artwork-grid" aria-hidden="true" />
      <span className="buddy-initials" aria-hidden="true">{initials}</span>
      {!compact && <span className="buddy-group-stamp" aria-hidden="true">{buddy.group}</span>}
    </div>
  );
}
