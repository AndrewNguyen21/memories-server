import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

//const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error));

//mongoose.set('useFindAndModify', false);
