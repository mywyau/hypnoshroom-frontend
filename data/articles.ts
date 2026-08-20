export interface ArticleSection { heading: string; paragraphs: string[]; bullets?: string[] }
export interface Article { slug: string; title: string; summary: string; category: string; readTime: string; sections: ArticleSection[] }

export const articles: Article[] = [
  {
    slug: 'scala-2-to-scala-3', title: 'Should you migrate from Scala 2 to Scala 3?', category: 'Scala', readTime: '6 min read',
    summary: 'Scala 3 may be the right move. The useful question is whether it’s the right move for this system, now.',
    sections: [
      { heading: 'Start with the system, not the language version', paragraphs: ['First ask what this service is for and how much life it has left in it. A busy product that changes every week is a very different proposition from a stable service due to be retired next year.', 'Scala 3 gives you a clearer language and a better route to newer libraries. That doesn’t automatically make migration the most valuable thing your team could do next.'] },
      { heading: 'The compiler is only one part of it', paragraphs: ['Framework compatibility, sbt plugins, macros, internal libraries and the JDK usually decide how awkward the move will be. Find those constraints before anyone writes a migration plan.'], bullets: ['List the dependencies and plugins that matter', 'Find macros and compiler-specific code', 'Check Play and JDK compatibility', 'Make sure the important behaviour is covered by tests'] },
      { heading: 'Make small bets', paragraphs: ['You can remove warnings, update dependencies and strengthen tests before changing the Scala version. Each step makes the next one less dramatic. A handful of boring, reversible changes beats a heroic six-month migration branch.'] },
    ],
  },
  {
    slug: 'modernising-legacy-jvm-services', title: 'Modernising a legacy JVM service without making a bigger mess', category: 'Modernisation', readTime: '7 min read',
    summary: 'Old JVM services rarely need saving in one grand rewrite. They need a sensible order of work.',
    sections: [
      { heading: 'First, learn what “normal” looks like', paragraphs: ['Before changing the service, make sure you can see what it does today. A few useful logs and metrics, a visible deployment, and tests around the important paths are often enough to replace guesswork with evidence.'] },
      { heading: 'Don’t pile every risk into one release', paragraphs: ['A framework upgrade, JDK change, database migration and architecture rewrite do not belong in the same release just because they all count as modernisation. Smaller changes are easier to understand, test and undo.'], bullets: ['Write down the current runtime and build constraints', 'Start with dependencies at the edges', 'Keep behaviour changes separate from version changes', 'Watch what happens after each release'] },
      { heading: 'A roadmap isn’t the outcome', paragraphs: ['A review can tell you where to go. The value appears when the service reaches a supported, easier-to-change state. Leave room for implementation, production checks and a proper handover—not just the report.'] },
    ],
  },
  {
    slug: 'long-lived-play-framework-applications', title: 'Common problems in long-lived Play Framework applications', category: 'Play Framework', readTime: '5 min read',
    summary: 'The Play version gets the blame, but the real trouble is often hiding elsewhere.',
    sections: [
      { heading: 'Skipped upgrades add up', paragraphs: ['Miss a few Play, Scala and sbt releases and the eventual jump gets much wider. Plugins vanish, APIs move and an old JDK starts dictating where the service can run.'] },
      { heading: 'Look past the controllers', paragraphs: ['Slow builds, giant integration tests, blocking database calls and muddled service boundaries often hurt more than the framework version itself.'], bullets: ['Find blocking work and check its execution context', 'Treat JSON changes as API changes', 'Reduce global state where it blocks testing', 'Make configuration failures obvious at startup'] },
      { heading: 'Give yourself checkpoints', paragraphs: ['Map the important dependencies and protect the busiest user journeys before you begin. Upgrade in stages you can run and observe. It is much easier to find a bad change when it travelled alone.'] },
    ],
  },
  {
    slug: 'scala-or-java', title: 'When does Scala make sense over Java?', category: 'Engineering decisions', readTime: '6 min read',
    summary: 'Sometimes Scala earns its keep. Sometimes Java is the more honest choice.',
    sections: [
      { heading: 'Choose for the whole system', paragraphs: ['Language features matter. So do hiring, builds, libraries and the people who will be paged when something breaks. Scala is at its best when the type system and functional style genuinely make a hard problem simpler.'] },
      { heading: 'Your team changes the answer', paragraphs: ['A team already fluent in Scala is making a different choice from a Java team running a conventional Spring estate. Pick the language that leaves the fewest long-term surprises, not the one with the most impressive demo.'], bullets: ['How complicated is the problem?', 'Who will own the code in two years?', 'Do the libraries and frameworks fit?', 'Can the team build, debug and operate it confidently?'] },
    ],
  },
  {
    slug: 'technical-debt-without-a-rewrite', title: 'How to tackle technical debt without rewriting everything', category: 'Technical debt', readTime: '7 min read',
    summary: 'You probably don’t need a rewrite. You do need a better reason than “the code is messy.”',
    sections: [
      { heading: 'Say what the debt is costing you', paragraphs: ['“This code needs cleaning up” rarely wins an argument for time. “Releases take two days because nobody trusts these tests” might. Tie the debt to slow delivery, incidents, difficult onboarding or a product change you cannot safely make.'] },
      { heading: 'Make room for one safe change', paragraphs: ['Put tests around the behaviour you need to keep, then create a boundary where the new work can sit. Improve the part of the system touched by a real delivery goal instead of opening a cleanup project with no end.'], bullets: ['Measure the friction that keeps coming back', 'Protect the behaviour that matters', 'Reduce coupling at the point of change', 'Ship steps small enough for production'] },
    ],
  },
  {
    slug: 'safe-java-jdk-upgrades', title: 'Approaching Java and JDK upgrades safely', category: 'Java', readTime: '5 min read',
    summary: 'A JDK upgrade should be ordinary maintenance. Here’s how to stop it becoming an event.',
    sections: [
      { heading: 'The runtime reaches further than the code', paragraphs: ['A new JDK can uncover assumptions in libraries, build plugins, container images and production flags. A clean compile is encouraging; it is not proof that the service is ready.'] },
      { heading: 'Build confidence one step at a time', paragraphs: ['Update the tooling, compile cleanly, run tests that represent real behaviour, then watch the service in a production-like environment. Keep unrelated refactoring out of the upgrade.'], bullets: ['Check which framework versions support the JDK', 'Look for removed flags and modules', 'Exercise startup and graceful shutdown', 'Compare memory, latency and CPU under load'] },
    ],
  },
  {
    slug: 'maintainable-backend-services', title: 'What makes a backend service difficult to maintain?', category: 'Architecture', readTime: '6 min read',
    summary: 'It’s rarely one terrible class. Difficulty grows in the gaps between code, teams and production.',
    sections: [
      { heading: 'The hard parts live at the edges', paragraphs: ['Unclear ownership, hidden side effects and brittle integrations can make a small service miserable to change. Line count tells you very little. The route from an idea to a safe production release tells you much more.'] },
      { heading: 'Ask how quickly the system answers back', paragraphs: ['Fast tests, useful logs, repeatable environments and small deployments let engineers change things with confidence. When every form of feedback is slow or vague, even a modest change becomes expensive.'], bullets: ['One clear job for the service', 'Failures that are explicit and visible', 'Tests that resemble real behaviour', 'Enough production visibility to explain an incident', 'A release process people are willing to use'] },
    ],
  },
]

export const getArticle = (slug: string) => articles.find(article => article.slug === slug)
