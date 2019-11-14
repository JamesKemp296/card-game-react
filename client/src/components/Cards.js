import React from 'react'
import styles from './Cards.module.css'

class Cards extends React.Component {
  state = {
    deckId: "",
    cards: [],
    userCard1: "",
    userCard2: ""
  }

  fetchCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(response => response.json())
      .then(data => this.setState({ deckId: data.deck_id }))
  }

  drawCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=52`)
      .then(response => response.json())
      .then(data => this.setState({ cards: data.cards }), console.log(this.state.cards))
      // .then(data => console.log(data.cards))
  }

  handleUserCardSelection = (event) => {
    if (!this.state.userCard1){
      this.setState({userCard1: event.target.id})
    }else if (!this.state.userCard2){
      this.setState({userCard2: event.target.id})
    }else{
      window.alert("Already holding 2 cards")
    }
  }

  render(){
    return(
      <>
        <button
          onClick={this.drawCards}
        >
          Draw Deck
        </button>
        <div className={styles.cardsContainer}>
          {
            this.state.cards.map(card => (
              <div 
                className={styles.card}
                key={card.code} 
                value={card.value} 
                id={card.code}
                onClick={this.handleUserCardSelection}
              >
                <img 
                  src={card.image} 
                  alt={`${card.suit} ${card.value}`}
                />
              </div>
            ))
          }
        </div>
      </>
    )
  }

  componentDidMount(){
    this.fetchCards()
  }
}

export default Cards