---
title: "Cara Membuat dan Mencetak Label Pengiriman Paket"
description: "Isi label paket yang lengkap, pilihan ukuran thermal 100×150 mm atau A4, cara cetak banyak label dari CSV, dan pengaturan printer agar ukurannya pas."
publishedAt: 2026-10-31
---

Menulis alamat dengan tangan di setiap paket memang murah, tetapi lambat dan rawan salah baca. Satu angka nomor HP yang
keliru atau kecamatan yang terlewat bisa membuat paket tertahan di gudang kurir. Label cetak lebih rapi, lebih cepat
dibuat saat pesanan banyak, dan lebih mudah dibaca kurir.

Panduan ini menjelaskan isi label yang lengkap, cara memilih ukuran, cara membuat banyak label sekaligus dari file CSV,
dan pengaturan cetak agar label tidak terpotong.

> **Kapan label sendiri dipakai?** Untuk pesanan dari WhatsApp, Instagram, website, atau penjualan langsung yang Anda
> kirim sendiri lewat kurir. Pesanan marketplace biasanya wajib memakai label resmi dari sistem marketplace karena berisi
> nomor resi dan barcode. Ikuti aturan marketplace dan kurir yang Anda gunakan.

## 1. Pastikan isi label lengkap

Kurir membaca label dari atas ke bawah dalam hitungan detik. Susun isinya dengan urutan yang jelas.

**Data penerima (wajib):**

- **Nama penerima**, sesuai nama yang akan menerima paket di lokasi.
- **Nomor HP aktif**, agar kurir bisa menghubungi saat alamat sulit ditemukan.
- **Alamat jalan**: nama jalan, nomor rumah, RT/RW, nama perumahan, blok, atau gedung.
- **Kecamatan, kota/kabupaten, dan provinsi.**

**Data penerima (sangat disarankan):**

- **Kelurahan/desa**, terutama jika ada nama jalan yang sama di beberapa kelurahan.
- **Kode pos**, lima digit.
- **Catatan pengiriman**, misalnya "Titip ke satpam" atau "Rumah pagar hijau".

**Data pengirim:** nama toko atau nama Anda dan nomor HP. Jika paket gagal dikirim, kurir tahu ke mana harus
mengembalikannya.

## 2. Tulis alamat agar kurir tidak bingung

Data dari pembeli sering ditulis seadanya di chat. Sebelum mencetak, rapikan dulu:

- Pisahkan alamat jalan dari kecamatan dan kota. Jangan gabungkan semuanya dalam satu baris panjang.
- Tulis nama kota dengan jelas, misalnya "Kota Bandung" atau "Kabupaten Bandung", karena keduanya wilayah berbeda.
- Hindari singkatan yang tidak umum. "Jl." dan "No." aman, tetapi singkatan buatan sendiri bisa membingungkan.
- Cek ulang nomor HP. Nomor Indonesia umumnya diawali 08, 628, atau +628.
- Jika pembeli memberi patokan, masukkan ke catatan, bukan ke baris alamat.

## 3. Pilih ukuran label

Ada dua pilihan yang paling umum:

| Ukuran | Cocok untuk | Yang dibutuhkan |
| --- | --- | --- |
| Thermal 100 × 150 mm | Kiriman rutin dan banyak pesanan per hari | Printer thermal dan stiker label 100 × 150 mm |
| Kertas A4, beberapa label per lembar | Pesanan sesekali, belum punya printer thermal | Printer biasa, kertas A4 atau stiker A4, gunting, selotip |

Ukuran 100 × 150 mm (sekitar 4 × 6 inci) adalah ukuran label pengiriman yang banyak dipakai. Printer thermal tidak
membutuhkan tinta, dan labelnya langsung berupa stiker. Jika belum punya, cetak di A4 lalu potong mengikuti garis.

## 4. Buat label untuk satu atau dua pesanan

