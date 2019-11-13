import React from 'react'
import styles from './Cards.module.css'

class Cards extends React.Component {
  state = {
    deckId: "",
    cards: []
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
              <div key={card.code} value={card.value} id={card.code}>
                <img src={card.image} alt={`${card.suit} ${card.value}`}/>
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