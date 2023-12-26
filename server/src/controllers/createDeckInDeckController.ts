import { Request, Response } from 'express';
import Deck from '../models/deck';

export async function createCardInDeckController(req: Request, res: Response){
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);

    if (!deck) return res.status(400).send("No deck of this id exists");

    const { text } = req.body;
    
    if (!text || !text.trim()) {
        return res.status(400).json({ "error": 'Card text cannot be empty' });
    }

    deck.cards.push(text);
    await deck.save();

    res.setHeader('Content-Type', 'application/json').status(201).json(deck);
};