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
      id: 0,
      valor: '0',
      descricao: '',
      moeda: 'USD',
      metdPagamento: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async fetchApi() {
    const fetchingApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonApi = await fetchingApi.json();
    this.setState(() => ({
      exchangeRates: jsonApi,
    }));
  }

  addExpenses() {
    const { requisicaoApi, logarFunction } = this.props;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    requisicaoApi(this.state);
    logarFunction(this.state);
  }

  render() {
    const { valor, descricao, moeda, metdPagamento, tag, exchangeRates } = this.state;
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
          objFetch={ exchangeRates }
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
        <button type="button" onClick={ this.addExpenses }>Enviar</button>
      </form>
    );
  }
}

Form.propTypes = {
  logarFunction: PropTypes.func.isRequired,
  requisicaoApi: PropTypes.func.isRequired,

};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  logarFunction: (state) => dispatch(expensesAction(state)),
  requisicaoApi: (state) => dispatch(fetchApiThunk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
