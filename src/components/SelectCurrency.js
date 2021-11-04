import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions/index';

class SelectCurrency extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesApi } = this.props;
    fetchCurrenciesApi();
  }

  render() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select id="currency">
          {
            Object.keys(currencies)
              .filter((currency) => currency !== 'USDT')
              .map((eachCurrency) => (
                <option value={ eachCurrency } key={ eachCurrency }>
                  {eachCurrency}
                </option>
              ))
          }
        </select>
      </label>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesApi: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
