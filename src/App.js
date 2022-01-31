import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import data from './components/data';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      filterName: '',
      storage: [...data],
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnOn = this.btnOn.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCardOnStorage = this.deleteCardOnStorage.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.btnOn);
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: cardTrunfo,
      storage: [...prevState.storage, newCard],
    }));
  }

  filterCards = () => {
    const { storage, filterName } = this.state;
    console.log(storage);
    console.log(filterName);
    const cardList = storage
      .filter((card) => card.cardName === filterName)
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />));
    return cardList;
  }

  deleteCardOnStorage({ target: { name } }) {
    let { storage } = this.state;
    const { cardTrunfo } = storage.find((card) => card.cardName === name);
    storage = storage.filter((card) => card.cardName !== name);
    if (cardTrunfo) {
      this.setState({
        storage,
        hasTrunfo: false,
      });
    } else {
      this.setState({
        storage,
      });
    }
  }


  btnOn() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const MAXSUMPOWERCARD = 210;
    const MAXPOWERCARD = 90;
    const MINPOWERCARD = 0;

    if (!!cardName && !!cardDescription && !!cardImage && !!cardRare
      && (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)) <= MAXSUMPOWERCARD
      && Number(cardAttr1) <= MAXPOWERCARD && Number(cardAttr1) >= MINPOWERCARD
      && Number(cardAttr2) <= MAXPOWERCARD && Number(cardAttr2) >= MINPOWERCARD
      && Number(cardAttr3) <= MAXPOWERCARD && Number(cardAttr3) >= MINPOWERCARD) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      storage,
    } = this.state;

    return (
      <section>
        <div id="new-card">
          <Form
            onInputChange={ this.handleChange }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onSaveButtonClick={ this.onSaveButtonClick }
            hasTrunfo={ hasTrunfo }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
          <Card
            onInputChange={ this.handleChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            visualizacao
            deleteCardOnStorage={ this.deleteCardOnStorage }
          />
        </div>
        <div className="filter">
          <h2>Todas as Cartas</h2>
          <h3>Filtro de buscar</h3>
          <label htmlFor="filter-name">
            Nome
            <br />
            <input
              name="filterName"
              value={ this.state.filterName }
              onChange={ this.handleChange }
              data-testid="name-filter"
              type="text"
              id="filter-name"
            />
          </label>
        </div>
        <div className="grid-card">
          { this.filterCards() }
        </div>
      </section>
    );
  }
}

export default App;
