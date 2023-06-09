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
    const { count } = this.props;
    const expense = {
      id: count,
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
        <div className="form-container2">
          <label htmlFor="description">
            Descrição da despesa
            <input
              className="input-wallet"
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
              className="input-wallet2"
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="value">
            Valor
            <input
              className="input-wallet2"
              data-testid="value-input"
              id="value"
              type="number"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select
              className="input-wallet2"
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              className="input-wallet3"
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((c) => (
                  <option key={ c } value={ c }>{ c }</option>
                ))
              }
            </select>
          </label>
        </div>
        <div className="div-button">
          <button
            className="button-add"
            type="button"
            onClick={ this.clickSaveExpenses }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  count: state.wallet.count,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
