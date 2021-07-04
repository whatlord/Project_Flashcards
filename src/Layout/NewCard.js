import { Link, useParams } from "react-router-dom"
import { useHistory } from "react-router"
import React, {useState, useEffect} from "react"
import { readDeck } from "../utils/api";
import Form from "./Form";

export default function NewCard(){

    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({name:"",id:0, description:""})

    useEffect(() => {
        const getDeck = async () => {
            const theDeck = await readDeck(deckId);
            setDeck(theDeck)
        }
        getDeck();
    },[deckId])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <Form cardId={0} deckId={deckId}/>
        </>
    )
}