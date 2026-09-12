// One-time migration: downloads the site images that used to live on
// base44's media CDN and re-uploads them to the Supabase "site-assets"
// bucket at fixed paths, so the app can reference stable, predictable URLs.
//
// Run locally (needs network access + your Supabase SERVICE ROLE key, which
// must NEVER be committed or shipped to the browser):
//
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node scripts/migrate-images.mjs
//
// After it finishes, the images are available at:
//   {SUPABASE_URL}/storage/v1/object/public/site-assets/logo.png
//   {SUPABASE_URL}/storage/v1/object/public/site-assets/about.jpg
// which is exactly what LogoBar.jsx and About.jsx already point at, so no
// further code changes are needed once this has run.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars first.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const IMAGES = [
  {
    // LogoBar.jsx
    sourceUrl: 'https://media.base44.com/images/public/6a7cc6ec585d9b2de7db4606/366772348_fulllogobluewithgradient.png',
    destPath: 'logo.png',
    contentType: 'image/png',
  },
  {
    // About.jsx
    sourceUrl: 'https://media.base44.com/images/public/6a7cc6ec585d9b2de7db4606/59f86df86_WhatsAppImage2026-09-06at53835PM.jpeg',
    destPath: 'about.jpg',
    contentType: 'image/jpeg',
  },
];

async function migrateOne({ sourceUrl, destPath, contentType }) {
  console.log(`Downloading ${sourceUrl} ...`);
  const res = await fetch(sourceUrl);
  if (!res.ok) {
    throw new Error(`Failed to download ${sourceUrl}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  console.log(`Uploading to site-assets/${destPath} ...`);
  const { error } = await supabase.storage
    .from('site-assets')
    .upload(destPath, buffer, { contentType, upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('site-assets').getPublicUrl(destPath);
  console.log(`Done: ${data.publicUrl}`);
}

for (const image of IMAGES) {
  await migrateOne(image);
}

console.log('\nAll images migrated. LogoBar.jsx and About.jsx already point at these URLs.');
