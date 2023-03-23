import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  onClickDelete = (expenseId) => {
    const { expenses, dispatch } = this.props;
    const filterExpenses = expenses.filter((expense) => expense.id !== expenseId);
    dispatch(deleteExpense(filterExpenses));
  };

  onClickEdit = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr className="tr-head">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id } className="tr-body">
                <td>{ expense.description }</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(Number(expense.value).toFixed(2))}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {(Number(expense.exchangeRates[expense.currency].ask).toFixed(2))}
                </td>
                <td>
                  {
                    (((Number(expense.exchangeRates[expense.currency].ask))
                   * (Number(expense.value))).toFixed(2))
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="button-edit"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.onClickEdit(expense.id) }
                  >
                    {/* Editar */}
                  </button>
                  <button
                    className="button-delete"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.onClickDelete(expense.id) }
                  >
                    {/* Excluir */}
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Table);
