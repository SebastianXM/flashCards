import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
import cors from 'cors';
import Deck from './models/deck';


const PORT = 8000;
const HOST = 'localhost'

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title 
    });
    const createdDeck = await newDeck.save();
    res.setHeader('Content-Type', 'application/json')
    res.status(201);
    res.json(createdDeck);
});


mongoose.connect(process.env.MONGO_URL!)
.then( () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
    app.listen(PORT);
});


