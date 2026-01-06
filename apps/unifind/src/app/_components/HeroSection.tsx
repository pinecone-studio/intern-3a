export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-sky-100 via-sky-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-black" />

      {/* Soft radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.35),transparent_60%)]" />

      <div className="container mx-auto px-4 pt-24 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-slate-700 border border-sky-200 dark:border-slate-600 text-sm text-sky-500 dark:text-sky-400 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            AI-ээр дэмжигдсэн зөвлөмжүүд
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-slate-900 dark:text-white">
            Их сургууль, мэргэжил, элсэлтийн шаардлагыг <span className="text-sky-500 dark:text-sky-400">нэг дор олж мэдэх</span>
          </h1>

          {/* Description */}
          {/* <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
            Шалгалтын оноо,бүх хэлний мэдлэг, хувийн зан чанарын үндсэн дээр
            таньд төгс их сургуулийг олох.
          </p> */}
        </div>
      </div>
    </section>
  );
}
