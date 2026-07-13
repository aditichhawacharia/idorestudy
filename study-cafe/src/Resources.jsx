import React from 'react';
import { BookOpen, Clock, Brain, CheckCircle2, Coffee, ShieldCheck } from 'lucide-react';

const guides = [
  { icon: Clock, title: 'How to use the Pomodoro method', text: 'Choose one specific task, remove obvious distractions, and work for a defined focus interval. During the interval, write distracting thoughts on paper instead of acting on them. When the timer ends, take a real break away from the task. After several cycles, use a longer break to reset.' },
  { icon: Brain, title: 'Active recall beats rereading', text: 'After reviewing a topic, close your notes and explain the idea from memory. Turn headings into questions, make practice prompts, or teach the concept out loud. Then check your answer and correct the gaps. The effort of retrieval is what makes the session useful.' },
  { icon: CheckCircle2, title: 'Build a realistic study list', text: 'Write tasks as visible actions: “solve ten practice problems” is better than “study chemistry.” Pick one must-finish task, two useful tasks, and a small optional task. Short lists reduce avoidance and make progress easier to measure.' },
  { icon: Coffee, title: 'Use breaks deliberately', text: 'A good break changes your physical and mental state. Stand up, drink water, look away from the screen, stretch, or walk briefly. Avoid opening an endless feed, because it makes returning to focused work harder.' },
];

const faq = [
  ['Does IdoréStudy require an account?', 'No. The timer and to-do list work without registration. Preferences are stored in your browser on the device you are using.'],
  ['Is IdoréStudy affiliated with any artist or entertainment company?', 'No. IdoréStudy is an independent fan-made productivity project and is not endorsed by, sponsored by, or affiliated with any artist, label, or entertainment company.'],
  ['Where do the videos and music come from?', 'Media is embedded from third-party platforms such as YouTube and remains subject to the original platform and rights-holder terms. IdoréStudy does not claim ownership of that media.'],
  ['What should I do when a media item is unavailable?', 'Choose another study buddy or music option. Third-party uploads can be removed, restricted, or made unavailable by their owners at any time.'],
  ['How is my to-do list stored?', 'Your task list is saved locally in your browser. It is not an account-based cloud service, so clearing browser storage may remove it.'],
];

export default function Resources() {
  return <main className="content-page">
    <header className="content-hero">
      <p className="eyebrow">Original study guidance</p>
      <h1>Study Resources</h1>
      <p>Practical, distraction-aware ways to use IdoréStudy as a real productivity tool—not just background ambience.</p>
    </header>

    <section className="content-card intro-card">
      <BookOpen aria-hidden="true" />
      <div>
        <h2>A simple focus routine</h2>
        <p>Before starting a session, decide what “done” means. Put the needed materials within reach, silence nonessential notifications, select a timer length you can genuinely sustain, and begin with the smallest clear action. At the end, record what you completed and what the next action should be.</p>
      </div>
    </section>

    <section className="guide-grid" aria-label="Study guides">
      {guides.map(({ icon: Icon, title, text }) => <article className="content-card guide-card" key={title}>
        <Icon aria-hidden="true" />
        <h2>{title}</h2>
        <p>{text}</p>
      </article>)}
    </section>

    <section className="content-card">
      <h2>Suggested session template</h2>
      <ol className="steps">
        <li><strong>Plan for two minutes:</strong> select one outcome and open only the materials needed.</li>
        <li><strong>Focus:</strong> work on the chosen action until the timer ends.</li>
        <li><strong>Review:</strong> spend one minute recalling what you learned without looking.</li>
        <li><strong>Reset:</strong> take a screen-light break, then decide whether to continue or switch tasks.</li>
      </ol>
      <p className="note">The timer is a structure, not a rule. Adjust the interval for the difficulty of your work, your accessibility needs, and your energy level.</p>
    </section>

    <section className="content-card">
      <div className="section-heading"><ShieldCheck aria-hidden="true" /><h2>Frequently asked questions</h2></div>
      <div className="faq-list">
        {faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  </main>;
}
