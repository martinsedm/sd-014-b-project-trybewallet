import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import MetdPagamento from './MetdPagamento';
import TiposDeGastos from './TiposDeGastos';
import SelectCoin from './SelectCoin';
import { expensesAction, fetchApiThunk } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      // id: 0,
      valor: '0',
      descricao: '',
      moeda: 'USD',
      metdPagamento: 'Dinheiro',
      tag: 'Alimentação',
      // exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
  }

  componentDidMount() {
    // this.fetchApi();
    const { requisicaoApi } = this.props;
    requisicaoApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  addExpenses() {

  }

  render() {
    const { valor, descricao, moeda,
      metdPagamento, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <Input
          htmlFor="valor"
          labelText="Valor"
          type="number"
          id="valor"
          name="valor"
          value={ valor }
          onChange={ this.handleChange }
        />
        <Input
          htmlFor="descricao"
          labelText="Descrição"
          type="text"
          id="descricao"
          name="descricao"
          value={ descricao }
          onChange={ this.handleChange }
        />
        <SelectCoin
          objFetch={ currencies }
          value={ moeda }
          onChange={ this.handleChange }
        />
        <MetdPagamento
          value={ metdPagamento }
          onChange={ this.handleChange }
        />
        <TiposDeGastos
          value={ tag }
          onChange={ this.handleChange }
        />
        <button type="button" onClick={ this.addExpenses }>Adicionar Despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  // actionExpenses: PropTypes.func.isRequired,
  requisicaoApi: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,

};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  actionExpenses: (state) => dispatch(expensesAction(state)),
  requisicaoApi: (state) => dispatch(fetchApiThunk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
