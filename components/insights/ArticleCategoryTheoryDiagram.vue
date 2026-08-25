<template>
  <figure class="my-10 overflow-hidden rounded-3xl border border-line bg-white/40 shadow-soft">
    <div class="border-b border-line px-5 py-4 sm:px-7">
      <p class="mb-0 text-xs font-semibold uppercase tracking-[0.18em] text-moss">Composition as a triangle</p>
      <p class="mb-0 mt-1 text-sm leading-6 text-ink/55">Following <strong class="font-semibold text-ink/70">f</strong> and then <strong class="font-semibold text-ink/70">g</strong> gives the same route as <strong class="font-semibold text-plum">g ∘ f</strong>.</p>
    </div>

    <div class="bg-[radial-gradient(circle_at_top_left,rgba(49,89,72,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(101,80,109,0.13),transparent_45%)] px-3 py-7 sm:px-7 sm:py-9">
      <svg class="h-auto w-full" viewBox="0 0 760 390" role="img" aria-labelledby="category-diagram-title category-diagram-description">
        <title id="category-diagram-title">A triangle of composable functions</title>
        <desc id="category-diagram-description">Object A sits above objects B and C. Function f runs from A to B, function g runs from B to C, and the composed function g after f runs directly from A to C, forming a triangle.</desc>

        <defs>
          <marker id="arrow-moss" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#315948" />
          </marker>
          <marker id="arrow-plum" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#65506d" />
          </marker>
          <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="7" stdDeviation="7" flood-color="#242620" flood-opacity="0.10" />
          </filter>
        </defs>

        <path d="M 344 111 L 160 267" fill="none" stroke="#315948" stroke-width="4" marker-end="url(#arrow-moss)" />
        <path d="M 169 305 L 589 305" fill="none" stroke="#315948" stroke-width="4" marker-end="url(#arrow-moss)" />
        <path d="M 416 111 L 600 267" fill="none" stroke="#65506d" stroke-width="4" stroke-dasharray="9 8" marker-end="url(#arrow-plum)" />

        <g filter="url(#node-shadow)">
          <circle cx="380" cy="78" r="45" fill="#f5f2ea" stroke="#315948" stroke-width="3" />
          <circle cx="120" cy="305" r="45" fill="#f5f2ea" stroke="#315948" stroke-width="3" />
          <circle cx="640" cy="305" r="45" fill="#f5f2ea" stroke="#65506d" stroke-width="3" />
        </g>

        <g fill="#242620" font-family="Georgia, Cambria, serif" font-size="31" text-anchor="middle">
          <text x="380" y="89">A</text>
          <text x="120" y="316">B</text>
          <text x="640" y="316">C</text>
        </g>
        <g fill="#315948" font-family="Inter, sans-serif" font-size="20" font-weight="600" text-anchor="middle">
          <text x="230" y="177">f</text>
          <text x="380" y="287">g</text>
        </g>
        <text x="530" y="177" fill="#65506d" font-family="Inter, sans-serif" font-size="20" font-weight="600" text-anchor="middle">g ∘ f</text>
      </svg>
    </div>

    <figcaption class="grid gap-px border-t border-line bg-line sm:grid-cols-3">
      <div class="bg-paper px-5 py-4">
        <strong class="block text-sm text-ink">Objects</strong>
        <span class="mt-1 block text-xs leading-5 text-ink/55">A, B and C</span>
      </div>
      <div class="bg-paper px-5 py-4">
        <strong class="block text-sm text-ink">Arrows</strong>
        <span class="mt-1 block text-xs leading-5 text-ink/55">f and g describe relationships</span>
      </div>
      <div class="bg-paper px-5 py-4">
        <strong class="block text-sm text-ink">Composition</strong>
        <span class="mt-1 block text-xs leading-5 text-ink/55">g ∘ f is the direct A-to-C route</span>
      </div>
    </figcaption>
  </figure>
</template>
