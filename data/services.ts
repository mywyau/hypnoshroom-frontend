export interface Service {
  id: string
  area: 'scala-jvm' | 'general'
  route: '/scala-jvm' | '/services'
  number: string
  title: string
  shortDescription: string
  price: string
  whoFor: string
  problems: string[]
  work: string[]
  deliverables: string[]
  format: string
}

export const services: Service[] = [
  {
    id: 'backend-engineering',
    area: 'general',
    route: '/services',
    number: '01',
    title: 'Backend Engineering',
    shortDescription: 'Experienced engineering support across Scala, Java, TypeScript and Python backend systems.',
    price: 'From £600/day',
    whoFor: 'A team with real backend work in the backlog and a gap in engineering capacity. Hypnoshroom can join an existing team, pick up a defined piece of work, or help unblock a service that has stalled.',
    problems: ['A critical service is holding up delivery', 'The code is hard to understand or risky to change', 'Integrations fail in ways that are difficult to trace', 'The team needs experienced backend support for a particular piece of work'],
    work: ['Build and improve Scala, Java, TypeScript or Python services', 'Sort out APIs and service boundaries', 'Work across JVM, Node.js and serverless runtimes', 'Fix awkward database and integration code', 'Track down reliability problems across services'],
    deliverables: ['Working, reviewed code', 'Tests that protect the changed behaviour', 'Short documentation where it will actually help', 'A handover your team can ask questions about'],
    format: 'Usually day-rate work alongside an existing engineering team, with priorities agreed together and communication kept close to the code.',
  },
  {
    id: 'scala-modernisation',
    area: 'scala-jvm',
    route: '/scala-jvm',
    number: '02',
    title: 'Scala Modernisation Assessment',
    shortDescription: 'A close look at an older Scala system, what is holding it back, and what an upgrade would really involve.',
    price: 'From £3,000',
    whoFor: 'A team that knows its Scala application needs attention but doesn’t yet know where to start. This is especially useful before committing budget to a Scala 3, Play or JDK upgrade.',
    problems: ['Nobody is sure whether Scala 3 is realistic yet', 'Play, Java or the JDK is several versions behind', 'The sbt build has become fragile', 'There is plenty of known debt, but no sensible order for tackling it'],
    work: ['Check the code and dependencies for Scala 3 blockers', 'Look at Play, JDK, sbt and library upgrade paths', 'Read enough of the architecture and tests to find the risky areas', 'Separate “must fix” work from improvements that can wait'],
    deliverables: ['An honest account of where the system is now', 'The main risks, in priority order', 'A recommended upgrade route', 'A sequence your engineers can work through', 'A reasoned estimate of the effort involved'],
    format: 'The codebase is reviewed over an agreed period, followed by a written assessment and a conversation with the people who will own the work.',
  },
  {
    id: 'backend-health-check',
    area: 'general',
    route: '/services',
    number: '03',
    title: 'Backend Health Check',
    shortDescription: 'An independent look at why a service feels slow, fragile or expensive to maintain.',
    price: 'From £2,500',
    whoFor: 'A team that can feel something is wrong—a change takes too long, releases are tense, incidents are hard to diagnose—but needs evidence before deciding what to fix.',
    problems: ['Small changes take an unreasonable amount of time', 'Service boundaries are blurry and ownership is unclear', 'Tests fail to give the team confidence', 'Deployments or production failures involve too much guesswork'],
    work: ['Follow a change through the architecture, APIs and database', 'See what the tests catch—and what they miss', 'Check whether logs, metrics and errors tell a useful story', 'Look at the path from a commit to production'],
    deliverables: ['A short report written for engineers, not procurement', 'A ranked list of the problems worth fixing', 'A realistic first set of changes', 'A review session with room for challenge and questions'],
    format: 'A short review with access to the code and relevant delivery setup. The boundaries are agreed up front so the review stays useful.',
  },
  {
    id: 'modernisation-sprint',
    area: 'general',
    route: '/services',
    number: '04',
    title: 'Modernisation & Delivery Sprint',
    shortDescription: 'A contained block of delivery time for an upgrade or improvement that needs to stop living in the backlog.',
    price: 'From £7,500',
    whoFor: 'A team that already knows the outcome it wants, but hasn’t had the time or specialist capacity to get it over the line.',
    problems: ['An upgrade starts, stops and returns to the backlog', 'Old dependencies are narrowing your options', 'Weak tests make every meaningful change feel too risky', 'A well-understood improvement keeps losing out to feature work'],
    work: ['Carry out Scala, Java, Play or Spring Boot upgrades', 'Update dependencies without mixing in an unnecessary rewrite', 'Improve tests and APIs as the work requires', 'Tighten CI/CD, containers or production reliability'],
    deliverables: ['The agreed change, implemented and tested', 'Pull requests your team can review as the work progresses', 'Updated build or deployment configuration', 'A plain account of what changed and what remains'],
    format: 'The sprint starts with a narrow outcome and a sensible boundary. The work stays visible as it develops; there is no big reveal at the end.',
  },
]

export const scalaServices = services.filter(service => service.area === 'scala-jvm')
export const generalServices = services.filter(service => service.area === 'general')
