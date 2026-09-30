// Contenu par défaut : affiché tant que la base de données est vide ou non connectée.
export type ServiceItem = { title: string; description: string; icon: string };
export type ProjectItem = { title: string; category: string; image: string | null };
export type PackItem = {
  name: string;
  tagline: string;
  price: number;
  icon: string;
  popular: boolean;
};

export const defaultServices: ServiceItem[] = [
  { title: "Branding", description: "Construire une identité forte et mémorable.", icon: "megaphone" },
  { title: "Identité de marque", description: "Donner du sens à votre image.", icon: "fingerprint" },
  { title: "Création de projet", description: "De l'idée à la réalisation.", icon: "lightbulb" },
  { title: "Identité visuelle", description: "Des visuels qui captent l'attention.", icon: "eye" },
  { title: "Stratégie de communication", description: "Faire passer le bon message au bon public.", icon: "message" },
  { title: "Infographie", description: "Des données claires, une histoire visuelle.", icon: "file" },
];

export const defaultProjects: ProjectItem[] = [
  { title: "Branding", category: "Identité visuelle", image: null },
  { title: "Graphisme", category: "Affiche créative", image: null },
  { title: "Édition", category: "Brochure entreprise", image: null },
];

export const defaultPacks: PackItem[] = [
  { name: "Pack Starter", tagline: "Idéal pour les petits projets", price: 250, icon: "lightbulb", popular: false },
  { name: "Pack Pro", tagline: "Le meilleur rapport qualité/prix", price: 450, icon: "star", popular: true },
  { name: "Pack Premium", tagline: "Pour une identité complète", price: 800, icon: "gem", popular: false },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  behance: "https://www.behance.net/",
};

export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pack", href: "#pack" },
  { label: "Contact", href: "#contact" },
];
