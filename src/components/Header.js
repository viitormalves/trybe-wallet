import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogoTrybeWallet from '../Images/LogoTrybeWallet.png';
import Trybe from '../Images/Trybe.png';
import WalletLogo from '../Images/Wallet.png';
import Moedas from '../Images/Moedas.png';
import Perfil from '../Images/Perfil.png';

class Header extends React.Component {
  sumTotalExpenses = () => { // está função lê todos os expenses, faz um map para calcular o gasto em BRL e por fim soma na varável result com 2 casas decimais após a vírula;
    const { expenses } = this.props;
    const sumExpenses = expenses.map((expense) => (Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask)));
    let result = 0;
    sumExpenses.forEach((number) => {
      result += Number(number);
    });
    return (result.toFixed(2));
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header-container">
        <div className="div-flex">
          <img src={ LogoTrybeWallet } alt="Logo Trybe Wallet" />
          <img src={ Trybe } alt="Trybe" />
          <img src={ WalletLogo } alt="Wallet" />
        </div>
        <div className="div-flex">
          <img src={ Moedas } alt="Moedas" />
          <p>Total de despesas:</p>
          <p
            data-testid="total-field"
          >
            { expenses.length > 0 ? this.sumTotalExpenses() : '0.00' }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div className="div-flex">
          <img src={ Perfil } alt="Logo Perfil" />
          <p data-testid="email-field" className="email">{ email }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Header);
