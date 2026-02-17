import type { PropsWithChildren } from "react";
import { CONTACT_CONFIG, FOOTER_CONFIG } from "../lib/config";

type IconProps = {
  size?: number;
  className?: string;
};

function IconBase({ size = 16, className, children }: PropsWithChildren<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-4.63-4.63A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </IconBase>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
  );
}

function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

function GithubIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.24-.36 6.64-1.6 6.64-7.2a5.6 5.6 0 0 0-1.5-3.84 5.2 5.2 0 0 0-.09-3.77s-1.18-.36-3.86 1.5a13.38 13.38 0 0 0-7 0C5.5-.37 4.32 0 4.32 0a5.2 5.2 0 0 0-.09 3.77 5.6 5.6 0 0 0-1.5 3.84c0 5.6 3.4 6.84 6.64 7.2a4.8 4.8 0 0 0-1 3.2v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </IconBase>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-700">
          <a
            href={CONTACT_CONFIG.social.instagram.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-950"
          >
            <InstagramIcon size={16} />
            <span>{CONTACT_CONFIG.social.instagram.label}</span>
          </a>
          <a
            href={CONTACT_CONFIG.social.facebook.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-950"
          >
            <FacebookIcon size={16} />
            <span>{CONTACT_CONFIG.social.facebook.label}</span>
          </a>
          <a
            href={CONTACT_CONFIG.address.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-950"
          >
            <MapPinIcon size={16} />
            <span>{CONTACT_CONFIG.address.label}</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <a
            href={FOOTER_CONFIG.maintainerHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-slate-800"
          >
            <GithubIcon size={14} />
            <span>{FOOTER_CONFIG.creditText}</span>
          </a>
          <span aria-hidden>•</span>
          <a
            href={FOOTER_CONFIG.projectRepoHref}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-4 transition hover:text-slate-800"
          >
            {FOOTER_CONFIG.projectRepoText}
          </a>
        </div>
      </div>
    </footer>
  );
}
