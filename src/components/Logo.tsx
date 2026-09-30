type Props = { className?: string };

// Monogramme « IM » — remplacez par votre logo : <Image src="/logo.svg" ... />
export default function Logo({ className = "h-10 w-auto" }: Props) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-label="IM G Créatif" role="img">
      <path d="M4 36V6l12 18L28 6v30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M34 36V6l10 14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M12 2h24" stroke="currentColor" strokeWidth="3" />
      <path d="M22 2v36" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}