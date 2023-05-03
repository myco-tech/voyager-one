import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import shroomRouter from './routes/shroomRouter'


const app = express();
const PORT = 3000;

//db connection:
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'db'
})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log(`Error connecting to MongoDB: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/shrooms', shroomRouter);

//serve up the index.html
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../src/index.html'));
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));


// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
