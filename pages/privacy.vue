<script setup lang="ts">
import { BarChart3, Clock, Database, FileText, Server, Shield, UserCheck } from '@lucide/vue'

const config = useRuntimeConfig()
const contactEmail = config.public.contactEmail

usePageSeo({
  title: 'Privacy | Hypnoshroom',
  description: 'Privacy information for the Hypnoshroom website.',
  path: '/privacy',
  robots: 'noindex, follow',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Privacy" title="Your privacy." intro="What Hypnoshroom collects when you get in touch, why it is needed and how it is handled." />
    <section class="section-space">
      <div class="page-shell prose-article max-w-3xl">
        <p><strong>Last updated:</strong> 25 November 2026</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><Shield class="size-5" :stroke-width="1.7" /></span>
          Who is responsible
        </h2>
        <p>
          Hypnoshroom is responsible for the personal information submitted through this website. Questions about this notice or a request concerning your information can be sent
          <template v-if="contactEmail">to <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></template><template v-else>through the website contact form</template>.
        </p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><Database class="size-5" :stroke-width="1.7" /></span>
          Information collected
        </h2>
        <h3>Accounts and job listings</h3>
        <p>Supabase Auth manages email sign-in, passwords and recovery for employer and job seeker accounts. If you create an employer profile, Supabase also stores your company name and the briefs you save. Publishing shows your company name, application link and brief on the relevant job board. Your sign-in email stays private. We may summarise advertised terms across listings. Closing or expiring a listing removes it from public browsing. Applications go to the employer’s own site.</p>
        <p>Your browser stores your sign-in session. You can browse and apply for roles as a guest. Sign out on shared devices. Contact Hypnoshroom to request deletion of your account and its listings.</p>
        <p>When you use the enquiry form, Hypnoshroom collects your name, email address, company if supplied, the engagement type you select and the project details you write. Basic technical information such as an IP address is processed temporarily to protect the form from abuse.</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><FileText class="size-5" :stroke-width="1.7" /></span>
          Why it is used
        </h2>
        <p>The information is used to read and respond to your enquiry, decide whether the work is a suitable fit and take steps you request before entering a contract. The lawful basis is taking requested pre-contractual steps where applicable and Hypnoshroom’s legitimate interest in handling genuine business enquiries otherwise. It is not added to a marketing list and no solely automated decision is made about you.</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><Server class="size-5" :stroke-width="1.7" /></span>
          Service providers
        </h2>
        <p>The site is hosted by Vercel, which also provides anonymous website analytics. Enquiries are delivered by email through Resend rather than stored in an application database. Cloudflare Turnstile may process technical information on the contact page to distinguish genuine visitors from automated abuse. These providers process information under their own infrastructure and contractual safeguards, which may involve processing outside the UK.</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><Clock class="size-5" :stroke-width="1.7" /></span>
          How long it is kept
        </h2>
        <p>An enquiry that does not lead to an engagement is normally deleted within 12 months of the last meaningful contact. If work goes ahead, relevant correspondence may be retained for longer where it forms part of the commercial, legal or accounting record.</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><UserCheck class="size-5" :stroke-width="1.7" /></span>
          Your choices and rights
        </h2>
        <p>Depending on the circumstances, you may ask for access to your personal information, correction, deletion, restriction or object to its use. Contact Hypnoshroom first so the request can be addressed. You can also complain to the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner’s Office</a>.</p>
        <h2 class="flex items-center gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-plum/20 bg-white/40 text-plum" aria-hidden="true"><BarChart3 class="size-5" :stroke-width="1.7" /></span>
          Analytics and cookies
        </h2>
        <p>Vercel Web Analytics is used to understand aggregate page views, popular pages, referrers, approximate location, browser and device type. Vercel describes this data as anonymous and does not use analytics cookies or retain an IP address with an event. Hypnoshroom uses these aggregated statistics under its legitimate interest in understanding and improving the website.</p>
        <p>Names, email addresses, company names and project descriptions submitted through the contact form are not sent to analytics. There are no advertising trackers or marketing cookies. The anti-spam service is loaded only on the contact page for security.</p>
      </div>
    </section>
  </div>
</template>
