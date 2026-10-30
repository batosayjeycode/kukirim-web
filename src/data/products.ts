// Only list products and features verified on the live site.
// Update `verifiedAt` whenever the entries are re-checked.

export interface ProductItem {
  name: string;
  url: string;
  summary: string;
}

export interface Product {
  id: string;
  name: string;
  url: string;
  summary: string;
  items: ProductItem[];
  verifiedAt: string;
}

export const products: Product[] = [
  {
    id: 'tools',
    name: 'Kukirim Tools',
    url: 'https://tools.kukirim.com/',
    summary:
      'Tools gratis untuk seller online Indonesia. Bisa langsung dipakai tanpa membuat akun.',
    items: [
      {
        name: 'Kalkulator Keuntungan',
        url: 'https://tools.kukirim.com/kalkulator-keuntungan/',
        summary:
          'Hitung laba bersih, margin, dan harga impas setelah diskon, biaya marketplace, ongkir, dan kemasan.',
      },
      {
        name: 'Generator Label Paket',
        url: 'https://tools.kukirim.com/generator-label-paket/',
        summary:
          'Buat label alamat dari isian manual atau file CSV, lalu cetak di kertas thermal 100 × 150 mm atau A4.',
      },
      {
        name: 'Template Pembukuan Online Shop',
        url: 'https://tools.kukirim.com/template-pembukuan-online-shop/',
        summary:
          'Template spreadsheet (.xlsx) untuk mencatat pemasukan dan pengeluaran serta melihat laba per bulan dan per kategori.',
      },
      {
        name: 'Template Manajemen Order',
        url: 'https://tools.kukirim.com/template-manajemen-order/',
        summary:
          'Template spreadsheet (.xlsx) untuk mencatat pesanan dari semua channel dan memantau status pembayaran serta pengiriman.',
      },
    ],
    verifiedAt: '2026-10-29',
  },
];
