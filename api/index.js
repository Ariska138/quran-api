// index.js
import { Hono } from 'hono';
import { cors } from 'hono/cors'; // Import CORS

const api = new Hono();

// 🔑 MIDDLEWARE: CORS
// Izinkan akses dari semua origin (*) untuk pengembangan,
// atau ganti dengan domain spesifik Anda saat production.
api.use(
  '/*',
  cors({
    origin: ['http://127.0.0.1:5500'], // Ganti dengan domain client Anda
    credentials: true, // PENTING untuk cookies (Auth)
  })
);

api.get('/status', (c) => {
  return c.json({ msg: 'Server OK' });
});

export default api;
