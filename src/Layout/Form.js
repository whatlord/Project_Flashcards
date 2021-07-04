import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { readCard, readDeck, updateCard, createCard } from "../utils/api";

export default function Form({cardId, deckId}){
    
    const history = useHistory();
    const newForm = {
        front: "",
        back: ""
    }
    const [form, setForm] = useState(newForm)
    const [deck, setDeck] = useState({name:"",id:0, description:""})

    useEffect(() => {
        const getDeck = async () => {
            const theDeck = await readDeck(deckId);
            setDeck(theDeck)
            const theCard = await readCard(cardId)
            setForm(theCard)
        }
        if(cardId){
            getDeck();
        }
    },[deckId, cardId])

    const handleChange = ({ target }) => {
        console.log(form)
        const value = target.value;
        setForm({
            ...form,
            [target.name]: value,
        });
    };
    
    const handleCancel = () => {
        history.push(`/decks/${deckId}`)
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            await updateCard(form)
            history.push(`/decks/${deckId}`) 
        }catch(errors){
            await createCard(deckId, form)
            history.push(`/decks/${deckId}`) 
        }  
    }

    return (
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
    )
}