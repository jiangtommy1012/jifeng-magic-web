import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  // DB: D1Database;
  // CACHE: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

app.get('/', (c) => c.json({ service: 'magic-market-api', status: 'ok' }));
app.get('/api/health', (c) => c.json({ status: 'ok', time: new Date().toISOString() }));

// TODO: mount real routes as they're built, mirroring src/services/magicApi.ts on the frontend:
//   app.route('/api/products', productsRouter);
//   app.route('/api/trends', trendsRouter);
//   app.route('/api/products/:id/reviews', reviewsRouter);

export default app;
