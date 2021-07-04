import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import React, {useState} from "react"
import { createDeck } from "../utils/api";

export default function NewDeck(){
    
    const history = useHistory();
    
    const newForm = {
        name: "",
        description: "",
    }
    const [form, setForm] = useState(newForm)
    
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
        const response = await createDeck(form)
        history.push(`/decks/${response.id}`)
        
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={form.name}
                        placeholder="Deck Name" 
                        required 
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        value={form.description}
                        placeholder="Brief description of the deck." 
                        rows="3" 
                        required 
                        onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel} >Cancel</button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
            </form>
        </>
    )
}