import { Request, Response } from 'express';
import Deck from '../models/deck';

export async function getOneDeckController(req: Request, res: Response){
    const { deckId } = req.params;
    const deck = await Deck.findById(deckId);
    res.status(200).json(deck);
}