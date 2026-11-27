export const postingPlans = [
  {
    id: 'free',
    name: 'Free listing',
    price: '£0',
    description: 'One contract, permanent or temporary role per verified company or recruitment agency every 30 days.',
    allowance: '1 job listing',
  },
  {
    id: 'single',
    name: 'Three-listing pack',
    price: '£49',
    description: 'Post three additional roles once you’ve used your free listing.',
    allowance: '3 job listings',
  },
  {
    id: 'pack',
    name: 'Five-listing pack',
    price: '£149',
    description: 'For a company hiring across teams or an agency advertising several briefs.',
    allowance: '5 job listings',
  },
] as const
