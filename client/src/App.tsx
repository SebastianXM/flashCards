import React, { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { TDeck, getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    const newDeck = await createDeck(title);
    if (!newDeck) return;
    setDecks([...decks, newDeck])
    setTitle('');
  }

  async function handleDeleteDeck(deckId: string){
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className='container'>
    <div className='App'>
        <h1>Your Decks</h1>
      <ul className="decks">
        {
          decks.map((deck) => 
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>

              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
        )}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input 
          id='deck-title'
          value = { title }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
    </div>
  )
}

export default App
