<template>
  <svg viewBox="0 0 640 520" role="img" aria-labelledby="network-title network-desc" class="h-auto w-full">
    <title id="network-title">An interconnected software system</title>
    <desc id="network-desc">An abstract network connecting an application, API, data and cloud infrastructure.</desc>
    <defs>
      <radialGradient id="node-glow">
        <stop offset="0" stop-color="#f5f2ea" />
        <stop offset="1" stop-color="#dce5dd" />
      </radialGradient>
    </defs>
    <g fill="none" stroke="#315948" stroke-linecap="round" opacity=".55">
      <path d="M76 349C144 303 171 326 232 271S339 227 387 165s102-53 169-89" />
      <path d="M232 271c-9-65 17-111 71-153" />
      <path d="M232 271c59 40 98 82 113 149" />
      <path d="M387 165c27 61 70 100 131 116" />
      <path d="M345 420c52-54 109-68 173-139" />
      <path d="M76 349c34 27 57 63 71 108" />
      <path d="M303 118c70-16 132 4 176 40" />
    </g>
    <g fill="url(#node-glow)" stroke="#315948" stroke-width="2">
      <circle cx="76" cy="349" r="18"/><circle cx="232" cy="271" r="38"/><circle cx="387" cy="165" r="28"/>
      <circle cx="556" cy="76" r="15"/><circle cx="303" cy="118" r="14"/><circle cx="345" cy="420" r="34"/>
      <circle cx="518" cy="281" r="32"/><circle cx="147" cy="457" r="12"/><circle cx="479" cy="158" r="10"/>
    </g>
    <g fill="#315948" font-family="ui-monospace, monospace" font-size="10" font-weight="600" letter-spacing=".7" text-anchor="middle" dominant-baseline="central">
      <text x="232" y="271">APP</text><text x="387" y="165">API</text><text x="518" y="281">DATA</text><text x="345" y="420">CLOUD</text>
    </g>
  </svg>
</template>
