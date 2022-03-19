import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';
import data from './components/data';
import './App.css';

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
      filterSelect: '',
      filterChecked: false,
      storage: [...data],
      storageFilter: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnOn = this.btnOn.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCardOnStorage = this.deleteCardOnStorage.bind(this);
  }

  handleChange(event) {
    const { name, type, checked, value } = event.target;
    const result = type === 'checkbox' ? checked : value;
    const filter = this.handleFilter(event);
    this.setState({
      [name]: result,
      storageFilter: filter,
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

  filterCards = (value) => {
    const { storage } = this.state;
    const cardList = storage
      .filter((card) => card.cardName.includes(value));
    return this.makeDeck(cardList);
  }

  filterCardSelected = (value) => {
    const { storage } = this.state;
    const cardList = storage
      .filter((card) => card.cardRare === value);
    return this.makeDeck(cardList);
  }

  filterCardSuperTrunfo = () => {
    const { storage, filterSelect } = this.state;
    const cardList = storage
      .filter((card) => card.cardRare === filterSelect);
    return this.makeDeck(cardList);
  }

  filterCardSuperTrunfoCheked = () => {
    const { storage } = this.state;
    const cardList = storage
      .filter((card) => card.cardTrunfo);
    return this.makeDeck(cardList);
  }

  makeDeck = (arr) => (
    arr
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />
      ))
  )

  handleFilter = ({ target: { name, value } }) => {
    if (name === 'filterName') {
      return this.filterCards(value);
    }
    if (name === 'filterSelect') {
      if (value === 'todas') {
        return this.filterCards('');
      }
      return this.filterCardSelected(value);
    }
    if (name === 'filterChecked') {
      return this.filterCardSuperTrunfoCheked();
    }
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
    return (
      <section>
        <div id="new-card">
          <Form
            { ...this.state }
            onInputChange={ this.handleChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card
            { ...this.state }
            onInputChange={ this.handleChange }
            deleteCardOnStorage={ this.deleteCardOnStorage }
            visualizacao
          />
        </div>
        <Filter
          { ...this.state }
          handleChange={ this.handleChange }
          handleFilter={ this.handleFilter }
        />
      </section>
    );
  }
}

export default App;
