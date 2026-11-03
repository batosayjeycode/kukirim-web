import { site } from '../data/site';

/** One breadcrumb step: a display name and an absolute site path ending in "/". */
export interface Crumb {
  name: string;
  path: string;
}

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

/** BreadcrumbList node matching a visible <Breadcrumb> trail. */
export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).href,
    })),
  };
}

/** YYYY-MM-DD in Asia/Jakarta, the date guides are written against. */
export function isoDate(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(date);
}
