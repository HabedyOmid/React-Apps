const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case 'account/deposite':
      return { ...state, balance: state.balance + Number(action.payload) };
    case 'account/withdraw':
      return { ...state, balance: state.balance - Number(action.payload) };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposite(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposite', payload: amount };

  // return a function for thunk middleware for async operation
  return async function (dispatch, getState) {
    try {
      // API call
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const coverted = data.rates.USD;
      // dispatch the action
      dispatch({ type: 'account/deposite', payload: coverted });
    } catch (error) {
      throw new Error('failed to convert to USD', error);
    } finally {
    }
  };
}
export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}
