import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";

export default function Banner() {
  return (
    <div className="bg-bordeaux-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo className="h-8 w-auto text-bordeaux" />
          <p className="font-script text-2xl">Ensemble, donnons vie à vos projets !</p>
        </div>
        <div className="flex items-center gap-5">
          <SocialIcons variant="light" />
          <span className="h-6 w-px bg-white/40" />
          <span className="text-sm">IM G Créatif</span>
        </div>
      </div>
    </div>
  );
}