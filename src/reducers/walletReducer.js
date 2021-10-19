import {
  GET_API_DATA,
  FAILED_REQUEST,
} from '../actions/walletAction';

const initialState = {
  currencies: {}, // dados vem da API em forma de objeto
  expenses: [],
  error: '',
  loading: true,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_API_DATA:
    return {
      ...state,
      currencies: action.payload,
      loading: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      wallet: action.error,
      loading: true,
    };
  default:
    return state;
  }
}

export default walletReducer;
