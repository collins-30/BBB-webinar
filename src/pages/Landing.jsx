import LogoBar from "@/components/landing/LogoBar";
import HeroVideo from "@/components/landing/HeroVideo";
import EmailCapture from "@/components/landing/EmailCapture";
import ApplyCta from "@/components/landing/ApplyCta";
import About from "@/components/landing/About";
import ContactLinks from "@/components/landing/ContactLinks";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 pb-16">
      <LogoBar />
      <HeroVideo />
      <EmailCapture />
      <ApplyCta />
      <About />
      <ContactLinks />
      <footer className="mx-auto max-w-md px-5 pt-10 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} BuildByBeetseh. All rights reserved.
      </footer>
    </div>
  );
}