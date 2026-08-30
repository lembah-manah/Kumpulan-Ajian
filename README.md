# Wirid & Aji - Naskah Pribadi

Situs statis (PWA) berisi transkrip wirid dan aji, bisa dibuka offline setelah dibuka sekali, dan siap dijadikan APK.

## Struktur file
```
index.html            <- halaman utama/navigasi
malaikatan-1-2.html
malaikatan-3.html
malaikatan-4.html
arjuno-lulut.html
manifest.json         <- konfigurasi PWA
service-worker.js     <- membuat situs bisa dibuka offline
icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
```

## Cara upload ke GitHub Pages
1. Buat repository baru di GitHub (bisa publik atau privat, publik gratis untuk Pages).
2. Upload SEMUA file dan folder di atas ke root repository (jangan taruh di dalam subfolder, kecuali repo-nya memang dikonfigurasi untuk itu).
3. Buka **Settings > Pages** di repo tersebut.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu Save.
5. Tunggu 1-2 menit, situs akan aktif di `https://<username>.github.io/<nama-repo>/`.

Catatan penting:
- Semua path di dalam file (link antar halaman, `manifest.json`, `service-worker.js`, `icons/...`) memakai path **relatif**, jadi otomatis cocok baik dibuka di root domain maupun di sub-path GitHub Pages (`/nama-repo/`).
- Icon yang disertakan adalah ikon placeholder sederhana (motif belah ketupat emas sesuai tema situs). Ganti file di folder `icons/` dengan logo sendiri kapan saja — ukuran dan nama file harus tetap sama (192x192, 512x512, 512x512 maskable), atau sesuaikan juga path di `manifest.json`.

## Cara menjadikan APK (offline)
Setelah situs aktif di GitHub Pages, gunakan salah satu cara berikut:

**Opsi termudah - PWABuilder (tanpa coding):**
1. Buka https://www.pwabuilder.com
2. Masukkan URL GitHub Pages situs ini.
3. Klik "Package for Stores" > pilih **Android**.
4. Unduh APK/AAB yang dihasilkan.

**Opsi lain - Bubblewrap (command line):**
```
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://<username>.github.io/<nama-repo>/manifest.json
bubblewrap build
```

Karena `service-worker.js` sudah menyimpan seluruh halaman ke cache saat pertama kali dibuka, APK hasil packaging akan tetap bisa dibuka tanpa koneksi internet setelah instalasi pertama.

## Menambah naskah baru
1. Salin salah satu file halaman yang ada sebagai template.
2. Ubah judul, isi, dan link navigasi atas/bawah (`site-nav` dan `page-footer-nav`).
3. Tambahkan link ke naskah baru di `index.html`.
4. Tambahkan nama file baru ke daftar `FILES_TO_CACHE` di `service-worker.js`, lalu naikkan versi `CACHE_NAME` (misal `v1` -> `v2`) supaya cache lama diperbarui.
