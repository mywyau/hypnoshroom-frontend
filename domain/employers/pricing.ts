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
    name: 'Single listing',
    price: '£49',
    description: 'One additional contract or permanent role when you’ve used your free listing.',
    allowance: '1 job listing',
  },
  {
    id: 'pack',
    name: 'Five-listing pack',
    price: '£149',
    description: 'For a company hiring across teams or an agency advertising several briefs.',
    allowance: '5 job listings',
  },
] as const
