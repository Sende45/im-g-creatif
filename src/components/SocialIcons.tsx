import Link from "next/link";
import { socialLinks } from "@/lib/content";

type Props = { variant?: "light" | "dark" };

// Lucide ne fournit plus les logos de marques : on utilise de petits SVG.
const icons = {
  linkedin: (
    <path d="M6.9 8.6H3.6V20h3.3V8.6ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.5c0-3.1-1.6-5.1-4.3-5.1-1.6 0-2.6.8-3.1 1.6V8.6H9.8V20h3.3v-5.9c0-1.6.6-2.8 2-2.8s1.9 1.1 1.9 2.8V20h3.4v-6.5Z" />
  ),
  instagram: (
    <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.5 1.2 3.6 3.6.1.9.1 1.2.1 3.7s0 2.7-.1 3.6c-.1 2.4-1.2 3.5-3.6 3.6-.9.1-1.2.1-3.6.1s-2.7 0-3.7-.1c-2.4-.1-3.5-1.2-3.6-3.6-.1-.9-.1-1.2-.1-3.6s0-2.8.1-3.7C4.8 5.9 5.9 4.8 8.3 4.7c.9-.1 1.3-.1 3.7-.1ZM12 3c-2.4 0-2.8 0-3.7.1C5 3.2 3.2 5 3.1 8.3 3 9.2 3 9.6 3 12s0 2.8.1 3.7c.1 3.3 1.9 5.1 5.2 5.2.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7C20.8 5 19 3.2 15.7 3.1 14.8 3 14.4 3 12 3Z" />
  ),
  behance: (
    <path d="M9.2 11.4c.9-.4 1.4-1.1 1.4-2.1 0-2-1.5-2.6-3.3-2.6H2.5v10.6h4.9c1.9 0 3.6-.9 3.6-3 0-1.3-.6-2.3-1.8-2.9ZM4.6 8.5h2.1c.8 0 1.5.2 1.5 1.1s-.6 1.2-1.4 1.2H4.6V8.5Zm2.3 7.1H4.6v-2.9h2.4c1 0 1.6.4 1.6 1.4s-.7 1.5-1.7 1.5Zm10.4-5.9c-2.4 0-4 1.8-4 4.1 0 2.4 1.5 4.1 4 4.1 1.9 0 3.1-.8 3.7-2.6h-1.9c-.2.7-1.1 1-1.8 1-1.3 0-1.9-.7-1.9-1.9h5.7c.1-2.5-1.3-4.7-3.8-4.7Zm-1.9 3.3c.1-1 .7-1.7 1.8-1.7s1.6.6 1.7 1.7h-3.5ZM15.4 7h4.5v1.2h-4.5V7Z" />
  ),
};

export default function SocialIcons({ variant = "light" }: Props) {
  const style =
    variant === "light"
      ? "bg-white text-bordeaux-dark hover:bg-rose-soft"
      : "bg-bordeaux text-white hover:bg-bordeaux-dark";

  return (
    <div className="flex items-center gap-3">
      {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
        <Link
          key={name}
          href={socialLinks[name]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`grid size-8 place-items-center rounded-full transition ${style}`}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
            {icons[name]}
          </svg>
        </Link>
      ))}
    </div>
  );
}



