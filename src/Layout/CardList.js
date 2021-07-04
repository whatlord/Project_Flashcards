import React from "react"
import { deleteCard, readDeck } from "../utils/api";
import Card from "./Card";

export default function CardList({deck, setDeck}){
    const {cards} = deck;

    const handleDelete = async (id) =>{
        const choice = window.confirm("delete this card?\n\nYou will not be able to recover it.");
        if(choice){
            await deleteCard(id);
            const newDeck = await readDeck(deck.id)
            setDeck(newDeck)
        }

    }

     const listOfCards = cards.map(card => {
         return <Card card={card} key={card.id} deck={deck} handleDelete={handleDelete}/>
     })


    return (
        <div className="card">
            {listOfCards}
        </div>
    )
}