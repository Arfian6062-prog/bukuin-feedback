# BUKUIN Feedback — Setup

## A. Database privat (Google Sheets)
1. Buat Google Spreadsheet baru bernama `BUKUIN - DATABASE FEEDBACK`.
2. Buka **Ekstensi > Apps Script**.
3. Hapus kode awal lalu salin isi `Code.gs` dari paket ini.
4. Simpan.
5. Klik **Deploy > New deployment > Web app**.
6. Execute as: **Me**.
7. Who has access: pilih opsi yang mengizinkan pengunjung website mengirim request tanpa harus login (nama opsi dapat berbeda sesuai jenis akun Google).
8. Deploy dan selesaikan proses izin Google.
9. Salin URL Web App yang berakhiran `/exec`.
10. Jangan publish/share spreadsheet database. Biarkan akses spreadsheet tetap **Restricted**.

## B. Hubungkan website
1. Buka `config.js`.
2. Ganti `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` dengan URL `/exec` tadi.
3. Simpan.

## C. GitHub Pages
1. Buat repository baru, misalnya `bukuin-feedback`.
2. Upload `index.html`, `style.css`, `script.js`, dan `config.js`. `Code.gs` tidak perlu di-host; boleh disimpan privat/offline.
3. Buka **Settings > Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`, lalu Save.
6. Tunggu GitHub menerbitkan situs.

## D. Tes
1. Buka URL GitHub Pages.
2. Kirim feedback uji coba.
3. Buka spreadsheet `BUKUIN - DATABASE FEEDBACK`.
4. Pastikan sheet `Feedback` otomatis dibuat dan satu baris data masuk.

## Privasi
- GitHub Pages hanya berisi front-end; feedback tidak disimpan di repository.
- Google Sheets database tetap Restricted sehingga hanya akun yang kamu beri izin yang dapat membukanya.
- Endpoint Web App memang dapat menerima kiriman publik agar pelanggan tidak perlu login. Karena itu jangan pernah menaruh credential/API secret di file GitHub.
- WhatsApp dan nama dibuat opsional. Izin testimoni terpisah dan default-nya tidak aktif.
