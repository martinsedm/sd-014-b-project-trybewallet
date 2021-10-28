import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DataTable extends React.Component {
  constructor() {
    super();
    this.getQuote = this.getQuote.bind(this);
    this.getCurrencyName = this.getCurrencyName.bind(this);
  }

  getQuote(arrayQuotes, currency) {
    const quote = Object.values(arrayQuotes).filter(({ code, codein }) => (
      code === currency && codein !== 'BRLT'
    )).map(({ ask }) => ask).toString();
    return quote;
  }

  getCurrencyName(arrayQuotes, currency) {
    const currencyName = Object.values(arrayQuotes).filter(({ code, codein }) => (
      code === currency && codein !== 'BRLT'
    )).map(({ name }) => name).toString();
    const name = currencyName.split('/')[0];
    if (name === 'Dólar Americano') return 'Dólar Comercial';
    return name;
  }

  render() {
    const { toRecoverExpenses } = this.props;
    return (
      <table className="table table-striped table-hover mt-4">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {toRecoverExpenses
            .map(({ description, value, currency, method, tag, exchangeRates }, ind) => (
              <tr key={ ind }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{this.getCurrencyName(exchangeRates, currency)}</td>
                <td>{ parseFloat(this.getQuote(exchangeRates, currency)).toFixed(2) }</td>
                <td>
                  { parseFloat(
                    Math.fround(value * this.getQuote(exchangeRates, currency)),
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <section>
                    <button className="btn btn-warning m-1" type="button">
                      <i className="bi bi-pencil-square">Editar</i>
                    </button>
                    <button className="btn btn-danger m-1" type="button">
                      <i className="bi bi-trash">Excluir</i>
                    </button>
                  </section>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

DataTable.propTypes = {
  toRecoverExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  toRecoverExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(DataTable);
