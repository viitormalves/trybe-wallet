import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
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
