import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MetdPagamento extends Component {
  render() {
    const arrayOption = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { value } = this.props;
    return (
      <label htmlFor="metdPagamento">
        Método de pagamento
        <select
          name="metdPagamento"
          id="metdPagamento"
        >
          { arrayOption.map((item, index) => (
            <option
              key={ index }
              value={ value }
            >
              { item }
            </option>
          ))}
        </select>

      </label>
    );
  }
}

MetdPagamento.propTypes = {
  // onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MetdPagamento;
