// Browser glue for <Share> blocks ([data-share]). Links are built at build time by
// src/components/Share.astro; this adds native share, copy link and local analytics events.
// Nothing is sent anywhere: events are only dispatched as a `kukirim:share` DOM event
// (no analytics service is installed; see /privasi/).
import { shareEvents, type ShareMethod } from '../lib/share';

function track(root: HTMLElement, method: ShareMethod, stage: 'click' | 'done') {
  const { pageType, contentType } = root.dataset;
  for (const detail of shareEvents(method, stage, { pageType, contentType, pagePath: location.pathname })) {
    window.dispatchEvent(new CustomEvent('kukirim:share', { detail }));
  }
}

function announce(root: HTMLElement, message: string) {
  const status = root.querySelector('[data-share-status]');
  if (status) status.textContent = message;
}

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Older browsers or no clipboard permission: fall back to a temporary selection.
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}

function init(root: HTMLElement) {
  const { title = '', text = '', url = '' } = root.dataset;
  const nativeButton = root.querySelector<HTMLButtonElement>('[data-share-native]');
  const copyButton = root.querySelector<HTMLButtonElement>('[data-share-copy]');

  if (nativeButton && typeof navigator.share === 'function') {
    nativeButton.hidden = false;
    nativeButton.addEventListener('click', async () => {
      const data = { title, text, url };
      track(root, 'native', 'click');
      if (typeof navigator.canShare === 'function' && !navigator.canShare(data)) {
        announce(root, 'Perangkat ini tidak bisa membagikan halaman ini. Gunakan tombol lain di bawah.');
        return;
      }
      try {
        await navigator.share(data);
        track(root, 'native', 'done');
      } catch (error) {
        // AbortError: the user closed the share sheet; nothing to report.
        if (!(error instanceof Error && error.name === 'AbortError')) {
          announce(root, 'Gagal membuka menu bagikan. Gunakan tombol lain di bawah.');
        }
      }
    });
  }

  if (copyButton) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      track(root, 'copy', 'click');
      if (await copyText(url)) {
        announce(root, 'Tautan disalin. Tempel di chat atau media sosial untuk membagikannya.');
        track(root, 'copy', 'done');
      } else {
        announce(root, `Tidak bisa menyalin otomatis. Salin tautan ini: ${url}`);
      }
    });
  }

  for (const a of root.querySelectorAll<HTMLAnchorElement>('a[data-share-to]')) {
    a.addEventListener('click', () => {
      const method = a.dataset.shareTo as ShareMethod;
      track(root, method, 'click');
      track(root, method, 'done');
    });
  }
}

for (const root of document.querySelectorAll<HTMLElement>('[data-share]')) init(root);
