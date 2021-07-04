import React, { useState, useEffect } from "react";
import { useParams, Switch, Route } from "react-router";
import { readDeck } from "../utils/api";
import { Link } from "react-router-dom";
import Deck from "./Deck"
import CardList from "./CardList";
import Study from "./Study";

export default function Decks(){
    const [deck,setDeck] = useState({cards:[]})
    const {deckId} = useParams();
    
    useEffect(() =>{
        async function getDeck(){
            const response = await readDeck(deckId);
            setDeck(response)
        }
        getDeck();
    },[deckId])

    return (
        <>
        <Switch>
            <Route path='/decks/:deckId/study'>
                <Study deck={deck} cards={deck.cards} />
            </Route>
            <Route>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>
                <div>
                    <Deck deck={deck} />
                </div>
                <h3>Cards</h3>
                <div className="card">
                    <CardList deck={deck} setDeck={setDeck}/>
                </div>
            </Route>
        </Switch>
        </>
    )
}