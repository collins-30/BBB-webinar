import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

function Field({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {label}{required && <span className="text-lime-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 px-4 py-3 text-sm outline-none focus:border-lime-400"
      />
    </div>
  );
}

export default function Apply() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", age: "", goal: "", experience: "", message: ""
  });
  const [status, setStatus] = useState("idle");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const { error } = await supabase.from("applications").insert(form);
      if (error) throw error;
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center">
          <Check className="w-7 h-7 text-neutral-950" />
        </div>
        <h1 className="mt-5 font-display uppercase text-3xl text-white">Application received</h1>
        <p className="mt-2 text-neutral-400 text-sm max-w-xs">
          Beetseh will review your application and reach out within 48 hours.
        </p>
        <Link to="/" className="mt-6 text-lime-400 text-sm font-semibold">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-md px-5 py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-neutral-400 text-sm hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="mt-4 font-display uppercase text-3xl text-white leading-none">Apply to work with Beetseh</h1>
        <p className="mt-2 text-sm text-neutral-400">Tell us a bit about you. Be honest — it helps us help you.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Full name" required value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Email" type="email" required value={form.email} onChange={(v) => update("email", v)} />
          <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => update("phone", v)} />
          <Field label="Age" value={form.age} onChange={(v) => update("age", v)} />
          <Field label="Your main goal" value={form.goal} onChange={(v) => update("goal", v)} placeholder="e.g. lose 10kg, build muscle" />
          <Field label="Training experience" value={form.experience} onChange={(v) => update("experience", v)} placeholder="Beginner / Intermediate / Advanced" />
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Anything else?</label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 px-4 py-3 text-sm outline-none focus:border-lime-400"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-lime-400 text-neutral-950 py-3.5 text-sm font-bold uppercase tracking-wide disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Submit application"}
          </button>
          {status === "error" && <p className="text-xs text-red-400">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
}