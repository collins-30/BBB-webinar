import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/builtbybeetseh.coaching?stkn=bGdvNXB3Nzkyb296&utm_source=qr", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/christopher-beetseh-8b5a22327?utm_source=share_via&utm_content=profile&utm_medium=member_ios", Icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/905338461614", Icon: MessageCircle },
];

export default function ContactLinks() {
  return (
    <section className="mx-auto max-w-md px-5 pt-10">
      <h2 className="font-display uppercase text-xl text-white">Let's connect</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 text-white hover:bg-lime-400 hover:text-neutral-950 hover:border-lime-400 transition-colors"
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-semibold">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}