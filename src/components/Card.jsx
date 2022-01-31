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
      deleteCardOnStorage,
      visualizacao } = this.props;

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

    let titleVisualizacao;
    if (visualizacao) {
      titleVisualizacao = (
        <div id="title">
          <h1>Pré-Visualização</h1>
        </div>
      )
    } else {
      titleVisualizacao = '';
    }

    return (
      <div id="card-container">
        {titleVisualizacao}
        <div id="box-white">
          <div id="box-green">
            <div className="bg-title">
              <h1 data-testid="name-card">{ cardName }</h1>
            </div>
            <div className="image">
              <img src={ cardImage } alt={ cardName } data-testid="image-card" />
            </div>
            <div className="description">
              <p data-testid="description-card">{ cardDescription }</p>
            </div>
            <div className="box-attr">
              <p data-testid="attr1-card">
                Attr01....................................
                { cardAttr1 }
              </p>
              <p data-testid="attr2-card">
                Attr02....................................
                { cardAttr2 }
              </p>
              <p data-testid="attr3-card">
                Attr03....................................
                { cardAttr3 }
              </p>
              <p data-testid="rare-card">{ cardRare }</p>
            </div>
            <div className="super-trunfo">
              { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
            </div>
            <div className="btn-delete">
              { renderDelete }
            </div>
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
