import express from 'express';

import distributors_router from './routes/distributors';
import products_router from './routes/products'


const app = express();
app.use(express.json());
app.disable('etag');
app.use(express.urlencoded({ extended:true }));

app.use('/api',distributors_router)
app.use('/api',products_router)

export default app;