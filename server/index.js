import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

import userRouters from './routes/users.js'
import questionRouters from './routes/Questions.js'
import answerRouters from './routes/Answers.js'

const app = express();
dotenv.config()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.get('/', (req, res) => {
    res.send('this is a stack overflow clone api')
});

app.use('/user',userRouters)
app.use('/questions',questionRouters)
app.use('/answer',answerRouters);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.set('strictQuery', true);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on the port ${PORT}`) }))
    .catch((err) => console.log(err.message))
