import React, { useState } from "react";
import { Download, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const PDF_URL =
  "https://fqgimmnzywpsmfappnnb.supabase.co/storage/v1/object/public/site-assets/BBB_free_resource.pdf";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  /** @param {React.FormEvent<HTMLFormElement>} e */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("leads")
        .insert({ email });

      if (error) throw error;

      const link = document.createElement("a");
      link.href = PDF_URL;
      link.download = "BBB-6-Week-Training-Program.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("done");
    } catch (err) {
  console.error("Lead submission error:", err);
  alert(err.message || JSON.stringify(err));
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
          Drop your email and get the 6 weeks transformation blueprint
          instantly.
        </p>

        {status === "done" ? (
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-lime-400">
              <Check className="h-5 w-5" />
              <span className="text-sm font-semibold">
                Your download has started.
              </span>
            </div>

            <a
              href={PDF_URL}
              download="BBB-6-Week-Training-Program.pdf"
              className="text-center text-xs font-medium text-neutral-900/80 underline"
            >
              Didn't start? Click here
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-xl bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-950"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-1.5 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-lime-400 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
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
