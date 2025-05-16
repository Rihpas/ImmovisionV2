import Image from "next/image";


export default function Home() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-12 p-8 sm:p-20">
      <main className="flex flex-col items-center sm:items-start gap-10 text-center sm:text-left max-w-4xl w-full">
        
        {/* Titre principal */}
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg max-w-xl">
          Une meilleure vision <br /> de l'immobilier
        </h1>

        <Image
          className="rounded-xl shadow-2xl border border-white/20"
          src="/immovision.png"
          alt="Présentation Immovision"
          width={900}
          height={800}
          priority
        />

        <div className="flex gap-4 flex-col sm:flex-row w-full justify-center sm:justify-start">
          <a
            className="rounded-full bg-white text-black hover:bg-gray-100 transition font-medium shadow-md px-6 py-3 text-sm sm:text-base"
            href="/login"
          >
            <span>🔐 Se connecter</span>
          </a>
          <a
            className="rounded-full border border-white/40 hover:bg-white/10 transition font-medium px-6 py-3 text-sm sm:text-base"
            href="/register"
          >
            ✍️ Créer un compte
          </a>
          <a
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md px-6 py-3 text-sm sm:text-base"
            href="/map"
          >
            🗺️ Voir la carte
          </a>
          <a
            className="rounded-full bg-green-600 text-white hover:bg-green-700 transition font-medium shadow-md px-6 py-3 text-sm sm:text-base"
            href="/monPortail"
          >
            🚪 Aller sur monPortail
          </a>
        </div>
        
      </main>
    </div>
  );
}
