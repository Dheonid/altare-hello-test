// altare-hello-test — server tes minimal untuk Altare App Hosting (Node.js 24).
// Tanpa dependensi: hanya modul bawaan node:http.
// Altare memberi PORT lewat env; app wajib listen di 0.0.0.0:$PORT.
const http = require('node:http');

const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const STARTED_AT = new Date().toISOString();

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', app: 'altare-hello-test', started_at: STARTED_AT }));
    return;
  }
  if (url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(
      '<!doctype html><html><head><meta charset="utf-8"><title>Hello dari Altare</title></head><body>'
      + '<h1>Hello dari Altare</h1>'
      + '<p>App: altare-hello-test</p>'
      + `<p>Waktu server: ${new Date().toISOString()}</p>`
      + `<p>Started: ${STARTED_AT}</p>`
      + `<p>Node: ${process.version}</p>`
      + '</body></html>'
    );
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`altare-hello-test listening on http://${HOST}:${PORT}`);
});
