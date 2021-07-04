import { Link, useParams, useHistory } from "react-router-dom"
import React, {useState, useEffect} from "react"
import { updateDeck, readDeck } from "../utils/api";

export default function Edit(){
    const history = useHistory();
    const {deckId} = useParams();
    
    const newForm = {
        name: "",
        description: "",
        id: 0
    }
    const [form, setForm] = useState(newForm)
    useEffect(() => {
        async function getDeck(){
            const response = await readDeck(deckId);
            setForm(response)
        }
        getDeck();
    },[deckId])
    
    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setForm({
            ...form,
            [target.name]: value,
        });
    };
    
    
    const handleCancel = () => {
        history.push("/")
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        const savedDeck = await updateDeck(form)
        history.push(`/decks/${savedDeck.id}`)
        
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${form.id}`}>{form.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        placeholder="Deck Name" 
                        value={form.name}
                        required 
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        placeholder="Brief description of the deck." 
                        value={form.description}
                        rows="3" 
                        required 
                        onChange={handleChange} ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel} >Cancel</button>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}