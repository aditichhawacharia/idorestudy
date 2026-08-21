import { additionalGuides } from './additionalGuides.js';

const coreGuides = [
  {
    slug: 'pomodoro-study-session',
    title: 'How to Build a Pomodoro Session That Actually Matches Your Work',
    shortTitle: 'Build a better Pomodoro session',
    description: 'Choose a realistic finish line, match the timer to the task, and use breaks that make it easier to return.',
    category: 'Focus planning',
    readTime: '7 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['Pomodoro method', 'focus timer', 'study session', 'time blocking'],
    intro: [
      'A timer is useful only when it supports a clear piece of work. Starting a 25-minute countdown with a vague goal such as “study biology” often creates motion without a finish line. A stronger session begins with an observable outcome: answer twelve practice questions, outline two essay sections, or recall one lecture from memory.',
      'The familiar 25-minute interval is a starting point, not a rule. The right interval is long enough to make progress and short enough that you can begin without bargaining with yourself. This guide shows how to select that interval, plan the break, and review the session so the next block starts cleanly.',
    ],
    sections: [
      {
        heading: '1. Write a finish line before you start the clock',
        paragraphs: [
          'Turn the subject into a visible action. “Revise calculus” is hard to judge; “solve six derivative problems and mark every error” tells you what to open, what to do, and when the block is complete. A useful finish line contains a verb, a quantity, and an output.',
          'Keep the outcome small enough for one or two focus blocks. If the task is larger, define only the next checkpoint. Starting with the next concrete action reduces the setup decisions that often consume the first part of a session.',
        ],
        list: [
          'Weak: study chapter five. Stronger: turn the six section headings into questions and answer them without notes.',
          'Weak: work on my essay. Stronger: draft the claim and evidence for the first two body paragraphs.',
          'Weak: prepare for Spanish. Stronger: recall twenty verbs, check the missed forms, and repeat the misses once.',
        ],
      },
      {
        heading: '2. Match the interval to the type of work',
        paragraphs: [
          'Use a shorter interval when the task has high resistance, when you are tired, or when the work is easy to interrupt. Twenty to twenty-five minutes is often enough to establish momentum without making the session feel endless.',
          'Use a longer interval when the task has expensive setup time. Writing, coding, drawing diagrams, and multi-step problem solving can benefit from forty-five to sixty minutes because you spend less time repeatedly rebuilding context. Longer is not automatically better; stop before accuracy and attention visibly collapse.',
        ],
        list: [
          '20-25 minutes: starting a delayed task, reviewing flashcards, organizing notes, or working with low energy.',
          '35-45 minutes: practice problems, reading with questions, outlining, or routine writing.',
          '50-60 minutes: deep drafting, complex problem sets, or projects that require sustained context.',
        ],
      },
      {
        heading: '3. Decide what the break is for',
        paragraphs: [
          'A break should change your physical or mental state, not quietly continue the same strain. Stand up, refill water, look across the room, stretch, or walk for a few minutes. Pick the break activity before the timer ends so you do not default to an endless feed.',
          'For a five-minute break, avoid activities with no natural stopping point. Save messaging, long videos, and games for a longer break after several cycles. The goal is not to make the break boring; it is to make returning predictable.',
        ],
      },
      {
        heading: '4. Use a one-minute review between blocks',
        paragraphs: [
          'Before taking the break, write one line: what was completed, what remains uncertain, and the exact next action. This prevents the next block from becoming another planning session. It also reveals whether the interval was realistic.',
          'Adjust using evidence from the session. If you repeatedly stopped with useful momentum, add five or ten minutes next time. If you drifted or made careless errors near the end, shorten the block or divide the task into smaller outputs.',
        ],
        callout: {
          title: 'One-minute review prompt',
          text: 'I completed ____. I am still unsure about ____. When I return, I will start by ____.',
        },
      },
      {
        heading: '5. Example: a 90-minute chemistry session',
        paragraphs: [
          'Outcome: solve twelve equilibrium problems, classify each mistake, and create three recall prompts from the errors. The plan uses three 25-minute focus blocks with two five-minute breaks. The final five minutes are reserved for a closed-book summary and the next-step note.',
        ],
        list: [
          'Block 1: solve problems 1-5 without checking solutions.',
          'Break: stand, refill water, and leave the desk.',
          'Block 2: solve problems 6-10 and mark uncertain steps.',
          'Break: stretch and look away from the screen.',
          'Block 3: solve problems 11-12, check all work, and turn errors into three questions.',
          'Close: write what to practice first tomorrow.',
        ],
      },
      {
        heading: 'Common mistakes to remove',
        paragraphs: [
          'Do not restart the timer every time attention slips. Note the distraction and return; otherwise the timer becomes a perfection test. Do not pack the break with another demanding task. And do not use a long list of unrelated goals inside one block, because task switching can consume the time you hoped to save.',
          'The simplest useful version is one outcome, one interval, one planned break, and one next-action note. Once that works consistently, add more cycles or longer blocks.',
        ],
      },
    ],
    sources: [
      {
        title: 'Dunlosky et al. (2013), Improving Students’ Learning With Effective Learning Techniques',
        url: 'https://doi.org/10.1177/1529100612453266',
      },
    ],
  },
  {
    slug: 'active-recall-guide',
    title: 'Active Recall: A Practical Guide for Turning Notes Into Questions',
    shortTitle: 'Turn notes into active recall',
    description: 'Use closed-book retrieval, fast feedback, and better prompts instead of repeatedly rereading familiar pages.',
    category: 'Learning methods',
    readTime: '8 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['active recall', 'retrieval practice', 'study questions', 'learning techniques'],
    intro: [
      'Rereading can feel productive because the page becomes familiar. Familiarity, however, is not the same as being able to produce an answer when the book is closed. Active recall changes the task: you deliberately try to retrieve an idea, procedure, or example from memory and then compare the attempt with a reliable source.',
      'The method does not require a large flashcard system. A blank sheet, a list of headings, or five well-written questions can create a useful retrieval session. The important parts are making a genuine attempt, checking quickly, and returning to the gaps later.',
    ],
    sections: [
      {
        heading: '1. Convert headings into prompts',
        paragraphs: [
          'Start with the structure already present in your material. Turn each heading into a question that requires an explanation, comparison, sequence, calculation, or example. Avoid prompts that can be answered with a vague feeling of recognition.',
          'A strong prompt makes the expected output clear. “Mitosis?” is too broad. “List the phases of mitosis in order and state the main event in each phase” gives you a target that can be checked.',
        ],
        list: [
          'Definition prompt: What does this term mean in my own words?',
          'Mechanism prompt: How does this process work, step by step?',
          'Comparison prompt: How are these two ideas similar, and where do they differ?',
          'Application prompt: Which principle applies to this example, and why?',
          'Error prompt: What mistake am I likely to make here, and how can I detect it?',
        ],
      },
      {
        heading: '2. Attempt the answer with the source closed',
        paragraphs: [
          'Hide the notes before answering. Speak, write, sketch, calculate, or teach the idea from memory. The attempt may be incomplete; that difficulty is useful information. Opening the notes after the first few seconds turns retrieval into another reading session.',
          'Set a reasonable stopping rule. For a short factual prompt, thirty seconds may be enough. For a mechanism or worked problem, use several minutes. When you truly cannot continue, mark the point where the answer failed and check the source.',
        ],
      },
      {
        heading: '3. Check for meaning, not matching sentences',
        paragraphs: [
          'Compare your answer with the source and classify the result. Correct means the core idea and important conditions are present. Partial means the structure is right but a step, exception, or example is missing. Missed means you could not reconstruct the idea or used the wrong rule.',
          'Do not spend time rewriting a perfect model answer after every attempt. Add only the missing piece, correct the error, and create a shorter prompt for the weak point. This keeps the session focused on retrieval rather than decorative notes.',
        ],
        callout: {
          title: 'Fast feedback code',
          text: 'C = correct, P = partial, M = missed. Revisit P and M prompts after a delay instead of repeating every item immediately.',
        },
      },
      {
        heading: '4. Use the prompt ladder when a question is too hard',
        paragraphs: [
          'When a broad question produces silence, reduce the difficulty without revealing the whole answer. First ask for the category, then the first step, then a cue. After reconstructing the answer, retry the original question later without the hints.',
        ],
        list: [
          'Full prompt: Explain how an action potential travels along an axon.',
          'Reduced prompt: What changes first at the membrane?',
          'Cue: Think about sodium channels and membrane potential.',
          'Retry: Explain the complete sequence from threshold to repolarization.',
        ],
      },
      {
        heading: '5. Adapt active recall by subject',
        paragraphs: [
          'For mathematics and physics, recall the decision process rather than memorizing a finished solution. Cover the worked example, identify the knowns and unknowns, choose a method, and complete the steps. Then compare your reasoning with the solution and label the first incorrect decision.',
          'For essays and humanities, retrieve arguments, evidence, chronology, and counterarguments. Use blank-page outlines and explain why each piece of evidence supports a claim. For languages, retrieve meaning in both directions and produce the word or structure inside a sentence.',
        ],
      },
      {
        heading: 'A 20-minute active-recall routine',
        list: [
          'Two minutes: select five to eight prompts from one topic.',
          'Twelve minutes: answer with notes closed and mark C, P, or M.',
          'Four minutes: check only the partial and missed items; write minimal corrections.',
          'Two minutes: schedule the weak prompts for a later session and state the topic from memory one final time.',
        ],
        paragraphs: [
          'End while the prompt set is still manageable. A small set that you revisit is more useful than hundreds of cards you never review. Keep prompts specific, remove duplicates, and rewrite questions that repeatedly confuse you for the wrong reason.',
        ],
      },
    ],
    sources: [
      {
        title: 'Roediger and Karpicke (2006), Test-Enhanced Learning',
        url: 'https://doi.org/10.1111/j.1467-9280.2006.01693.x',
      },
      {
        title: 'Dunlosky et al. (2013), Improving Students’ Learning With Effective Learning Techniques',
        url: 'https://doi.org/10.1177/1529100612453266',
      },
    ],
  },
  {
    slug: 'spaced-practice-plan',
    title: 'A Simple Spaced-Practice Plan You Can Maintain During a Busy Week',
    shortTitle: 'Make a spaced-practice plan',
    description: 'Build a lightweight review schedule that prioritizes weak material without creating an impossible flashcard backlog.',
    category: 'Learning methods',
    readTime: '7 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['spaced practice', 'spaced repetition', 'review schedule', 'study plan'],
    intro: [
      'Spacing means returning to material after time has passed instead of compressing every review into one long sitting. The practical challenge is not understanding the idea; it is creating a schedule that survives classes, work, deadlines, and low-energy days.',
      'You do not need a perfect algorithm. You need a small set of review dates, a way to identify weak items, and permission to reduce the workload when the backlog grows. The plan below is designed for notes, practice questions, flashcards, diagrams, and problem types.',
    ],
    sections: [
      {
        heading: '1. Review the material in a different form',
        paragraphs: [
          'Spacing works best when the review requires retrieval or application. Reopening the same highlighted page can recreate familiarity without showing whether you can produce the idea. Use questions, blank-page summaries, practice problems, diagrams from memory, or short teaching explanations.',
          'Create review material while the topic is still fresh, but keep it lean. Capture the concepts, decisions, and errors that are likely to matter later. Do not turn every sentence into a card.',
        ],
      },
      {
        heading: '2. Start with a four-touch schedule',
        paragraphs: [
          'A practical default is to revisit a topic after roughly one day, three days, one week, and two weeks. The intervals do not need to be exact. Move them around deadlines and combine related topics when necessary. The schedule is a prompt to return, not a test of calendar perfection.',
          'On each review, spend more time on items that were partial or missed and less time on items you produced accurately. Successful items can move to a longer interval; weak items return sooner.',
        ],
        list: [
          'Touch 1: within 24 hours, reconstruct the main structure and find immediate gaps.',
          'Touch 2: about three days later, answer without the original order or cues.',
          'Touch 3: about one week later, mix the topic with similar material.',
          'Touch 4: about two weeks later, use exam-like or application questions.',
        ],
      },
      {
        heading: '3. Keep one review queue, not several competing systems',
        paragraphs: [
          'Choose one place for due reviews: a calendar, task manager, spreadsheet, or card app. Multiple lists make it difficult to know what is actually due. Each item needs only a topic, the next review date, and a short note about the weak point.',
          'Group reviews into a daily cap. For example, reserve twenty minutes or fifteen prompts. When the cap is reached, postpone lower-priority items instead of turning the queue into a second full course.',
        ],
      },
      {
        heading: '4. Rescue a backlog without reviewing everything',
        paragraphs: [
          'A backlog is a planning problem, not a character flaw. Sort items into three groups: needed soon, foundational, and optional. Review the needed-soon and foundational groups first. Archive duplicates, overly detailed prompts, and material that no longer matches the course.',
          'Use a reset session to sample the queue rather than completing it in order. Test a small number from each topic, identify where performance is weakest, and rebuild the schedule from that evidence.',
        ],
        callout: {
          title: 'Backlog rule',
          text: 'When the review list is larger than the time you can realistically give it, reduce the list before increasing the daily workload.',
        },
      },
      {
        heading: '5. Example weekly plan',
        list: [
          'Monday: learn Topic A and create eight retrieval prompts.',
          'Tuesday: first review of Topic A; learn Topic B.',
          'Thursday: second review of Topic A; first review of Topic B.',
          'Weekend: mixed practice using A and B, then schedule only the weak items.',
          'Following week: one exam-style check before extending the interval.',
        ],
        paragraphs: [
          'The plan remains small because each review is selective. Correct material takes less time; uncertain material receives another attempt. That feedback loop matters more than following a fixed number of days exactly.',
        ],
      },
    ],
    sources: [
      {
        title: 'Cepeda et al. (2006), Distributed Practice in Verbal Recall Tasks',
        url: 'https://doi.org/10.1037/0033-2909.132.3.354',
      },
      {
        title: 'Dunlosky et al. (2013), Improving Students’ Learning With Effective Learning Techniques',
        url: 'https://doi.org/10.1177/1529100612453266',
      },
    ],
  },
  {
    slug: 'study-with-music',
    title: 'How to Study With Music Without Letting the Playlist Take Over',
    shortTitle: 'Study with music more deliberately',
    description: 'Match sound to the task, reduce switching, and run a simple experiment to learn when ambience helps your own focus.',
    category: 'Study environment',
    readTime: '6 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['study music', 'lofi study', 'focus environment', 'K-pop study'],
    intro: [
      'Music can make a study space feel inviting, but choosing tracks can also become the activity that replaces studying. The useful question is not whether music is universally good or bad. It is whether a particular sound setup helps you complete a particular type of work with fewer restarts and acceptable accuracy.',
      'Use music as an environment setting, not a stream of decisions. Choose the sound before the session, lower the chance of skipping tracks, and evaluate the result after the block instead of constantly adjusting it.',
    ],
    sections: [
      {
        heading: '1. Match the sound to the language demand',
        paragraphs: [
          'Tasks that depend heavily on reading, writing, or verbal recall may compete with noticeable lyrics or speech. For those blocks, try instrumental versions, familiar low-detail tracks, rain, cafe noise, or silence. For repetitive organization or routine exercises, a more energetic playlist may feel easier to tolerate.',
          'The same person can need different sound for different tasks. Avoid creating one permanent rule such as “I can only study with music.” Treat the setup as adjustable equipment.',
        ],
      },
      {
        heading: '2. Remove playlist decisions from the focus block',
        list: [
          'Choose one playlist before the timer starts.',
          'Use a volume that does not require attention to follow the track.',
          'Avoid browsing comments, recommendations, or related videos during the block.',
          'If a song distracts you, note it and change the playlist during the break rather than opening the player immediately.',
        ],
        paragraphs: [
          'A playlist with frequent surprises can keep pulling attention back to the player. Familiar, consistent sound is often easier to leave in the background. The goal is not to create the perfect mood; it is to stop managing the mood once work begins.',
        ],
      },
      {
        heading: '3. Use a two-session comparison',
        paragraphs: [
          'Instead of relying on how focused you felt, compare two similar sessions. Use the same task type and timer length. Complete one session with your usual music and one with instrumental sound or silence. Record how much work was completed, the number of avoidable mistakes, and how often you switched away from the task.',
          'Keep the condition that produces a better combination of progress, accuracy, and willingness to return. Different answers are reasonable for different subjects.',
        ],
        callout: {
          title: 'Three questions after the timer',
          text: 'What did I finish? How many times did I change or check the audio? Did the sound hide fatigue, or did it help me stay with the task?',
        },
      },
      {
        heading: '4. Separate motivation music from concentration music',
        paragraphs: [
          'A favorite track can be useful as a start ritual or a reward during the break, even if it is too engaging for complex work. Use one song to begin, then switch to a steadier background for the focus interval. This keeps the emotional benefit without asking the same audio to serve every purpose.',
          'In the IdoreStudy room, choose the ambience once, minimize the music controls, and keep the timer outcome visible. The study tools should remain the main interaction; the media is optional atmosphere.',
        ],
      },
      {
        heading: '5. Know when to turn it off',
        paragraphs: [
          'Silence is the better choice when you repeatedly reread sentences, lose your place, miss details, or spend more time selecting music than working. It can also help during timed practice if the real assessment will be quiet. Turning music off is not a failed session; it is an adjustment based on the task.',
          'Keep a low-friction alternative ready: a neutral ambient track, earplugs, or a quieter location. The less time you spend renegotiating the environment, the more of the session remains available for the work itself.',
        ],
      },
    ],
    sources: [
      {
        title: 'Perham and Currie (2014), Does Listening to Preferred Music Improve Reading Comprehension Performance?',
        url: 'https://doi.org/10.1002/acp.2994',
      },
      {
        title: 'Salamé and Baddeley (1989), Effects of Background Music on Phonological Short-Term Memory',
        url: 'https://doi.org/10.1080/14640748908402355',
      },
    ],
  },
  {
    slug: 'exam-week-study-plan',
    title: 'An Exam-Week Study Plan for Too Much Material and Too Little Time',
    shortTitle: 'Plan a realistic exam week',
    description: 'Triage topics, prioritize practice, and build daily finish lines without pretending every chapter deserves equal time.',
    category: 'Exam preparation',
    readTime: '8 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['exam week', 'study schedule', 'exam preparation', 'revision plan'],
    intro: [
      'Exam week creates a planning trap: everything feels urgent, so the schedule gives everything equal space. That usually produces long lists, frequent switching, and shallow review. A stronger plan accepts that time is limited and directs the best hours toward material that is both important and currently weak.',
      'This process begins with a quick inventory, not a perfect timetable. You will sort topics, choose daily outputs, and use practice to decide what moves up or down the list.',
    ],
    sections: [
      {
        heading: '1. Build a one-page exam map',
        paragraphs: [
          'For each exam, write the date, format, major topics, available practice material, and your current confidence. Keep the map to one page so you can compare courses without opening several systems. Mark any fixed commitments that reduce available study time.',
          'Do not estimate confidence from how familiar the notes look. Use a short diagnostic: answer a few representative questions, produce a blank-page outline, or explain the topic without support.',
        ],
      },
      {
        heading: '2. Triage topics into three groups',
        list: [
          'Priority A: likely to matter and currently weak. These receive your best focus blocks.',
          'Priority B: important and partly secure. These receive mixed practice and brief checks.',
          'Priority C: low weight, already secure, or unlikely to improve enough to justify major time. These receive a quick review or are deliberately postponed.',
        ],
        paragraphs: [
          'The purpose of Priority C is to make the plan honest. Leaving something out intentionally is safer than hiding it inside an impossible schedule and feeling behind all week.',
        ],
      },
      {
        heading: '3. Give each day two major outputs',
        paragraphs: [
          'Choose one primary output and one secondary output. An output is something you can inspect: a completed practice set, a recalled essay plan, a corrected error log, or a timed section. Smaller maintenance tasks can fit around them, but the day should not depend on completing ten unrelated goals.',
          'Place the hardest Priority A output in the part of the day when you are most reliable. Use lower-energy periods for sorting notes, checking answers, or reviewing already-built prompts.',
        ],
        callout: {
          title: 'Daily planning sentence',
          text: 'By the end of today, I will have completed ____ and checked ____. If time remains, I will review ____.',
        },
      },
      {
        heading: '4. Let practice change the schedule',
        paragraphs: [
          'After each practice block, record the first cause of each error: missing knowledge, wrong method, misread question, careless execution, or time pressure. Schedule the cause, not just the chapter. A small error log can reveal that several topics share the same underlying problem.',
          'Move a topic down when you can answer varied questions accurately. Move it up when errors repeat after feedback. A useful schedule is allowed to change; the diagnostic evidence is more valuable than loyalty to Monday’s plan.',
        ],
      },
      {
        heading: '5. Protect the final evening from panic expansion',
        paragraphs: [
          'Set a stopping point for new material. Use the final evening for brief retrieval, logistics, and a short list of high-value reminders. Avoid adding a new resource simply because it looks comprehensive. A new book, playlist, or video series can create the feeling of preparation while replacing the practice you already know you need.',
          'Prepare what reduces morning friction: required materials, route or login information, food, water, and the first review prompt. A calm start does not guarantee a result, but unnecessary logistics should not consume attention reserved for the exam.',
        ],
      },
      {
        heading: 'A compact three-day example',
        list: [
          'Day 1: diagnostic questions, Priority A topic repair, and a short mixed set.',
          'Day 2: timed practice, error classification, and targeted recall of the repeated gaps.',
          'Day 3: second timed check, concise review of weak points, and exam logistics.',
        ],
        paragraphs: [
          'Repeat the structure for each course, but reduce the number of major outputs when exams overlap. The plan succeeds by making priorities visible, not by filling every hour.',
        ],
      },
    ],
    sources: [
      {
        title: 'Dunlosky et al. (2013), Improving Students’ Learning With Effective Learning Techniques',
        url: 'https://doi.org/10.1177/1529100612453266',
      },
    ],
  },
  {
    slug: 'distraction-light-study-environment',
    title: 'Build a Distraction-Light Study Environment Without Waiting for Perfect Focus',
    shortTitle: 'Reduce distractions before they start',
    description: 'Use friction, a visible next action, and a restart routine to make distraction less convenient and returning easier.',
    category: 'Study environment',
    readTime: '8 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['study distractions', 'focus environment', 'phone distractions', 'study routine'],
    intro: [
      'A distraction-light environment does not require an empty room, perfect silence, or unlimited willpower. It requires fewer tempting actions within immediate reach and a clear path back when attention moves. The objective is to make the intended task easier to begin than the common alternatives.',
      'Set up the environment around your predictable behavior. If you reach for your phone when a question becomes difficult, moving the phone matters more than promising not to touch it. If you open new tabs whenever a term is unclear, capture the term on a lookup list and continue until the break.',
    ],
    sections: [
      {
        heading: '1. Remove the first click',
        paragraphs: [
          'Most detours begin with a small action: unlocking the phone, opening a new tab, or checking one notification. Add friction to that first action. Put the phone across the room, log out of the most distracting site, close unrelated tabs, or use a separate browser profile for study.',
          'Friction should be inconvenient, not dramatic. You still need access during a real break or emergency. The aim is to create enough pause that you notice the decision before the detour becomes automatic.',
        ],
      },
      {
        heading: '2. Put the next action in view',
        paragraphs: [
          'A clean desk is not useful if you still do not know what to do. Place the exact materials for the first action within reach and hide the rest. Write the finish line at the top of the page or in the study-room task list.',
          'When a task feels vague, your environment contains no obvious invitation to begin. “Open the worksheet and solve question one” is easier to follow than “be productive.”',
        ],
      },
      {
        heading: '3. Create a parking place for interruptions',
        paragraphs: [
          'Keep a small distraction list. When you remember a message, purchase, fact to search, or unrelated task, write it down without acting on it. Review the list during the break and decide what actually needs attention.',
          'This works because you do not have to choose between forgetting the thought and following it immediately. The note protects the thought while the timer protects the current task.',
        ],
        callout: {
          title: 'Parking-list rule',
          text: 'Write the thought in one line. Do not research, organize, or solve it until the focus block ends.',
        },
      },
      {
        heading: '4. Use a restart routine instead of judging the lapse',
        list: [
          'Notice: name what pulled you away without arguing with it.',
          'Record: add it to the parking list if it still matters.',
          'Return: read the visible finish line and complete the smallest next step.',
        ],
        paragraphs: [
          'Do not reset the entire session because of one lapse. Frequent restarts can become another avoidance pattern. Return to the current block and evaluate the setup afterward.',
        ],
      },
      {
        heading: '5. Design for the difficult day',
        paragraphs: [
          'On low-energy days, lower the starting requirement. Use a twenty-minute block, one practice question, or a five-minute setup task. Keep the environment ready enough that beginning does not require a long cleaning or planning ritual.',
          'A sustainable system includes a smaller version of the routine. The minimum session should still produce evidence of progress and a clear next action for tomorrow.',
        ],
      },
      {
        heading: '6. Match the environment to the kind of thinking',
        paragraphs: [
          'Not every task needs the same level of silence or visual control. Familiar calculation, filing notes, and routine review may tolerate low-detail instrumental audio. New proofs, dense reading, writing, or memorization often need fewer competing words and fewer visible prompts. Treat the environment as a variable you can test rather than a personality label such as “I always study with music.”',
          'Run a small comparison when you are unsure. Complete two similar ten-minute tasks under different conditions, then compare accuracy, recall, and how often you switched away. Keep the condition that helped the work, even when the other condition felt more entertaining. Comfort can support persistence, but performance is the more useful decision signal.',
        ],
      },
      {
        heading: '7. Review the setup after the session',
        paragraphs: [
          'At the end of the block, identify the first distraction rather than listing every lapse. Ask what made that detour easy: a visible notification, an unclear instruction, missing material, hunger, noise, or a task that was too large. Change one part of the setup for the next block. A single useful adjustment is easier to repeat than rebuilding the entire room.',
          'Also record what helped you return. The visible outcome, parking list, timer, closed browser tabs, or prepared next action may have shortened the interruption. Keeping the effective cue matters as much as removing the distraction. Over several sessions, this creates a personal environment checklist based on observed behavior instead of generic productivity rules.',
        ],
      },
      {
        heading: 'Five-minute setup checklist',
        list: [
          'Write one finish line.',
          'Open only the required materials.',
          'Move the phone or enable a deliberate focus mode.',
          'Choose the audio condition before starting.',
          'Place water nearby and begin the smallest visible action.',
        ],
      },
    ],
    sources: [
      {
        title: 'Ward et al. (2017), Brain Drain: The Mere Presence of One’s Own Smartphone Reduces Available Cognitive Capacity',
        url: 'https://doi.org/10.1086/691462',
      },
    ],
  },
  {
    slug: 'better-study-breaks',
    title: 'Better Study Breaks: A Menu for 5, 10, and 30 Minutes',
    shortTitle: 'Take breaks that are easy to end',
    description: 'Choose breaks with a clear stopping point so you can reset without turning five minutes into the rest of the evening.',
    category: 'Focus planning',
    readTime: '7 min read',
    datePublished: '2026-08-20',
    dateModified: '2026-08-20',
    keywords: ['study breaks', 'Pomodoro break', 'focus reset', 'study routine'],
    intro: [
      'The best break is not simply the most enjoyable option available. It is an activity that changes your state, fits the time, and has a clear ending. A break that requires another negotiation to stop can make returning harder than the original task.',
      'Create a small break menu before the session. When the timer ends, choose from the menu instead of opening the first app within reach. Different lengths serve different purposes, so the list below separates quick resets from longer recovery.',
    ],
    sections: [
      {
        heading: 'Five-minute reset',
        paragraphs: [
          'Use five minutes to leave the exact posture and visual distance of the task. Stand, move, and avoid beginning anything that normally lasts much longer than five minutes.',
        ],
        list: [
          'Refill water or make a simple drink.',
          'Walk to another room and back.',
          'Stretch the areas that feel stiff.',
          'Look outside or across the room instead of at another close screen.',
          'Check the distraction parking list and handle only a genuinely urgent item.',
        ],
      },
      {
        heading: 'Ten-minute reset',
        paragraphs: [
          'Ten minutes allows a little more movement and a small snack, but the activity still needs a clear boundary. Set the break timer before leaving the desk if time tends to disappear.',
        ],
        list: [
          'Take a short walk without adding an errand.',
          'Prepare a snack that is already available.',
          'Do a brief mobility routine.',
          'Listen to one or two favorite songs away from the work screen.',
          'Tidy only the immediate study surface, not the entire room.',
        ],
      },
      {
        heading: 'Thirty-minute recovery',
        paragraphs: [
          'After several focus blocks, use a longer break for a meal, shower, walk, or genuine conversation. Decide the return time before the break begins. Longer breaks can include enjoyable media, but choose something with a defined endpoint rather than an open feed.',
        ],
      },
      {
        heading: 'Breaks that often overrun',
        paragraphs: [
          'Short-form feeds, multiplayer games, online shopping, and “one quick video” have weak stopping cues. They are not forbidden, but they are poor default choices for a five-minute break when you intend to resume demanding work.',
          'If you choose one, add an external boundary: a timer across the room, one preselected video, or a specific message to answer. Do not rely on noticing that enough time has passed.',
        ],
      },
      {
        heading: 'Choose the break by the state you need to change',
        paragraphs: [
          'Use the break to answer a specific problem. If your eyes are tired, increase viewing distance and stop reading. If your body is restless, move. If you are hungry or thirsty, address that directly. If frustration is high, choose a simple activity with no performance goal. Replacing one demanding screen with another may feel different without giving the overloaded system much of a reset.',
          'A pleasant break is still allowed. The distinction is between deliberate enjoyment and automatic escape. Name the purpose before the timer ends: movement, food, distance, social contact, or mental quiet. That purpose helps you select an activity that fits the available minutes and makes the return less negotiable.',
        ],
      },
      {
        heading: 'Build a transition at both ends',
        paragraphs: [
          'A break works better when it has an opening and a closing cue. At the start, stand up, start a separate timer, and leave the work surface. Near the end, refill water, silence the break activity, and return to the prepared next action. These cues reduce the chance that the break becomes an undefined period in which every extra minute feels harmless.',
          'When returning is repeatedly difficult, shorten the break or choose an activity with a stronger endpoint. You can also use a two-minute re-entry block: sit down, read the last completed line, and perform one easy action before deciding whether to restart the full timer. Momentum often returns after contact with the task, not before it.',
        ],
      },
      {
        heading: 'Know when a break is not enough',
        paragraphs: [
          'If concentration collapses across several blocks, the problem may be sleep loss, illness, pain, intense stress, or an unrealistic workload rather than a poorly chosen five-minute activity. Repeatedly forcing another cycle can produce more time at the desk without useful learning. Consider ending the session, reducing the outcome, or seeking appropriate support when the pattern continues.',
          'A responsible study plan includes a stopping rule. For example: after two low-quality blocks and one real recovery break, switch to a smaller maintenance task or stop for the day. The goal is not to prove endurance; it is to protect tomorrow’s ability to learn while still leaving a clear next action.',
        ],
      },
      {
        heading: 'Use the break to prepare the return',
        paragraphs: [
          'Before the focus block ends, leave a one-line next action. When the break timer rings, return to that line rather than reviewing the entire task. A prepared return reduces the gap between sitting down and restarting.',
        ],
        callout: {
          title: 'Return cue',
          text: 'When I come back, I will open ____ and do ____ for the first two minutes.',
        },
      },
    ],
    sources: [
      {
        title: 'Ariga and Lleras (2011), Brief and Rare Mental Breaks Keep You Focused',
        url: 'https://doi.org/10.1016/j.cognition.2010.12.007',
      },
      {
        title: 'Redondo et al. (2025), The Impact of Break Schedules on Digital Eye Strain Symptoms and Ocular Accommodation',
        url: 'https://doi.org/10.1016/j.exer.2025.110463',
      },
    ],
  },
];

export const guides = [...coreGuides, ...additionalGuides];

export function getGuide(slug) {
  return guides.find((guide) => guide.slug === slug);
}
