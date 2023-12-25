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
    const { title } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Deck title cannot be empty' });
    }
    const newDeck = new Deck({
        title: title 
    });
    const createdDeck = await newDeck.save();
    res.setHeader('Content-Type', 'application/json').status(201).json(createdDeck);
});

app.get('/decks', async (req: Request, res: Response) => {
    const currDecks = await Deck.find();
    res.setHeader('Content-Type', 'application/json').status(200).json(currDecks);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.send(deck);
});

mongoose.connect(process.env.MONGO_URL!)
.then( () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
    app.listen(PORT);
});


