import fs from 'node:fs';

const review = fs.readFileSync('MEDIA-SOURCE-REVIEW.md', 'utf8');
const rows = review
  .split('\n')
  .filter((line) => /^\|[^-].*\|$/.test(line))
  .filter((line) => !/^\|\s*(Study buddy|Music option)\s*\|/i.test(line));

const expectedRows = 40;
const problems = [];

if (rows.length !== expectedRows) {
  problems.push(`Expected ${expectedRows} media-review rows; found ${rows.length}.`);
}

for (const [index, row] of rows.entries()) {
  const cells = row.split('|').slice(1, -1).map((cell) => cell.trim());
  const isBuddyRow = cells.length === 6;
  const label = cells[0] || `row ${index + 1}`;
  const source = cells[isBuddyRow ? 2 : 1];
  const status = cells[isBuddyRow ? 3 : 2];
  const basis = cells[isBuddyRow ? 4 : 3];
  const reviewed = cells[isBuddyRow ? 5 : 4];

  if (!/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{6,}$/.test(source || '')) {
    problems.push(`${label}: source is missing or malformed.`);
  }
  if (!['Approved', 'Removed'].includes(status)) {
    problems.push(`${label}: status must be Approved or Removed (currently ${status || 'blank'}).`);
  }
  if (!basis) problems.push(`${label}: channel / rights basis is blank.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewed || '')) {
    problems.push(`${label}: Reviewed must be a YYYY-MM-DD date.`);
  }
}

if (problems.length) {
  console.error('Prelaunch media review is incomplete:');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Prelaunch media review passed for ${rows.length} optional YouTube sources.`);
