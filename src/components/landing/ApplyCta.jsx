import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ApplyCta() {
  return (
    <section className="mx-auto max-w-md px-5 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <span className="text-[10px] font-semibold tracking-widest text-lime-400 uppercase">
          Limited spots
        </span>
        <h2 className="mt-2 font-display uppercase text-2xl text-white leading-none">
          Apply for the founder's program
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          1-on-1 coaching with Beetseh. Only a few spots open each round.
        </p>
        <Link
          to="/apply"
          className="mt-4 inline-flex items-center gap-2 bg-white text-neutral-950 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-lime-400 transition-colors"
        >
          Apply now <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}