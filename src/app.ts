import express from 'express';

import distributors_router from './routes/distributors';


const app = express();
app.use(express.json());
app.disable('etag');
app.use(express.urlencoded({ extended:true }));

app.use('/api',distributors_router)
export default app;