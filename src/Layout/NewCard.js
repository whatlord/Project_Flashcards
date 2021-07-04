import { Link, useParams } from "react-router-dom"
import { useHistory } from "react-router"
import React, {useState, useEffect} from "react"
import { createCard, readDeck } from "../utils/api";

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

    const newForm = {
        front: "",
        back: ""
    }
    const [form, setForm] = useState(newForm)
    
    const handleChange = ({ target }) => {
        const value = target.value;
        setForm({
            ...form,
            [target.name]: value,
        });
    };
    
    
    const handleCancel = () => {
        history.push(`/decks/${deck.id}`)
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        await createCard(deck.id, form)
        history.push(`/decks/${deck.id}`)
        
    }
    
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea  
                        className="form-control" 
                        id="front" 
                        name="front" 
                        value={form.front}
                        placeholder="Front side of card"
                        rows="3" 
                        required 
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea 
                        className="form-control" 
                        id="back" 
                        name="back" 
                        value={form.back}
                        placeholder="Back side of card" 
                        rows="3" 
                        required 
                        onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel} >Cancel</button>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}