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
  facebook: "https://www.facebook.com/",
  behance: "https://www.behance.net/",
  mail: "mailto:angejocelynetetty@gmail.com",
};

// Liens absolus ("/#...") : ils fonctionnent aussi depuis les autres pages.
export const navLinks = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Qui suis-je ?", href: "/#qui-suis-je" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Packs", href: "/#pack" },
  { label: "Contact", href: "/#contact" },
];

// ---------- Section « Qui suis-je ? » ----------

export const aboutProfile = {
  name: "Ange Jocelyne Tetty",
  bio: "Salut, moi c’est Nour TETTY. Si tu es ici, ce n’est pas par hasard : tu cherches quelqu'un qui sait faire vibrer une marque, secouer les idées reçues et transformer un simple brief en ovni créatif. Contactez-moi et créons quelque chose d'inoubliable",
  location: "Abidjan, Côte d'Ivoire",
  email: "angejocelynetetty@gmail.com",
  phone: "+225 07 16 32 59 25",
  noteLeft: "Passionnée par les idées qui prennent vie",
  noteRight: "Des idées aujourd'hui, de grandes choses demain",
};

export type FormationItem = {
  start: number;
  end: number;
  degree: string;
  school: string;
  specialty: string;
  description: string;
};

export const formations: FormationItem[] = [
  {
    start: 2020,
    end: 2023,
    degree: "Licence en communication",
    school: "Université Catholique de l'Afrique de l'Ouest (UCAO)",
    specialty: "Médias, création et production",
    description: "Acquisition des bases en communication, création graphique et gestion de projets.",
  },
  {
    start: 2023,
    end: 2025,
    degree: "Master en communication",
    school: "Université Catholique de l'Afrique de l'Ouest (UCAO)",
    specialty: "Marketing et nouvelles technologies",
    description:
      "Approfondissement des compétences en stratégie de communication, marketing digital et gestion de marque.",
  },
];

// icon : clé de skillIcons dans components/about/Skills.tsx
export type SkillItem = { label: string; level: number; icon: string };

export const skills: SkillItem[] = [
  { label: "Suite Adobe (Ps, Ai, Id)", level: 90, icon: "adobe" },
  { label: "WordPress", level: 70, icon: "wordpress" },
  { label: "Création graphique", level: 85, icon: "pen" },
  { label: "Montage vidéo", level: 65, icon: "video" },
  { label: "Stratégie de communication", level: 80, icon: "megaphone" },
  { label: "Gestion de projet", level: 70, icon: "checklist" },
  { label: "Réseaux sociaux", level: 75, icon: "target" },
  { label: "Anglais", level: 60, icon: "languages" },
];