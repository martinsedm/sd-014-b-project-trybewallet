import React from 'react';
import PropTypes from 'prop-types';

class TabelaTbody extends React.Component {
  constructor() {
    super();
    this.resgataNomeDaMoeda = this.resgataNomeDaMoeda.bind(this);
  }

  resgataNomeDaMoeda(nomeMoeda) {
    const { object: { currency, exchangeRates, value } } = this.props;
    const objectCoin = exchangeRates[currency];
    if (nomeMoeda === 'nomeMoeda') {
      const nomeMoedaVar = objectCoin.name.split('/');
      return nomeMoedaVar[0];
    } if (nomeMoeda === 'cambioUtilizado') {
      const valorCambio = objectCoin.ask;
      return parseFloat(valorCambio).toFixed(2);
    } if (nomeMoeda === 'valorConvertido') {
      const valorCambio = objectCoin.ask;
      const valorMulti = parseFloat(valorCambio) * parseFloat(value);
      return valorMulti.toFixed(2);
    }
  }

  render() {
    this.resgataNomeDaMoeda();
    const { object: {
      description,
      method,
      tag,
      value,
    } } = this.props;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ parseFloat(value) }</td>
        <td>{ this.resgataNomeDaMoeda('nomeMoeda') }</td>
        <td>{ this.resgataNomeDaMoeda('cambioUtilizado') }</td>
        <td>{ this.resgataNomeDaMoeda('valorConvertido') }</td>
        <td>Real</td>
      </tr>
    );
  }
}

TabelaTbody.propTypes = {
  object: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default TabelaTbody;
