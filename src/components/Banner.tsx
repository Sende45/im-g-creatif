import Image from "next/image";

const LOGO_URL = "https://res.cloudinary.com/lacnn0m0/image/upload/f_auto/q_auto/logo_TNT.jpg";

export default function Banner() {
  return (
    <div className="bg-bordeaux-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Image
            src={LOGO_URL}
            alt="Logo IM G Créatif"
            width={100}
            height={40}
            unoptimized
            className="h-10 w-auto object-contain"
          />
          <p className="font-script text-2xl">Ensemble, donnons vie à vos projets !</p>
        </div>
        <span className="text-sm">IM G Créatif</span>
      </div>
    </div>
  );
}