import DeckList from "./DeckList"
import { Link } from "react-router-dom"
import React from "react"

export default function Home(){
    
    return (
        <>
            <Link className="btn btn-secondary mb-2" to="/decks/new">Create Deck</Link>
            <DeckList />
        </>
    )
}