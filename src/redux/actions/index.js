import getCurrency from '../../services/getCurrency';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const createUser = (email) => ({
  type: USER_LOGIN,
  email,
});

export const SUCCESS_API = 'SUCCESS_API';
export const successAPI = (obj) => ({
  type: SUCCESS_API,
  currencies: obj,
});

export const ERROR_API = 'ERROR_API';
export const errorAPI = (error) => ({
  type: ERROR_API,
  error,
});

export const thunkCurrencies = () => async (dispatch) => {
  try {
    const data = await getCurrency();
    const array = [
      data.USD.code, data.CAD.code, data.EUR.code, data.GBP.code, data.ARS.code,
      data.BTC.code, data.LTC.code, data.JPY.code, data.CHF.code, data.AUD.code,
      data.CNY.code, data.ILS.code, data.ETH.code, data.XRP.code, data.DOGE.code,
    ];
    dispatch(successAPI(array));
  } catch (error) {
    dispatch(errorAPI(error));
  }
};

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const thunkSaveExpense = (expense) => async (dispatch) => {
  try {
    const data = await getCurrency();
    delete data.USDT;
    expense.exchangeRates = data;
    dispatch(saveExpense(expense));
  } catch (error) {
    dispatch(errorAPI(error));
  }
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  idToEdit: expenseId,
  editor: true,
});

export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const saveEditExpense = (expenses) => ({
  type: SAVE_EDIT_EXPENSE,
  expenses,
  editor: false,
});
