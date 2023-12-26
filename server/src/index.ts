import { config } from 'dotenv';
config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from './controllers/getDeckController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardInDeckController } from './controllers/createDeckInDeckController';
import { getOneDeckController } from './controllers/getOneDeckController';
import { deleteCardInDeckController } from './controllers/deleteCardInDeckController';

const PORT = 8000;
const HOST = 'localhost'

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.get('/decks', getDecksController);
app.get('/decks/:deckId', getOneDeckController);
app.post('/decks', createDeckController);
app.post('/decks/:deckId/cards', createCardInDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardInDeckController);

mongoose.connect(process.env.MONGO_URL!)
.then( () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
    app.listen(PORT);
});


