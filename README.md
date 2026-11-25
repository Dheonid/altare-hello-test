# altare-hello-test

Server tes minimal untuk Altare App Hosting — membuktikan deploy jalan, URL publik
hidup, resource cukup, dan alur update (git push → auto-deploy) jelas.

## Isi

- `server.js` — server HTTP Node.js tanpa dependensi (hanya `node:http`).
  - `GET /` → halaman HTML "Hello dari Altare" + waktu server + versi Node.
  - `GET /health` → `{"status":"ok", ...}` (untuk health check Altare).
  - Listen di `0.0.0.0:$PORT` (wajib di Altare).
- `package.json` — `npm start` → `node server.js`. Tanpa dependensi, jadi
  tahap install di Altare praktis no-op dan build selesai dalam hitungan detik.

## Deploy (ringkas — detail lengkap di `ops/altare-test-server-plan-2026-11-25.md`)

1. Buat repo GitHub publik (mis. `dheonid/altare-hello-test`), push 2 file ini.
2. Di console Altare (https://console.altare.gg/): Apps → New app →
   GitHub repository → Connect GitHub → pilih repo → region Singapore →
   resource 256 MiB / 25% CPU / 1 GiB disk → Create.
3. Deploy pertama jalan otomatis. URL: `https://altare-hello-test.go.altare.global`
   (nama menyesuaikan bila nama app sudah dipakai).
4. Set health check path `/health` di Deployments → Settings → Health and caching.

## Verifikasi

- `curl https://altare-hello-test.go.altare.global/` → HTML Hello.
- `curl https://altare-hello-test.go.altare.global/health` → `{"status":"ok",...}`.

## Tes update

Ubah teks `<h1>` di `server.js`, commit + push ke branch yang sama → Altare
auto-deploy → refresh URL, teks baru muncul. Bila gagal, versi lama tetap jalan
(deploy Altare tidak mematikan versi lama sebelum build baru sukses).

## Biaya

$0 — Always Free. Pakai 1 dari 2 app slot, 256 MiB dari 4 GiB RAM pool,
25% dari 125% CPU pool, 1 GiB dari 40 GiB disk pool.
