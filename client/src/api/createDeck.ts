import { API_URL } from "./config";

export async function createdDeck(title: string) {
    if (!title.trim()){
        alert('Deck title cannot be empty');
        return;
    }
    const response = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    body: JSON.stringify({
        title,
    }),
    headers: {
        "Content-Type": "application/json"
    }
    });
    return response.json();
}