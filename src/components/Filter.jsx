import React from 'react';
import { bool, func, shape, string } from 'prop-types';

class Filter extends React.Component {
  render() {
    const { filterName,
      filterSelect,
      handleChange,
      // cardTrunfo,
      // filterCards,
      // filterCardSelected,
      // filterCardSuperTrunfo,
      handleFilter,
      storageFilter,
      filterChecked,
    } = this.props;

    return (
      <div className="filter">
        <h2>Todas as Cartas</h2>
        <h3>Filtro de buscar</h3>
        <label htmlFor="filter-name">
          Nome
          <br />
          <input
            name="filterName"
            value={ filterName }
            onChange={ (event) => { handleChange(event); handleFilter(event); } }
            data-testid="name-filter"
            type="text"
            id="filter-name"
          />
        </label>
        <label htmlFor="filter-select">
          <select
            name="filterSelect"
            value={ filterSelect }
            onChange={ (event) => { handleChange(event); handleFilter(event); } }
            data-testid="rare-filter"
            id="filter-select"
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muitoraro">muito raro</option>
          </select>
        </label>
        <label htmlFor="filterSuper">
          <input
            data-testid="trunfo-filter"
            name="filterChecked"
            checked={ filterChecked }
            onChange={ (event) => { handleChange(event); handleFilter(event); } }
            id="filterSuper"
            type="checkbox"
          />
          Super Trunfo
        </label>
        <div className="grid-card">
          { storageFilter }
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  handleChange: func.isRequired,
  filterName: string.isRequired,
  filterSelect: string.isRequired,
  handleFilter: func.isRequired,
  storageFilter: shape([]).isRequired,
  filterChecked: bool.isRequired,
  // cardTrunfo: bool.isRequired,
  // filterCards: func.isRequired,
  // filterCardSelected: func.isRequired,
  // filterCardSuperTrunfo: func.isRequired,
};

export default Filter;
