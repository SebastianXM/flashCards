import React, { useEffect, useState } from 'react'
import './Deck.css'
import { useParams } from 'react-router-dom';
import { TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { getOneDeck } from './api/getOneDeck';
import { deleteCard } from './api/deleteCard';

export default function Deck(){
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState('');
    const { deckId } = useParams();

    async function handleCreateCard(e: React.FormEvent){
        e.preventDefault();
        const { cards: serverCards} = await createCard(deckId!, text);
        setCards(serverCards);
        setText('');
    }

    async function handleDeleteCard(index: number){
        if (!deckId) return;
        const newDeck = await deleteCard(deckId, index);
        setCards(newDeck.cards);
    }

    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) return;
            const newDeck = await getOneDeck(deckId);
            setDeck(newDeck);
            setCards(newDeck.cards);
        }
        fetchDeck();
    }, [deckId]);

    return (
    <div className='Deck'>
        <h1>{ deck?.title }</h1>
        <ul className="cards">
        {
            cards.map((card, index) => 
            <li key={index}>
                <button onClick={() => handleDeleteCard(index)}>X</button>
                {card}
            </li>
        )}
        </ul>
        <form onSubmit={handleCreateCard}>
            <label htmlFor='card-title'>Card Text</label>
            <input 
            id='card-title'
            value = { text }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
            }}
        />
            <button>Create Card</button>
        </form>
    </div>
    )
}