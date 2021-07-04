import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"

export default function Study({deck, cards}){
    
    const history = useHistory();
    const [index, setIndex] = useState(1);
    const [text, setText] = useState('');
    const [flipped, setFlipped] = useState(false);
    const [flipCount, setFlipCount] = useState(0)


    useEffect(() =>{
        const curCard = cards[index-1]
        if(!flipped){
            setText(curCard?.front)
        }else{
            setText(curCard?.back)
        }
    },[flipped,index, flipCount, cards])

    const handleFlip = ()=>{
        setFlipped(!flipped)
        setFlipCount(flipCount + 1)
    }

    const handleNext = () => {
        setFlipped(false)
        setFlipCount(0)
        if(index < cards.length){
            setIndex(index + 1)
        }else{
            const restart = window.confirm('Restart Cards?\n\nClick "cancel" to return to the Home page');
            if(restart){
                setIndex(1)

            }else{
                history.push('/')
            }
        }
    }


    return (!cards) ? (<h3>Loading...</h3>) : (cards.length < 3) ? (
        
        <>
        
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            <div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>Add Card</Link>
            </div>
        </>

    ) : (
        
        <>
        
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {index} of {cards.length}</h5>
                    <p>{text}</p>
                    <button type="button" className="btn btn-secondary mr-2" onClick={handleFlip}>Flip</button>
                    {(!flipCount) ? ( <div></div> ) :
                    (<button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>)}
                </div>
            </div>
                
        </>
    )
}