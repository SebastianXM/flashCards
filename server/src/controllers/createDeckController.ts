import { Request, Response } from 'express';
import Deck from '../models/deck';

export async function createDeckController(req: Request, res: Response){
    const { title } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Deck title cannot be empty' });
    }
    const newDeck = new Deck({
        title: title 
    });
    const createdDeck = await newDeck.save();
    res.setHeader('Content-Type', 'application/json').status(201).json(createdDeck);

}