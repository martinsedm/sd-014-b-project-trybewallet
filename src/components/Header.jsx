import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailData: { email } } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <p data-testid="total-field">0</p>
        <span data-testid="header-currency-field">BRL</span>
        <p data-testid="total-field">xxx</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailData: state.user,
});

Header.propTypes = {
  emailData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Header);
