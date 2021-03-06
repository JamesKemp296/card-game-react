import React from 'react'
import back from './back.png'
import styles from './Cards.module.css'

class Cards extends React.Component {
  state = {
    deckId: "",
    cards: [],
    userCard1: ""
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
    const currentCard = event.target.id
    const { userCard1 } = this.state
    console.log(event.target.value)
    if (!userCard1) return this.setState({userCard1: currentCard})
    if (currentCard.split("")[0] === userCard1.split("")[0]) {
      const toBeDeleted1 = document.getElementById(`${currentCard}`)
      const toBeDeleted2 = document.getElementById(`${userCard1}`)
      toBeDeleted1.classList.add('hidden')
      toBeDeleted2.classList.add('hidden')
      console.log(toBeDeleted1, toBeDeleted2)
      this.setState({ userCard1: '' })
      return window.alert("You got a match!")
    }
    if (currentCard.split("")[0] !== userCard1.split("")[0]) {
      this.setState({ userCard1: '' })
      return window.alert("Not a Match")
    }
  }

  flipCards = () => {

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
              <li
                href="#card"
                className={styles.card}
                key={card.code}
                value={card.value}
                id={card.code}
                onClick={this.handleUserCardSelection}
                style={{
                  backgroundImage: `url(${card.image})`
                }}
              >
                <img
                  src={card.image}
                  alt={`${card.suit} ${card.value}`}
                />
                <img
                  src={back}
                  alt={`${card.suit} ${card.value}`}
                />
              </li>
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
