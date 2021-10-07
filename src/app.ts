import express from 'express';

import distributors_router from './routes/distributors';
import products_router from './routes/products'
import channel_router from './routes/channel-authorization'
import process_router from './routes/process-schedules'
import users_router from './routes/users'

const app = express();
app.use(express.json());
app.disable('etag');
app.use(express.urlencoded({ extended:true }));

app.use('/api',distributors_router)
app.use('/api',products_router)
app.use('/api',channel_router)
app.use('/api',process_router)
app.use('/api',users_router)
export default app;