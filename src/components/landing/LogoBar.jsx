import { Image } from "@/components/ui/image";

export default function LogoBar() {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-md px-5 py-3 flex items-center justify-between">
        <Image
          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/site-assets/logo.png`}
          alt="BuildByBeetseh"
          className="h-12 w-12"
          fittingType="fit"
        />
        <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
          Fitness Webinar
        </span>
      </div>
    </header>
  );
}