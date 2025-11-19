import 'dotenv/config';
import { serve } from '@hono/node-server';
import api from './api/index.js';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

const PORT = process.env.PORT || 3000;

const app = new Hono();

app.route('/api', api);

app.use('/*', serveStatic({ root: './public' }));

// Endpoint Dasar
app.get('/', (c) => {
  return c.redirect('/index.html');
});

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`🚀 Server running on http://localhost:${PORT}`);
