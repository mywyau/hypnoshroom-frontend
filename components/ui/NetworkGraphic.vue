<template>
  <svg viewBox="0 0 640 520" role="img" aria-labelledby="network-title network-desc" class="h-auto w-full">
    <title id="network-title">A mycelial network of software technologies</title>
    <desc id="network-desc">Scala, Java, TypeScript, Python, AWS, PostgreSQL, Docker and testing tools connected through an organic software system.</desc>

    <defs>
      <linearGradient id="network-core" x1="244" y1="198" x2="396" y2="324" gradientUnits="userSpaceOnUse">
        <stop stop-color="#d9c5dc" />
        <stop offset=".52" stop-color="#b68ca5" />
        <stop offset="1" stop-color="#8e667e" />
      </linearGradient>
      <linearGradient id="root-stroke" x1="64" y1="62" x2="570" y2="466" gradientUnits="userSpaceOnUse">
        <stop stop-color="#65506d" />
        <stop offset=".48" stop-color="#315948" />
        <stop offset="1" stop-color="#9a684e" />
      </linearGradient>
      <filter id="node-shadow" x="-30%" y="-50%" width="160%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#242620" flood-opacity=".1" />
      </filter>
    </defs>

    <g fill="none" stroke="url(#root-stroke)" stroke-linecap="round" stroke-linejoin="round">
      <g class="mycelium" opacity=".54">
        <path d="M320 260C267 208 216 151 119 98" />
        <path d="M320 260C309 199 313 139 305 70" />
        <path d="M320 260C378 205 438 151 521 103" />
        <path d="M320 260C411 250 480 264 551 278" />
        <path d="M320 260C391 321 429 387 488 440" />
        <path d="M320 260C314 337 291 397 282 460" />
        <path d="M320 260C244 305 170 351 105 411" />
        <path d="M320 260C237 247 171 246 97 252" />

        <path d="M119 98C170 88 231 77 305 70" />
        <path d="M305 70c70-5 141 5 216 33" />
        <path d="M521 103c20 52 29 105 30 175" />
        <path d="M551 278c-7 68-26 115-63 162" />
        <path d="M488 440c-69 20-133 26-206 20" />
        <path d="M282 460c-72-2-129-17-177-49" />
        <path d="M105 411c-19-51-21-101-8-159" />
        <path d="M97 252c-4-58 3-108 22-154" />

        <path d="M208 155c41 4 79 24 112 55" />
        <path d="M431 164c-40 3-78 21-111 52" />
        <path d="M441 343c-42-2-82-20-120-54" />
        <path d="M196 348c45-8 86-27 125-58" />
      </g>

      <g class="signals" stroke-width="2" opacity=".9">
        <path d="M320 260C267 208 216 151 119 98" />
        <path d="M320 260C378 205 438 151 521 103" />
        <path d="M320 260C411 250 480 264 551 278" />
        <path d="M320 260C314 337 291 397 282 460" />
        <path d="M320 260C244 305 170 351 105 411" />
      </g>
    </g>

    <g class="junctions" fill="#315948">
      <circle cx="208" cy="155" r="5" />
      <circle cx="431" cy="164" r="5" />
      <circle cx="441" cy="343" r="5" />
      <circle cx="196" cy="348" r="5" />
      <circle cx="380" cy="382" r="4" />
      <circle cx="163" cy="210" r="4" />
    </g>

    <g fill="#315948" font-family="ui-monospace, monospace" font-size="8" font-weight="700" letter-spacing=".8">
      <text x="218" y="149">JVM</text>
      <text x="442" y="158">APIs</text>
      <text x="451" y="337">CI/CD</text>
      <text x="154" y="365">OBSERVE</text>
      <text x="390" y="397">CLOUD</text>
      <text x="126" y="204">TEST</text>
    </g>

    <g filter="url(#node-shadow)">
      <path d="M250 260c0-38 29-67 70-67 42 0 70 29 70 67 0 36-28 66-70 66-41 0-70-30-70-66Z" fill="url(#network-core)" stroke="#315948" stroke-width="2" />
      <path d="M275 252c15-9 30-13 45-13 16 0 31 4 45 13" fill="none" stroke="#f5f2ea" stroke-linecap="round" opacity=".55" />
      <path d="M320 240v56M286 269c23 3 45 12 67 29M354 269c-22 3-44 12-66 29" fill="none" stroke="#f5f2ea" stroke-linecap="round" opacity=".4" />
    </g>

    <g fill="#fffdf8" font-family="ui-monospace, monospace" text-anchor="middle">
      <text x="320" y="260" font-size="10" font-weight="700" letter-spacing="1.4">SOFTWARE</text>
      <text x="320" y="278" font-size="9" font-weight="600" letter-spacing="1">SYSTEM</text>
    </g>

    <g class="tech-nodes" filter="url(#node-shadow)" font-family="ui-monospace, monospace" font-size="10" font-weight="700" letter-spacing=".5">
      <g transform="translate(59 72)">
        <rect width="120" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="25" cy="26" r="8" fill="#de3423" />
        <text x="43" y="30" fill="#242620">SCALA</text>
      </g>
      <g transform="translate(250 44)">
        <rect width="110" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="25" cy="26" r="8" fill="#0074bd" />
        <text x="43" y="30" fill="#242620">JAVA</text>
      </g>
      <g transform="translate(456 77)">
        <rect width="130" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <rect x="17" y="18" width="16" height="16" rx="3" fill="#007acc" />
        <text x="43" y="30" fill="#242620">TYPESCRIPT</text>
      </g>
      <g transform="translate(496 252)">
        <rect width="118" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="25" cy="23" r="7" fill="#306998" />
        <circle cx="29" cy="29" r="7" fill="#ffd43b" />
        <text x="45" y="30" fill="#242620">PYTHON</text>
      </g>
      <g transform="translate(445 414)">
        <rect width="90" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="24" cy="26" r="8" fill="#ff9900" />
        <text x="42" y="30" fill="#242620">AWS</text>
      </g>
      <g transform="translate(216 434)">
        <rect width="132" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="24" cy="26" r="8" fill="#336791" />
        <text x="42" y="30" fill="#242620">POSTGRES</text>
      </g>
      <g transform="translate(50 385)">
        <rect width="112" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="24" cy="26" r="8" fill="#2496ed" />
        <text x="42" y="30" fill="#242620">DOCKER</text>
      </g>
      <g transform="translate(43 226)">
        <rect width="108" height="52" rx="26" fill="#f5f2ea" stroke="#315948" />
        <circle cx="25" cy="26" r="9" fill="#315948" />
        <path d="m21 26 3 3 6-7" fill="none" stroke="#fffdf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <text x="44" y="30" fill="#242620">TESTS</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.mycelium {
  stroke-width: 1.25;
}

.signals {
  stroke-dasharray: 2 12;
  animation: signal-flow 12s linear infinite;
}

.junctions circle {
  animation: junction-pulse 3.8s ease-in-out infinite alternate;
  transform-box: fill-box;
  transform-origin: center;
}

.junctions circle:nth-child(2n) { animation-delay: -1.9s; }
.junctions circle:nth-child(3n) { animation-delay: -3s; }

.tech-nodes > g {
  transition: transform .25s ease;
}

@keyframes signal-flow {
  to { stroke-dashoffset: -84; }
}

@keyframes junction-pulse {
  to { opacity: .45; transform: scale(.72); }
}

@media (prefers-reduced-motion: reduce) {
  .signals,
  .junctions circle { animation: none; }
}
</style>
