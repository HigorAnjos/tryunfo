import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="card-name">
          nome da carta:
          <input data-testid="name-input" id="card-name" type="text" />
        </label>
        <label htmlFor="card-desc">
          descrição da carta:
          <textarea data-testid="description-input" id="card-desc" type="text" />
        </label>
        <label htmlFor="card-attr1">
          atributo 1 da carta:
          <input data-testid="attr1-input" id="card-attr1" type="number" />
        </label>
        <label htmlFor="card-attr2">
          atributo 2 da carta:
          <input data-testid="attr2-input" id="card-attr2" type="number" />
        </label>
        <label htmlFor="card-attr3">
          atributo 3 da carta:
          <input data-testid="attr3-input" id="card-attr3" type="number" />
        </label>
        <label htmlFor="card-img">
          Image url:
          <input data-testid="image-input" id="card-img" type="text" />
        </label>
        <select data-testid="rare-input">
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        <label htmlFor="trunfo">
          <input type="checkbox" data-testid="trunfo-input" id="trunfo" />
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
