// Read-only post-deployment checks. Sends GET requests only; changes nothing.
//   npm run check:live                          # https://kukirim.com
//   npm run check:live -- https://<project>.pages.dev
import { products } from '../src/data/products.ts';
import { draftPages } from '../src/data/site.ts';

const base = new URL(process.argv[2] ?? 'https://kukirim.com').origin;
const isProduction = new URL(base).hostname === 'kukirim.com';
const results = [];

const get = (path, redirect = 'manual') => fetch(new URL(path, base), { redirect });
const check = async (name, fn) => {
  try {
    const detail = await fn();
    results.push({ ok: true, name, detail });
  } catch (error) {
    results.push({ ok: false, name, detail: error.message });
  }
};
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

await check('GET / returns 200 with correct canonical', async () => {
  const res = await get('/');
  const html = await res.text();
  expect(res.status === 200, `status ${res.status}`);
  expect(html.includes('<link rel="canonical" href="https://kukirim.com/"'), 'canonical missing or wrong');
  return '200';
});

await check('Security and cache headers on /', async () => {
  const res = await get('/');
  const missing = ['x-content-type-options', 'content-security-policy', 'referrer-policy', 'x-frame-options'].filter(
    (h) => !res.headers.has(h),
  );
  if (isProduction && !res.headers.has('strict-transport-security')) missing.push('strict-transport-security');
  expect(missing.length === 0, `missing: ${missing.join(', ')}`);
  if (new URL(base).hostname.endsWith('.pages.dev')) {
    expect(/noindex/.test(res.headers.get('x-robots-tag') ?? ''), 'pages.dev host should send X-Robots-Tag: noindex');
  }
  return 'present';
});

await check('Path without trailing slash redirects', async () => {
  const res = await get('/kontak');
  const location = res.headers.get('location') ?? '';
  expect([301, 308].includes(res.status) && location.endsWith('/kontak/'), `${res.status} -> ${location}`);
  return `${res.status} -> ${location}`;
});

await check('Unknown path returns 404 page', async () => {
  const res = await get('/halaman-yang-tidak-ada-xyz/');
  const html = await res.text();
  expect(res.status === 404, `status ${res.status}`);
  expect(html.includes('Halaman tidak ditemukan'), 'custom 404 page not served');
  return '404';
});

await check('robots.txt and sitemap', async () => {
  const robots = await get('/robots.txt');
  expect(robots.status === 200, `robots.txt ${robots.status}`);
  expect((await robots.text()).includes('Sitemap: https://kukirim.com/sitemap-index.xml'), 'robots.txt sitemap line');
  const index = await get('/sitemap-index.xml');
  expect(index.status === 200, `sitemap-index.xml ${index.status}`);
  const sitemap = await (await get('/sitemap-0.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const url of urls) {
    const res = await get(new URL(url).pathname);
    const html = await res.text();
    expect(res.status === 200, `${url} ${res.status}`);
    expect(!html.includes('content="noindex'), `${url} is noindex but in sitemap`);
  }
  return `${urls.length} sitemap URLs OK`;
});

await check('Draft pages are noindex and not in sitemap', async () => {
  const sitemap = await (await get('/sitemap-0.xml')).text();
  for (const path of draftPages) {
    const html = await (await get(path)).text();
    expect(html.includes('content="noindex'), `${path} missing noindex`);
    expect(!sitemap.includes(`https://kukirim.com${path}<`), `${path} listed in sitemap`);
  }
  return draftPages.join(', ');
});

await check('Hashed assets are cached immutably', async () => {
  const html = await (await get('/')).text();
  const asset = html.match(/(?:href|src)="(\/_astro\/[^"]+)"/)?.[1];
  if (!asset) return 'no external /_astro asset on / (CSS inlined)';
  const cache = (await get(asset)).headers.get('cache-control') ?? '';
  expect(cache.includes('immutable'), `${asset} cache-control: ${cache}`);
  return asset;
});

await check('Outbound links to Kukirim Tools resolve', async () => {
  const urls = products.flatMap((p) => [p.url, ...p.items.map((i) => i.url)]);
  for (const url of urls) {
    const res = await fetch(url, { redirect: 'manual' });
    expect(res.status === 200, `${url} ${res.status}`);
  }
  return `${urls.length} links OK`;
});

if (isProduction) {
  await check('http:// redirects to https://', async () => {
    const res = await fetch('http://kukirim.com/', { redirect: 'manual' });
    const location = res.headers.get('location') ?? '';
    expect([301, 308].includes(res.status) && location.startsWith('https://kukirim.com/'), `${res.status} -> ${location}`);
    return `${res.status} -> ${location}`;
  });

  await check('www redirects to apex with 301', async () => {
    const res = await fetch('https://www.kukirim.com/kontak/?a=1', { redirect: 'manual' });
    const location = res.headers.get('location') ?? '';
    expect(res.status === 301 && location === 'https://kukirim.com/kontak/?a=1', `${res.status} -> ${location}`);
    return `${res.status} -> ${location}`;
  });
}

for (const { ok, name, detail } of results) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed for ${base}`);
if (failed) process.exit(1);
