import React, { useEffect, useState } from "react";
import {listDecks,deleteDeck} from "../utils/api/index.js"
import Deck from "./Deck.js"

export default function DeckList(){

    const [decks,setDecks] = useState([])
    const handleDelete = (event) =>{
        const choice = window.confirm("delete this deck?\n\nYou will not be able to recover it.");
        if(choice){
            const id = event.target.parentNode.id;
            async function deleteOne(){
                await deleteDeck(id);
                const response = await listDecks();
                setDecks(response)
            }
            deleteOne();
        }
    }

    useEffect(() =>{
        async function getDecks(){
            const response = await listDecks();
            setDecks(response)
        }
        getDecks();
    },[decks.length])

     const listOfDecks = decks.map(deck => {
         return <Deck deck={deck} handleDelete={handleDelete} key={deck.id} />
     })

    return (
        <div className="card">
            {listOfDecks}
        </div>
    )
}