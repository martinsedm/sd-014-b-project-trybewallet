import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import InsertForm from '../components/InsertForm';

class Wallet extends React.Component {
  render() {
    return (
      <span>
        <Header />
        <InsertForm />
        <Table />
      </span>
    );
  }
}

export default Wallet;
