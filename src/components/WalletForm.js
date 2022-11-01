import React, { Component } from 'react';
import { connect } from 'react-redux';
// import getCurrency from '../services/getCurrency';
import PropTypes from 'prop-types';
import { thunkCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      // APIcurrencies: [],
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'BRL',
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

  render() {
    const { description, tag, currency, value, method } = this.state;
    const { currencies } = this.props;
    return (
      <form>
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
            <option selected value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            id="value"
            type="text"
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
            <option selected value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
                <option key={ c } value={ c }>{ c }</option>
              ))
            }
          </select>
        </label>
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
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
