import express from 'express';
import dotenv from 'dotenv';
import questionOneRouter from './routes/questionOneRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/Q1', questionOneRouter);

const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('testing');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
