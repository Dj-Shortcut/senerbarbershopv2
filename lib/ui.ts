const glassButtonBaseClassName =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold tracking-normal no-underline backdrop-blur-md shadow-black/30 transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98] active:shadow-inner";

export const premiumButtonPrimaryClassName =
  `${glassButtonBaseClassName} border border-emerald-300/35 bg-emerald-500/20 text-emerald-50 shadow-lg shadow-emerald-500/20 hover:border-emerald-200/50 hover:bg-emerald-400/30 focus-visible:ring-emerald-300/70`;

export const premiumButtonSecondaryClassName =
  `${glassButtonBaseClassName} border border-slate-100/15 bg-slate-200/10 text-slate-100 shadow-md hover:border-slate-100/25 hover:bg-slate-100/15 focus-visible:ring-slate-100/60`;
