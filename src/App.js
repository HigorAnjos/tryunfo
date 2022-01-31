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
    const { name, type, checked, value2 } = event.target;
    const value = type === 'checkbox' ? checked : value2;
    const filter = this.handleFilter(event);
    this.setState({
      [name]: value,
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
    const { storage, filterName } = this.state;
    console.log(filterName);
    const cardList = storage
      .filter((card) => card.cardName.includes(value))
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />));
    return cardList;
  }

  filterCardSelected = (value) => {
    const { storage } = this.state;
    const cardList = storage
      .filter((card) => card.cardRare === value)
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />));
    return cardList;
  }

  filterCardSuperTrunfo = (event) => {
    const { storage, filterSelect } = this.state;
    const cardList = storage
      .filter((card) => card.cardRare === filterSelect)
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />));
    return cardList;
  }

  filterCardSuperTrunfoCheked = () => {
    const { storage } = this.state;
    const cardList = storage
      .filter((card) => card.cardTrunfo)
      .map((card, i) => (
        <Card
          key={ i }
          { ...card }
          buttonDelete
          deleteCardOnStorage={ this.deleteCardOnStorage }
        />));
    return cardList;
  }

  handleFilter = ({ target: { name, value }}) => {
    console.log(name, value);
    let aux;
    if (name === 'filterName') {
      aux = this.filterCards(value);
      return aux;
    }
    if (name === 'filterSelect') {
      if (value === 'todas') {
        aux = this.filterCards('');
        return aux;
      }
      aux = this.filterCardSelected(value);
      //console.log('AUXSelect', aux);
      return aux;
    }
    if (name === 'filterChecked') {
      aux = this.filterCardSuperTrunfoCheked();
      return aux;
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
      filterName,
      filterSelect,
      storageFilter,
      filterChecked,
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
        <Filter
          filterName={ filterName }
          cardTrunfo={ cardTrunfo }
          filterSelect={ filterSelect }
          handleChange={ this.handleChange }
          filterCards={ this.filterCards }
          filterCardSelected={ this.filterCardSelected }
          filterCardSuperTrunfo={ this.filterCardSuperTrunfo }
          handleFilter={ this.handleFilter }
          storageFilter={ storageFilter }
          filterChecked={ filterChecked }
        />
      </section>
    );
  }
}

export default App;
