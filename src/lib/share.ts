// Social share links and analytics events (PLAN_SOCIAL_SHARING.md). Pure functions only.
// Mirrors kukirim-tools/src/lib/share.js; the two sites share style, not code.

export const SHARE_PLATFORMS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'x', label: 'X' },
] as const;

export type SharePlatform = (typeof SHARE_PLATFORMS)[number]['id'];
export type ShareMethod = 'native' | 'copy' | SharePlatform;

const MAX_TEXT_LENGTH = 500;

/** Absolute https URL without query string (tracking parameters) or fragment, or null. */
export function cleanShareUrl(input: string): string | null {
  let url: URL;
  try {
    url = new URL(String(input));
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || url.username || url.password) return null;
  url.search = '';
  url.hash = '';
  return url.href;
}

/** Official share-intent URLs per platform, or null when `url` is not a clean https URL. */
export function buildShareLinks({ text = '', url }: { text?: string; url: string }): Record<SharePlatform, string> | null {
  if (cleanShareUrl(url) !== url) return null;
  const t = text.trim().slice(0, MAX_TEXT_LENGTH);
  const e = encodeURIComponent;
  const u = e(url);
  return {
    whatsapp: `https://wa.me/?text=${e(t ? `${t} ${url}` : url)}`,
    telegram: `https://t.me/share/url?url=${u}${t ? `&text=${e(t)}` : ''}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    x: `https://twitter.com/intent/tweet?url=${u}${t ? `&text=${e(t)}` : ''}`,
  };
}

export interface ShareEvent {
  name: string;
  props: Record<string, string>;
}

/**
 * Analytics events for one share action: "click" when a method is picked, "done" once it
 * succeeded. Properties carry the path only (no query string or fragment).
 */
export function shareEvents(
  method: ShareMethod,
  stage: 'click' | 'done',
  { pageType = '', pagePath = '', contentType = 'page' }: { pageType?: string; pagePath?: string; contentType?: string } = {},
): ShareEvent[] {
  const props = { page_type: pageType, page_path: pagePath.split(/[?#]/)[0], share_method: method, content_type: contentType };
  if (stage === 'click') return [{ name: 'share_click', props }];
  const name = method === 'native' ? 'share_success' : method === 'copy' ? 'share_copy_link' : `share_${method}`;
  return [{ name, props }];
}
