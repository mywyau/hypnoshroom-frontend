export interface ArticleCode { label: string; language: string; source: string }
export interface ArticleSection { heading: string; paragraphs: string[]; bullets?: string[]; code?: ArticleCode }
export interface Article { slug: string; title: string; summary: string; category: string; topic: string; readTime: string; sections: ArticleSection[] }

export const articles: Article[] = [
  {
    slug: 'scala-2-to-scala-3', title: 'Should you migrate from Scala 2 to Scala 3?', category: 'Scala', topic: 'Scala', readTime: '6 min read',
    summary: 'Scala 3 may be the right move. The useful question is whether it’s the right move for this system, now.',
    sections: [
      { heading: 'Start with the system, not the language version', paragraphs: ['First ask what this service is for and how much life it has left in it. A busy product that changes every week is a very different proposition from a stable service due to be retired next year.', 'Scala 3 gives you a clearer language and a better route to newer libraries. That doesn’t automatically make migration the most valuable thing your team could do next.'] },
      { heading: 'The compiler is only one part of it', paragraphs: ['Framework compatibility, sbt plugins, macros, internal libraries and the JDK usually decide how awkward the move will be. Find those constraints before anyone writes a migration plan.'], bullets: ['List the dependencies and plugins that matter', 'Find macros and compiler-specific code', 'Check Play and JDK compatibility', 'Make sure the important behaviour is covered by tests'] },
      { heading: 'Make small bets', paragraphs: ['You can remove warnings, update dependencies and strengthen tests before changing the Scala version. Each step makes the next one less dramatic. A handful of boring, reversible changes beats a heroic six-month migration branch.'], code: { label: 'A small, mechanical Scala 3 change', language: 'scala', source: "// Scala 2\ndef load(id: UserId)(implicit logger: Logger): User =\n  repository.find(id)\n\n// Scala 3\ndef load(id: UserId)(using logger: Logger): User =\n  repository.find(id)" } },
    ],
  },
  {
    slug: 'modernising-legacy-jvm-services', title: 'Modernising a legacy JVM service without making a bigger mess', category: 'Modernisation', topic: 'JVM', readTime: '7 min read',
    summary: 'Old JVM services rarely need saving in one grand rewrite. They need a sensible order of work.',
    sections: [
      { heading: 'First, learn what “normal” looks like', paragraphs: ['Before changing the service, make sure you can see what it does today. A few useful logs and metrics, a visible deployment, and tests around the important paths are often enough to replace guesswork with evidence.'] },
      { heading: 'Don’t pile every risk into one release', paragraphs: ['A framework upgrade, JDK change, database migration and architecture rewrite do not belong in the same release just because they all count as modernisation. Smaller changes are easier to understand, test and undo.'], bullets: ['Write down the current runtime and build constraints', 'Start with dependencies at the edges', 'Keep behaviour changes separate from version changes', 'Watch what happens after each release'] },
      { heading: 'A roadmap isn’t the outcome', paragraphs: ['A review can tell you where to go. The value appears when the service reaches a supported, easier-to-change state. Leave room for implementation, production checks and a proper handover—not just the report.'], code: { label: 'Pin the runtime before changing the application', language: 'text', source: ".tool-versions\njava temurin-21.0.5+11\n\n# Verify the same runtime in CI\njava -version\nsbt test" } },
    ],
  },
  {
    slug: 'long-lived-play-framework-applications', title: 'Common problems in long-lived Play Framework applications', category: 'Play Framework', topic: 'Scala', readTime: '5 min read',
    summary: 'The Play version gets the blame, but the real trouble is often hiding elsewhere.',
    sections: [
      { heading: 'Skipped upgrades add up', paragraphs: ['Miss a few Play, Scala and sbt releases and the eventual jump gets much wider. Plugins vanish, APIs move and an old JDK starts dictating where the service can run.'] },
      { heading: 'Look past the controllers', paragraphs: ['Slow builds, giant integration tests, blocking database calls and muddled service boundaries often hurt more than the framework version itself.'], bullets: ['Find blocking work and check its execution context', 'Treat JSON changes as API changes', 'Reduce global state where it blocks testing', 'Make configuration failures obvious at startup'], code: { label: 'Keep blocking work off Play’s default dispatcher', language: 'scala', source: "def findUser(id: UserId) = Action.async {\n  Future(blocking(repository.find(id)))(databaseEc)\n    .map {\n      case Some(user) => Ok(Json.toJson(user))\n      case None       => NotFound\n    }\n}" } },
      { heading: 'Give yourself checkpoints', paragraphs: ['Map the important dependencies and protect the busiest user journeys before you begin. Upgrade in stages you can run and observe. It is much easier to find a bad change when it travelled alone.'] },
    ],
  },
  {
    slug: 'scala-or-java', title: 'When does Scala make sense over Java?', category: 'Engineering decisions', topic: 'Scala', readTime: '6 min read',
    summary: 'Sometimes Scala earns its keep. Sometimes Java is the more honest choice.',
    sections: [
      { heading: 'Choose for the whole system', paragraphs: ['Language features matter. So do hiring, builds, libraries and the people who will be paged when something breaks. Scala is at its best when the type system and functional style genuinely make a hard problem simpler.'] },
      { heading: 'Your team changes the answer', paragraphs: ['A team already fluent in Scala is making a different choice from a Java team running a conventional Spring estate. Pick the language that leaves the fewest long-term surprises, not the one with the most impressive demo.'], bullets: ['How complicated is the problem?', 'Who will own the code in two years?', 'Do the libraries and frameworks fit?', 'Can the team build, debug and operate it confidently?'], code: { label: 'The same small domain model in each language', language: 'scala / java', source: "// Scala\nfinal case class Payment(id: PaymentId, amount: BigDecimal)\n\n// Java\npublic record Payment(PaymentId id, BigDecimal amount) {}" } },
    ],
  },
  {
    slug: 'technical-debt-without-a-rewrite', title: 'How to tackle technical debt without rewriting everything', category: 'Technical debt', topic: 'Engineering', readTime: '7 min read',
    summary: 'You probably don’t need a rewrite. You do need a better reason than “the code is messy.”',
    sections: [
      { heading: 'Say what the debt is costing you', paragraphs: ['“This code needs cleaning up” rarely wins an argument for time. “Releases take two days because nobody trusts these tests” might. Tie the debt to slow delivery, incidents, difficult onboarding or a product change you cannot safely make.'] },
      { heading: 'Make room for one safe change', paragraphs: ['Put tests around the behaviour you need to keep, then create a boundary where the new work can sit. Improve the part of the system touched by a real delivery goal instead of opening a cleanup project with no end.'], bullets: ['Measure the friction that keeps coming back', 'Protect the behaviour that matters', 'Reduce coupling at the point of change', 'Ship steps small enough for production'], code: { label: 'Characterise today’s behaviour before refactoring', language: 'java', source: "@Test\nvoid keepsLegacyRoundingBehaviour() {\n  var price = calculator.total(new BigDecimal(\"12.345\"));\n\n  assertEquals(new BigDecimal(\"12.35\"), price);\n}" } },
    ],
  },
  {
    slug: 'safe-java-jdk-upgrades', title: 'Approaching Java and JDK upgrades safely', category: 'Java', topic: 'Java', readTime: '5 min read',
    summary: 'A JDK upgrade should be ordinary maintenance. Here’s how to stop it becoming an event.',
    sections: [
      { heading: 'The runtime reaches further than the code', paragraphs: ['A new JDK can uncover assumptions in libraries, build plugins, container images and production flags. A clean compile is encouraging; it is not proof that the service is ready.'] },
      { heading: 'Build confidence one step at a time', paragraphs: ['Update the tooling, compile cleanly, run tests that represent real behaviour, then watch the service in a production-like environment. Keep unrelated refactoring out of the upgrade.'], bullets: ['Check which framework versions support the JDK', 'Look for removed flags and modules', 'Exercise startup and graceful shutdown', 'Compare memory, latency and CPU under load'], code: { label: 'Make the target JDK explicit in Maven', language: 'xml', source: "<properties>\n  <maven.compiler.release>21</maven.compiler.release>\n</properties>\n\n<plugin>\n  <artifactId>maven-enforcer-plugin</artifactId>\n  <!-- fail early when CI uses the wrong JDK -->\n</plugin>" } },
    ],
  },
  {
    slug: 'maintainable-backend-services', title: 'What makes a backend service difficult to maintain?', category: 'Architecture', topic: 'Engineering', readTime: '6 min read',
    summary: 'It’s rarely one terrible class. Difficulty grows in the gaps between code, teams and production.',
    sections: [
      { heading: 'The hard parts live at the edges', paragraphs: ['Unclear ownership, hidden side effects and brittle integrations can make a small service miserable to change. Line count tells you very little. The route from an idea to a safe production release tells you much more.'] },
      { heading: 'Ask how quickly the system answers back', paragraphs: ['Fast tests, useful logs, repeatable environments and small deployments let engineers change things with confidence. When every form of feedback is slow or vague, even a modest change becomes expensive.'], bullets: ['One clear job for the service', 'Failures that are explicit and visible', 'Tests that resemble real behaviour', 'Enough production visibility to explain an incident', 'A release process people are willing to use'], code: { label: 'Make failures useful at the boundary', language: 'typescript', source: "try {\n  await payments.capture(command)\n} catch (error) {\n  logger.error({ error, paymentId: command.id }, 'capture failed')\n  throw createError({ statusCode: 502, message: 'Payment unavailable' })\n}" } },
    ],
  },
  {
    slug: 'typescript-backends-get-complicated', title: 'Where TypeScript backends start to get complicated', category: 'TypeScript', topic: 'TypeScript', readTime: '5 min read',
    summary: 'TypeScript makes a backend approachable. That does not guarantee it will stay simple as the system grows.',
    sections: [
      { heading: 'Types stop at the edges', paragraphs: ['A precise internal type cannot make an incoming request, database row or third-party response trustworthy. Validation still has to happen where untrusted data enters the system.', 'The trouble starts when a codebase treats a compile-time type as proof of runtime behaviour. Make the boundaries explicit and keep the validation close to them.'] },
      { heading: 'A folder structure is not an architecture', paragraphs: ['Controllers, services and repositories can look tidy while responsibilities leak everywhere. Name the job of each part of the system and keep business decisions away from transport and persistence details.'], bullets: ['Validate data at runtime boundaries', 'Keep domain decisions out of route handlers', 'Make asynchronous failures visible', 'Test behaviour rather than framework wiring'], code: { label: 'Narrow unknown input before using it', language: 'typescript', source: "type CreateUser = { email: string }\n\nfunction parseCreateUser(value: unknown): CreateUser {\n  if (typeof value !== 'object' || value === null ||\n      !('email' in value) || typeof value.email !== 'string') {\n    throw new Error('Invalid request body')\n  }\n  return { email: value.email }\n}" } },
    ],
  },
  {
    slug: 'operable-python-services', title: 'Keeping a Python service easy to operate', category: 'Python', topic: 'Python', readTime: '5 min read',
    summary: 'A Python service can be quick to build. The real test is whether another engineer can run and change it safely.',
    sections: [
      { heading: 'Make the environment boring', paragraphs: ['Pin dependencies, document the supported runtime and make local startup predictable. If every machine has a slightly different Python environment, production issues become harder to reproduce than they need to be.'] },
      { heading: 'Be explicit about the service boundary', paragraphs: ['Small Python applications often grow through convenience: another script, another background task, another direct database call. Clear entry points and ownership keep that convenience from becoming confusion.'], bullets: ['Use one repeatable dependency workflow', 'Validate inputs at the edge', 'Separate background work from request handling', 'Log enough context to explain failures'], code: { label: 'Keep domain code behind a small interface', language: 'python', source: "from typing import Protocol\n\nclass UserRepository(Protocol):\n    def find(self, user_id: str) -> User | None: ...\n\ndef load_user(user_id: str, repository: UserRepository) -> User:\n    user = repository.find(user_id)\n    if user is None:\n        raise UserNotFound(user_id)\n    return user" } },
    ],
  },
  {
    slug: 'slow-api-database-problem', title: 'When a slow API is really a database problem', category: 'SQL', topic: 'Databases', readTime: '6 min read',
    summary: 'The endpoint gets blamed first. Often the useful evidence is in the query plan, connection pool or data model.',
    sections: [
      { heading: 'Trace the whole request', paragraphs: ['Measure where the time is spent before changing application code. One slow query, an exhausted connection pool or repeated calls inside a loop can all look like a slow API from the outside.'] },
      { heading: 'Fix the cause, not only the query', paragraphs: ['An index may solve today’s symptom. It may also hide a data-access pattern that will fail again as the dataset grows. Look at the query, the schema and why the application asks for the data in that shape.'], bullets: ['Capture representative query timings', 'Read the execution plan', 'Check connection and transaction behaviour', 'Test with realistic data volume'], code: { label: 'Inspect the plan before adding an index', language: 'sql', source: "EXPLAIN (ANALYZE, BUFFERS)\nSELECT id, created_at, total\nFROM orders\nWHERE customer_id = 42\nORDER BY created_at DESC\nLIMIT 25;\n\nCREATE INDEX CONCURRENTLY idx_orders_customer_created\n  ON orders (customer_id, created_at DESC);" } },
    ],
  },
  {
    slug: 'choosing-nosql-data-model', title: 'Choosing NoSQL does not remove the need for a data model', category: 'NoSQL', topic: 'Databases', readTime: '5 min read',
    summary: 'A flexible store changes the modelling trade-offs. It does not make those trade-offs disappear.',
    sections: [
      { heading: 'Start with access patterns', paragraphs: ['NoSQL design works best when the important reads, writes and consistency needs are understood first. Choosing the database before those patterns are clear often pushes complexity into application code.'] },
      { heading: 'Flexibility still needs discipline', paragraphs: ['Schema-on-read can help a system evolve, but mixed document shapes and unclear expiry rules make production behaviour difficult to reason about. Decide which flexibility is useful and which invariants still need protection.'], bullets: ['List the busiest access patterns', 'State consistency requirements', 'Plan versioning and expiry', 'Account for operational tooling'], code: { label: 'A Redis key should reveal ownership and lifetime', language: 'redis', source: "SET session:8f2c:user_id 1042 EX 1800\nGET session:8f2c:user_id\nTTL session:8f2c:user_id\n\n# Namespace : identifier : field\n# Expiry is part of the model, not a cleanup detail." } },
    ],
  },
  {
    slug: 'backend-work-on-serverless', title: 'What to check before moving backend work to serverless', category: 'Vercel & serverless', topic: 'Serverless', readTime: '6 min read',
    summary: 'Serverless can remove infrastructure work, but runtime limits and workload shape still matter.',
    sections: [
      { heading: 'Match the runtime to the work', paragraphs: ['Short, stateless request handling is a natural fit. Long-running jobs, heavy startup work and connection-hungry workloads need more care. The platform should simplify the system rather than move its complexity somewhere less visible.'] },
      { heading: 'Design for the limits you actually have', paragraphs: ['Understand execution time, memory, region placement, concurrency and database connections before launch. These are architecture inputs, not details to discover during an incident.'], bullets: ['Measure cold-start sensitivity', 'Plan database connection behaviour', 'Keep background jobs separate where needed', 'Add logs and traces before production'], code: { label: 'A small Nuxt server endpoint for Vercel', language: 'typescript', source: "export default defineEventHandler(async (event) => {\n  const body = await readBody<{ email?: string }>(event)\n\n  if (!body.email) {\n    throw createError({ statusCode: 400, message: 'Email is required' })\n  }\n\n  return await subscribers.add(body.email)\n})" } },
    ],
  },
]

export const getArticle = (slug: string) => articles.find(article => article.slug === slug)
