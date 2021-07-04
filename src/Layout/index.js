import React from "react";
import {Switch, Route} from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home"
import Decks from "./Decks"
import NewDeck from "./NewDeck";
import Edit from "./Edit";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function Layout() {
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/decks/new' exact>
            <NewDeck />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <NewCard />
          </Route>
          <Route path='/decks/:deckId/edit'>
              <Edit />
          </Route>
          <Route path='/decks/:deckId' >
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
