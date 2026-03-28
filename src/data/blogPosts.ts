export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverUrl: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

export const BLOG_CATEGORIES = [
  "Productivity",
  "Mindset",
  "Career Growth",
  "Deep Learning",
  "Wellness",
  "Creativity",
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Deep Work in a Shallow World",
    slug: "the-art-of-deep-work-in-a-shallow-world",
    excerpt:
      "Why blocking your schedule isn't enough, and how to cultivate a 'monastic' focus in the age of constant notification.",
    contentMarkdown: `## Why Deep Work Matters More Than Ever

In our hyper-connected world, the ability to perform deep work — cognitively demanding tasks that require uninterrupted focus — has become both increasingly rare and increasingly valuable.

Cal Newport, in his landmark book *Deep Work*, argues that the ability to focus without distraction on a cognitively demanding task is one of the most valuable skills in our economy. Yet most knowledge workers spend their days in a state of constant distraction — switching between email, Slack, social media, and shallow tasks that feel productive but produce little value.

### The Cost of Shallow Work

Research from the University of California found that it takes an average of **23 minutes and 15 seconds** to regain focus after an interruption. If you're interrupted just four times in a morning, you've lost nearly an hour and a half of productive time — not to the interruptions themselves, but to the costly process of context switching.

### Building Your Deep Work Practice

Here's how to start cultivating deep work in your daily routine:

**1. Choose Your Depth Philosophy**

Newport outlines four approaches:
- **Monastic**: Eliminate or radically minimize shallow obligations (think: a novelist who doesn't have email)
- **Bimodal**: Dedicate some clearly defined stretches to deep work and leave the rest open
- **Rhythmic**: Transform deep work into a regular habit with a set schedule
- **Journalistic**: Fit deep work wherever you can into your schedule

For most professionals, the **rhythmic philosophy** works best. Set a recurring daily block — even 90 minutes — and protect it fiercely.

**2. Create Your Shutdown Ritual**

At the end of each workday, review your task list, capture any loose thoughts, and explicitly say "shutdown complete." This trains your brain that work is done, allowing true rest and recovery.

**3. Embrace Boredom**

If every moment of potential boredom — waiting in line, sitting in traffic — is relieved with a glance at your phone, you're training your brain to need constant stimulation. Practice being bored. It strengthens your ability to focus.

### The Deep Work Formula

> **High-Quality Work Produced = (Time Spent) × (Intensity of Focus)**

This means a focused 4-hour day can outproduce a distracted 8-hour day. The goal isn't to work more; it's to work with more intensity.

### Start Today

Block out 90 minutes tomorrow morning. Turn off all notifications. Close your email. Work on one important task with complete focus. Notice how it feels. That's what deep work is — and once you experience it, you'll never want to go back to the shallow end.`,
    coverUrl: "/images/blog/deep-work.png",
    author: "Doable Team",
    category: "Productivity",
    tags: ["focus", "deep-work", "productivity", "cal-newport"],
    readingTime: 12,
    status: "published",
    publishedAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-20T10:00:00Z",
    seo: {
      metaTitle: "The Art of Deep Work in a Shallow World | Doable Blog",
      metaDescription:
        "Learn how to cultivate deep focus and produce high-quality work in an age of constant distraction. Practical strategies from Cal Newport's Deep Work framework.",
    },
  },
  {
    id: "2",
    title: "Why Your Morning Routine is Failing You (and How to Fix It)",
    slug: "why-your-morning-routine-is-failing-you",
    excerpt:
      "Forget the 5 AM club. The real secret to a productive morning starts the night before with intentionality.",
    contentMarkdown: `## The Morning Routine Myth

Every productivity guru has a morning routine. Wake up at 5 AM. Meditate. Journal. Exercise. Cold shower. Drink celery juice. Read for 30 minutes. All before the sun comes up.

Here's the problem: most morning routine advice is designed for people who already have their lives together. For the rest of us — the ones juggling deadlines, kids, and an inbox that never sleeps — a rigid 5 AM routine isn't just impractical. It's counterproductive.

### Why Most Routines Fail

**They're too ambitious.** Going from hitting snooze three times to a 90-minute morning ritual is like going from couch to marathon. You'll last about three days.

**They ignore chronobiology.** Not everyone is a morning person. Research on chronotypes shows that roughly 25% of people are naturally wired to peak later in the day.

**They focus on morning, not evening.** A great morning starts the night before. If you're scrolling your phone until midnight and getting 5 hours of sleep, no morning routine will save you.

### A Better Approach

**Step 1: Fix your shutdown time.** Pick a time to stop all screens — at least 30 minutes before bed. This is more important than your wake-up time.

**Step 2: Prepare one decision.** Before bed, decide the single most important thing you'll work on first tomorrow. Write it on a sticky note. This eliminates morning decision fatigue.

**Step 3: Start with a 15-minute anchor.** Choose ONE activity: journaling, stretching, reading, or a quiet cup of coffee. Not all four. Just one.

**Step 4: Protect the first hour.** No email. No social media. No news. Give your mind one hour of input-free space each morning.

### The Compound Effect

A consistent 15-minute morning practice beats an inconsistent 90-minute one every time. After 30 days of your simple anchor habit, add a second element. After 60 days, add a third. Build your routine like you'd build a house — foundation first.`,
    coverUrl: "/images/blog/deep-work.png",
    author: "Doable Team",
    category: "Mindset",
    tags: ["morning-routine", "habits", "productivity", "mindset"],
    readingTime: 8,
    status: "published",
    publishedAt: "2024-05-14T10:00:00Z",
    updatedAt: "2024-05-14T10:00:00Z",
    seo: {
      metaTitle: "Why Your Morning Routine is Failing You | Doable Blog",
      metaDescription:
        "Stop chasing the 5 AM myth. Learn how to build a morning routine that actually works — starting with what you do the night before.",
    },
  },
  {
    id: "3",
    title: "The 'Invisible Skills' That Lead to Rapid Promotions",
    slug: "invisible-skills-that-lead-to-rapid-promotions",
    excerpt:
      "Technical skills are the baseline. Empathy, narrative building, and conflict resolution are the accelerators.",
    contentMarkdown: `## Beyond Technical Excellence

You've seen it happen. Someone who's technically average gets promoted over the brilliant engineer, the meticulous analyst, or the creative genius. It seems unfair — until you understand what's actually being evaluated.

Organizations don't just promote competence. They promote *leadership potential*. And leadership potential is measured by a set of skills that rarely appear on any job description.

### The Three Invisible Skills

**1. Narrative Intelligence**

The ability to frame complex situations as compelling stories is perhaps the most underrated skill in any organization. Leaders who can take a messy project update and turn it into a clear narrative — "Here's where we are, here's why, here's where we're going" — are immediately seen as more senior.

*Practice this:* In your next meeting, structure your update as: **Context → Challenge → Action → Result**. Watch how differently people receive it.

**2. Emotional Regulation Under Pressure**

Anyone can be calm when things are going well. The invisible skill is staying composed when a project is on fire, a client is angry, or a deadline is impossible. This doesn't mean suppressing emotions — it means processing them quickly and responding thoughtfully.

*Practice this:* When you feel reactive, pause for 3 seconds before responding. Name the emotion internally ("I'm frustrated because..."). Then choose your response.

**3. Conflict Translation**

Most people avoid conflict. Good leaders resolve it. Great leaders *translate* it — turning opposing viewpoints into shared understanding. This skill alone will set you apart faster than any certification.

*Practice this:* In your next disagreement, try this: "What I hear you saying is [their position]. What I'm concerned about is [your concern]. Can we find an approach that addresses both?"

### The Career Multiplier

Technical skills get you hired. Invisible skills get you promoted. The best part? While everyone is busy collecting certifications and hard skills, these soft skills remain an uncrowded playing field. Start developing them now and you'll be the person everyone wants on their team — and in their leadership pipeline.`,
    coverUrl: "/images/blog/deep-work.png",
    author: "Doable Team",
    category: "Career Growth",
    tags: ["career", "leadership", "soft-skills", "promotion"],
    readingTime: 10,
    status: "published",
    publishedAt: "2024-05-10T10:00:00Z",
    updatedAt: "2024-05-10T10:00:00Z",
    seo: {
      metaTitle: "Invisible Skills That Lead to Rapid Promotions | Doable Blog",
      metaDescription:
        "Technical skills get you hired. Learn the three invisible skills — narrative intelligence, emotional regulation, and conflict translation — that actually get you promoted.",
    },
  },
  {
    id: "4",
    title: "How to Learn Any New Skill in 20 Hours",
    slug: "how-to-learn-any-new-skill-in-20-hours",
    excerpt:
      "Deconstructing the Josh Kaufman method for rapid skill acquisition in the modern workplace.",
    contentMarkdown: `## The 10,000 Hour Myth

Malcolm Gladwell popularized the idea that mastery requires 10,000 hours of deliberate practice. While this may be true for becoming a world-class expert, it's wildly misleading for practical skill acquisition.

Josh Kaufman's research reveals something far more encouraging: you can go from knowing nothing to being reasonably good at any skill in approximately **20 hours** of focused, deliberate practice. That's about 45 minutes a day for a month.

### The Four-Step Framework

**Step 1: Deconstruct the Skill**

Most skills are actually bundles of smaller sub-skills. Break them down. If you want to learn guitar, you don't need to master music theory, fingerpicking, strumming, chord transitions, and soloing all at once. Identify the 3-4 sub-skills that will give you 80% of the results.

**Step 2: Learn Enough to Self-Correct**

Get 3-5 resources on the topic — books, courses, tutorials. But don't use them to procrastinate. Skim enough to identify key concepts and common mistakes. Your goal isn't comprehensive knowledge; it's pattern recognition.

**Step 3: Remove Barriers to Practice**

This is where most people fail. They buy the guitar but leave it in the closet. They sign up for the course but never open it. Make your practice environment friction-free:

- Leave the guitar on a stand in your living room, not in a case
- Block out a specific time each day
- Turn off your phone during practice
- Have everything you need laid out before you start

**Step 4: Practice for at Least 20 Hours**

The first few hours of any new skill feel terrible. You're incompetent, confused, and frustrated. This is normal. Kaufman calls it the "frustration barrier" — and most people quit right here. Commit to 20 hours before making any judgment about your talent or the skill's difficulty.

### Practical Application at Work

This framework works for professional skills too:

- **Public speaking**: 20 hours of deliberate practice (recording yourself, getting feedback, studying great speakers) will transform your presentation abilities
- **Data analysis**: 20 hours with Excel/SQL focused on your actual work problems will make you the "data person" on your team
- **Writing**: 20 hours of daily writing practice (even 500 words a day) will noticeably improve your communication

### The Key Insight

The biggest barrier to learning isn't time — it's emotional. We're afraid of looking foolish, of not being good enough. The 20-hour framework gives you permission to be terrible... for exactly 20 hours. After that, you'll be surprised at how far you've come.`,
    coverUrl: "/images/blog/deep-work.png",
    author: "Doable Team",
    category: "Deep Learning",
    tags: ["learning", "skill-acquisition", "self-improvement", "josh-kaufman"],
    readingTime: 9,
    status: "published",
    publishedAt: "2024-05-02T10:00:00Z",
    updatedAt: "2024-05-02T10:00:00Z",
    seo: {
      metaTitle: "How to Learn Any New Skill in 20 Hours | Doable Blog",
      metaDescription:
        "Forget the 10,000-hour rule. Learn Josh Kaufman's 4-step framework for acquiring any new skill in just 20 hours of deliberate practice.",
    },
  },
  {
    id: "5",
    title: "Micro-Meditations for Busy Professionals",
    slug: "micro-meditations-for-busy-professionals",
    excerpt:
      "You don't need 30 minutes on a cushion. 60 seconds between meetings can reset your entire nervous system.",
    contentMarkdown: `## Why Traditional Meditation Fails Busy People

Let's be honest: most busy professionals have tried meditation and quit. The advice is always the same — sit for 20 minutes, focus on your breath, don't think about anything. For someone with 47 unread emails and a 2 PM deadline, this feels impossible. And when it feels impossible, it feels like failure. So we stop.

But here's what the research actually shows: the benefits of meditation aren't proportional to time spent. Even **60 seconds** of mindful awareness can measurably reduce cortisol levels, lower heart rate, and improve cognitive function.

### The Micro-Meditation Toolkit

These are designed for real-world use — in your office, between meetings, even in the elevator.

**1. The Box Breath (60 seconds)**

Used by Navy SEALs to stay calm under pressure:
- Inhale for 4 counts
- Hold for 4 counts
- Exhale for 4 counts
- Hold for 4 counts
- Repeat 3 times

Do this before any high-stakes meeting or difficult conversation.

**2. The 5-4-3-2-1 Reset (90 seconds)**

A grounding technique that pulls you out of anxiety and into the present:
- Notice 5 things you can **see**
- Notice 4 things you can **touch**
- Notice 3 things you can **hear**
- Notice 2 things you can **smell**
- Notice 1 thing you can **taste**

**3. The Meeting Transition (30 seconds)**

Between back-to-back meetings:
- Close your laptop
- Take 3 slow breaths
- Set one intention for the next meeting

This prevents emotional carryover from one meeting to the next.

**4. The Walking Reset (2 minutes)**

On your way to the restroom, the kitchen, or your next meeting:
- Walk 20% slower than normal
- Feel each foot making contact with the ground
- Notice the sensation of air on your skin

This is walking meditation without looking like you're meditating.

### Building the Habit

Don't try to meditate "more." Instead, attach micro-meditations to existing triggers:

- **Before opening email** → 3 box breaths
- **Between meetings** → Meeting Transition
- **Feeling overwhelmed** → 5-4-3-2-1 Reset
- **Walking anywhere** → Walking Reset

### The Science

A 2019 study in *Psychoneuroendocrinology* found that even brief mindfulness practices (1-5 minutes) performed consistently throughout the day produced stress-reduction benefits comparable to longer single sessions. The key isn't duration — it's frequency and consistency.

Start with one micro-meditation today. The total investment is 60 seconds. The returns are immeasurable.`,
    coverUrl: "/images/blog/deep-work.png",
    author: "Doable Team",
    category: "Wellness",
    tags: [
      "meditation",
      "wellness",
      "stress-management",
      "mindfulness",
    ],
    readingTime: 7,
    status: "published",
    publishedAt: "2024-04-21T10:00:00Z",
    updatedAt: "2024-04-21T10:00:00Z",
    seo: {
      metaTitle: "Micro-Meditations for Busy Professionals | Doable Blog",
      metaDescription:
        "You don't need 30 minutes to meditate. Learn 4 micro-meditation techniques that take 60 seconds and can reset your entire nervous system between meetings.",
    },
  },
];
