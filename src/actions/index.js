const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const addUser = (info) => ({ type: 'SAVE_USER_INFO', user: info });

export const addExpense = (expense) => ({ type: 'ADD_EXPENSE', expense });

export function addExpenseAction(expense) {
  return (dispatch) => fetch(API_URL)
    .then((response) => response.json())
    .then((json) => {
      const keys = Object.keys(json);
      const values = Object.values(json);
      const exchangeRates = keys.map((currency, index) => ({ [currency]: values[index] }))
        .filter((currency) => currency.code !== 'USDT');
      dispatch(addExpense({ ...expense, exchangeRates: { ...exchangeRates } }));
    });
}