Untuk pesanan yang sedikit, isi data satu per satu sudah cukup. Di
[Generator Label Paket](https://tools.kukirim.com/generator-label-paket/):

1. Isi **data pengirim** (opsional). Centang "Simpan di browser ini" jika ingin data pengirim muncul lagi lain kali.
2. Di bagian **Tambah satu penerima**, isi data penerima, lalu klik **Tambahkan label**.
3. Ulangi untuk penerima berikutnya. Semua label tampil di pratinjau.

## 5. Buat banyak label sekaligus dari CSV

Jika pesanan sudah tercatat di spreadsheet, Anda tidak perlu mengetik ulang. Simpan datanya sebagai file CSV dengan
kolom berikut di baris pertama:

| Kolom | Isi | Wajib? |
| --- | --- | --- |
| `nama_penerima` | Nama penerima | Ya |
| `no_hp` | Nomor HP, boleh memakai spasi atau tanda hubung | Ya |
| `alamat` | Jalan, nomor, RT/RW, perumahan | Ya |
| `kelurahan` | Kelurahan/desa | Tidak |
| `kecamatan` | Kecamatan | Ya |
| `kota_kabupaten` | Kota atau kabupaten | Ya |
| `provinsi` | Provinsi | Ya |
| `kode_pos` | Lima digit | Tidak |
| `catatan` | Catatan untuk kurir | Tidak |

Cara termudah adalah mengunduh [contoh file CSV](https://tools.kukirim.com/downloads/contoh-label.csv), membukanya di
Excel atau Google Sheets, lalu mengganti baris contohnya dengan data pesanan Anda. Setelah itu simpan kembali sebagai CSV:

- **Excel:** File → Save As → pilih **CSV UTF-8 (Comma delimited)**.
- **Google Sheets:** File → Download → **Comma Separated Values (.csv)**.

Di Generator Label Paket, klik **Pilih file CSV** pada bagian "Impor banyak penerima dari CSV". Baris yang datanya
belum lengkap, misalnya nomor HP tidak valid atau kode pos bukan lima digit, ditampilkan beserta nomor barisnya.
Baris lain yang sudah benar tetap bisa dicetak. Satu daftar bisa berisi hingga 500 label.

## 6. Cetak dengan ukuran yang pas

Pilih ukuran label, klik **Cetak / Simpan PDF**, lalu periksa pengaturan di jendela cetak browser:

- **Ukuran kertas** sesuai pilihan: 100 × 150 mm untuk thermal, atau A4.
- **Skala 100%** atau "Actual size", bukan "Fit to page".
- **Header dan footer browser dimatikan**, agar tanggal dan alamat halaman tidak ikut tercetak.
- Untuk printer thermal, atur juga ukuran kertas **100 × 150 mm di driver printer**.

Ingin menyimpan label untuk dicetak nanti atau di komputer lain? Pilih **Save as PDF** sebagai tujuan cetak.

Cetak satu label dulu sebagai uji coba sebelum mencetak semuanya, terutama saat memakai printer atau stiker baru.

## 7. Tempel label dengan benar

- Tempel di sisi paket yang paling lebar dan rata, jangan di lipatan atau sambungan lakban.
- Pastikan seluruh tulisan terlihat dan tidak tertutup lakban yang mengilap atau kusut.
- Untuk label kertas biasa, lapisi dengan selotip bening agar tidak luntur terkena air.
- Lepas atau tutup label lama jika Anda memakai ulang kardus bekas.

## Data pembeli tetap di perangkat Anda

Generator Label Paket memproses data di browser Anda. File CSV tidak diunggah ke server, dan data penerima tidak
disimpan. Hanya data pengirim yang bisa disimpan di browser, itu pun hanya jika Anda mencentangnya. Gratis dan tanpa
daftar akun.

Untuk mencatat pesanan dari banyak channel sebelum mencetak label, gunakan
[Template Manajemen Order](https://tools.kukirim.com/template-manajemen-order/). Agar ongkir dan kemasan tidak
menggerus untung, baca juga [Cara Menentukan Harga Jual Online Shop agar Untung](/panduan/cara-menentukan-harga-jual/).
