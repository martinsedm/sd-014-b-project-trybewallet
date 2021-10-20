import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../interactionComponents/Input';
import { setEmailValue } from '../actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { history, dispatchSetValues } = this.props;
    dispatchSetValues(this.state);
    history.push('/carteira');
  }

  handleDisabled() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const checkPassword = password.length < minPasswordLength;

    return !checkEmail.test(email) || checkPassword;
  }

  render() {
    const { email, password } = this.state;
    return (
      <fieldset>
        <form className="Login-form">
          <Input
            className="Input-login"
            type="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <Input
            className="Input-password"
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            autoComplete="on"
          />
          <button
            type="button"
            className="Enter-button"
            onClick={ this.handleSubmit }
            disabled={ this.handleDisabled() }
          >
            Entrar
          </button>
        </form>
      </fieldset>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   dispatchValue: (state) => dispatch(setEmailValue(state)) });

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValues: (emailValue) => dispatch(setEmailValue(emailValue)) });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchSetValues: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
