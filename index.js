// index.js
import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'; // Import CORS
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

// 🔑 MIDDLEWARE: CORS
// Izinkan akses dari semua origin (*) untuk pengembangan,
// atau ganti dengan domain spesifik Anda saat production.
app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:5173', 'https://domain-client-anda.com'], // Ganti dengan domain client Anda
    credentials: true, // PENTING untuk cookies (Auth)
  })
);

// Server Statis (UI)
app.use('/*', serveStatic({ root: './public' }));

// Endpoint Dasar
app.get('/', (c) => {
  return c.redirect('/index.html');
});

// ... (kode otentikasi dan catatan akan masuk di bawah)
// ...
app.get('/api/status', (c) => {
  return c.json({ msg: 'Server OK' });
});

// Jalankan Server (untuk lokal)
if (process.env.VERCEL) {
  console.log('Running on Vercel');
  globalThis.app = app;
} else {
  const port = 3000;
  console.log(`🚀 Server is running on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}
