import { motion } from "framer-motion";
// Use native img to avoid prop type mismatch with custom Image component

export default function About() {
  return (
    <section className="mx-auto max-w-md px-5 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl overflow-hidden border border-white/10"
      >
        <img
          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/site-assets/about.jpeg`}
          alt="Beetseh"
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="bg-white/5 p-5">
          <h2 className="font-display uppercase text-2xl text-white leading-none">
            Meet Beetseh
          </h2>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
            Certified coach with 8+ years transforming clients from stuck to
            strong. No fluff, no shortcuts - just a system that works.
          </p>
        </div>
      </motion.div>
    </section>
  );
}