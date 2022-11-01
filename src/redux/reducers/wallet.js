import { SUCCESS_API, ERROR_API } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ERROR_API:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
