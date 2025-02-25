import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function getOneDeck(deckId: string): Promise<TDeck>{
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json();
};
