// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUBMIT_EXPENSES } from '../actions/submitExpanses';

const INITIAL_STATE = {
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });

  default:
    return state;
  }
}
export default wallet;
