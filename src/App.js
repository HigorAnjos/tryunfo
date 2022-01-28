import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form />
        <Card
          cardName="a"
          cardDescription="a"
          cardAttr1="a"
          cardAttr2="a"
          cardAttr3="a"
          cardImage="a"
          cardRare="a"
        />
      </div>
    );
  }
}

export default App;
