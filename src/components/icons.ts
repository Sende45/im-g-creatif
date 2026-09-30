import {
  Eye,
  FileText,
  Fingerprint,
  Gem,
  Lightbulb,
  Megaphone,
  MessageSquareText,
  Star,
  type LucideIcon,
} from "lucide-react";

// Associe le nom stocké en base à l'icône Lucide correspondante.
export const iconMap: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  fingerprint: Fingerprint,
  lightbulb: Lightbulb,
  eye: Eye,
  message: MessageSquareText,
  file: FileText,
  star: Star,
  gem: Gem,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Lightbulb;
}