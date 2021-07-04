import { Link } from "react-router-dom"
import React from "react"


export default function Card({card, handleDelete, deck}){
    
    return (
        <div className="list-group-item list-group-item-action flex-column align-items-start" id={card.id} >
           <div className="row">
               <div className="col-md-10">
                   <div className="row">
                       <div className="col">{card.front}</div>
                       <div className="col">{card.back}</div>
                   </div>
               </div>
               <div className="col text-right">
                   <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
                   <button className="btn btn-danger" onClick={() => handleDelete(card.id)}>Delete</button>
               </div>
           </div>
        </div>
    )
}