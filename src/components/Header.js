import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <header>
        <p>Total de despesas:</p>
        <p
          data-testid="total-field"
        >
          { expenses.length > 0 ? this.sumTotalExpenses() : '0.00' }
        </p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="email-field">{ email }</p>
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
