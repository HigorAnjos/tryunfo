import React from 'react';
import { string, bool, func } from 'prop-types';
import './Card.css';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      buttonDelete,
      deleteCardOnStorage } = this.props;

    let renderDelete;
    if (buttonDelete) {
      renderDelete = (
        <button
          name={ cardName }
          type="button"
          onClick={ deleteCardOnStorage }
          data-testid="delete-button"
        >
          Excluir
        </button>
      );
    } else {
      renderDelete = '';
    }

    return (
      <div id="card-container">
        <div id="title">
          <h1>Pré-Visualização</h1>
        </div>
        <div id="box-white">
          <div id="box-green">
            <h1 data-testid="name-card">{ cardName }</h1>
            <img src={ cardImage } alt={ cardName } data-testid="image-card" />
            <p data-testid="description-card">{ cardDescription }</p>
            <p data-testid="attr1-card">{ cardAttr1 }</p>
            <p data-testid="attr2-card">{ cardAttr2 }</p>
            <p data-testid="attr3-card">{ cardAttr3 }</p>
            <p data-testid="rare-card">{ cardRare }</p>
            { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
            { renderDelete }
          </div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  buttonDelete: false,
};

Card.propTypes = {
  cardName: string.isRequired,
  cardDescription: string.isRequired,
  cardAttr1: string.isRequired,
  cardAttr2: string.isRequired,
  cardAttr3: string.isRequired,
  cardImage: string.isRequired,
  cardRare: string.isRequired,
  cardTrunfo: bool.isRequired,
  buttonDelete: bool,
  deleteCardOnStorage: func.isRequired,
};

export default Card;
