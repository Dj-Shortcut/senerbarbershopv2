const glassButtonBaseClassName =
  "inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-medium backdrop-blur-md transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none active:translate-y-[1px]";

export const premiumButtonPrimaryClassName =
  `${glassButtonBaseClassName} border border-emerald-400/25 bg-emerald-500/20 text-white shadow-lg shadow-emerald-500/10 hover:border-emerald-300/35 hover:bg-emerald-500/30 focus-visible:ring-2 focus-visible:ring-emerald-300/40`;

export const premiumButtonSecondaryClassName =
  `${glassButtonBaseClassName} border border-white/10 bg-white/5 text-white/90 shadow-md shadow-black/30 hover:border-white/15 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30`;
