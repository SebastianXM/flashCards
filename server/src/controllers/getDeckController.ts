import { Request, Response } from 'express';
import Deck from '../models/deck';

export async function getDecksController(req: Request, res: Response){
    const currDecks = await Deck.find();
    res.setHeader('Content-Type', 'application/json').status(200).json(currDecks);
}