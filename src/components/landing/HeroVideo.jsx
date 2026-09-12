import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function HeroVideo() {
  return (
    <section className="mx-auto max-w-md px-5 pt-8">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display uppercase text-[2.7rem] leading-[0.95] text-white"
      >
        Transform your body in 90 days
      </motion.h1>

      <p className="mt-3 text-neutral-400 text-sm">
        Watch the free webinar - Beetseh breaks down exactly what you'll get
        and how the program works.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-5 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* YouTube webinar video */}
        <iframe
          className="w-full aspect-[9/16]"
          src="https://www.youtube.com/embed/Ym0X4OdMmDw"
          title="Free webinar"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full">
          <PlayCircle className="w-4 h-4 text-lime-400" />
          <span className="text-xs text-white font-medium">
            Free webinar
          </span>
        </div>
      </motion.div>
    </section>
  );
}
