import React from 'react';
import { string, bool, func } from 'prop-types';
import './Form.css';

class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick } = this.props;

    let hasAnyTrunfo;

    if (hasTrunfo) {
      hasAnyTrunfo = <span>Você já tem um Super Trunfo em seu baralho</span>;
    } else {
      hasAnyTrunfo = (
        <label htmlFor="trunfo">
          <input
            name="cardTrunfo"
            // value={ cardTrunfo }
            checked={ cardTrunfo }
            onChange={ onInputChange }
            type="checkbox"
            data-testid="trunfo-input"
            id="trunfo"
          />
          <strong>Super Trybe Trunfo</strong>
        </label>
      );
    }

    return (
      <div id="form-container">
        <h1>Adicionar nova carta</h1>
        <form>
          <label htmlFor="card-name">
            Nome
            <br />
            <input
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
              data-testid="name-input"
              id="card-name"
              type="text"
            />
          </label>
          <label htmlFor="card-desc">
            Descrição
            <br />
            <textarea
              name="cardDescription"
              onChange={ onInputChange }
              value={ cardDescription }
              data-testid="description-input"
              id="card-desc"
              type="text"
            />
          </label>
          <label htmlFor="card-attr1">
            Attr01
            <br />
            <input
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              data-testid="attr1-input"
              id="card-attr1"
              type="number"
            />
          </label>
          <label htmlFor="card-attr2">
            Attr02
            <input
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              data-testid="attr2-input"
              id="card-attr2"
              type="number"
            />
          </label>
          <label htmlFor="card-attr3">
            Attr03
            <input
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              data-testid="attr3-input"
              id="card-attr3"
              type="number"
            />
          </label>
          <label htmlFor="card-img">
            Imagem
            <input
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
              data-testid="image-input"
              id="card-img"
              type="text"
            />
          </label>
          <select
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            data-testid="rare-input"
          >
            Raridade
            <br />
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          { hasAnyTrunfo }
          <button
            name="submit"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            type="submit"
            data-testid="save-button"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: string.isRequired,
  cardDescription: string.isRequired,
  cardAttr1: string.isRequired,
  cardAttr2: string.isRequired,
  cardAttr3: string.isRequired,
  cardImage: string.isRequired,
  cardRare: string.isRequired,
  cardTrunfo: bool.isRequired,
  hasTrunfo: bool.isRequired,
  isSaveButtonDisabled: bool.isRequired,
  onInputChange: func.isRequired,
  onSaveButtonClick: func.isRequired,
};

export default Form;
