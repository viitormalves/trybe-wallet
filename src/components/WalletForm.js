import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkCurrencies, thunkSaveExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      value: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkCurrencies());
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  clickSaveExpenses = () => {
    const { description, tag, method, currency, value } = this.state;
    const { expenses } = this.props;
    const expense = {
      id: (expenses.length),
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: [],
    };
    const { dispatch } = this.props;
    dispatch(thunkSaveExpense(expense));
    this.setState({
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      value: '',
    });
  };

  render() {
    const { description, tag, currency, value, method } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <div>
          <label htmlFor="description">
            Descrição da despesa
            <input
              data-testid="description-input"
              id="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="tag">
            Categoria da Despesa
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option selected>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              id="value"
              type="number"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option selected>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((c) => (
                  <option key={ c }>{ c }</option>
                ))
              }
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={ this.clickSaveExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
