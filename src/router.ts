import * as express from 'express';
import cors = require('cors');

const options = {
  credentials: false,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Accept', 'x-access-token'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
} as cors.CorsOptions;

const router = express.Router({
  caseSensitive: false,
  mergeParams: false,
  strict: false,
});

router.get('/', (req: any, res: any, next: any) => {
  res.status(200).send({ title: 'Financeiro API', version: '0.0.1' });
});

router.use(cors(options));

router.options('*', cors(options));

export default router;
