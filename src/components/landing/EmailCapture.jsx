import { useState } from "react";
import { Download, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("leads").insert({ email });
      if (error) throw error;
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 pt-10">
      <div className="rounded-2xl bg-lime-400 p-5 text-neutral-950">
        <h2 className="font-display uppercase text-2xl leading-none">
          Download the free guide
        </h2>
        <p className="mt-2 text-sm font-medium text-neutral-900/80">
          Drop your email and get the 90-day transformation blueprint instantly.
        </p>

        {status === "done" ? (
          <div className="mt-4 flex items-center gap-2 bg-neutral-950 text-lime-400 rounded-xl px-4 py-3">
            <Check className="w-5 h-5" />
            <span className="text-sm font-semibold">Check your inbox — it's on the way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-xl bg-neutral-950 text-white placeholder:text-neutral-500 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-950"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-neutral-950 text-lime-400 px-4 py-3 text-sm font-semibold flex items-center gap-1.5 disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {status === "loading" ? "Sending…" : "Get it"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs font-medium text-red-900">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}