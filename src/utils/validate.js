export const isLengthValid = (password) => password.length > 7;

export const hasCapitalLetter = (password) => /[A-Z]/.test(password);

export const hasNumber = (password) => /[0-9]/.test(password);

export const validatePassword = (password) => {
  return isLengthValid(password) && hasCapitalLetter(password) && hasNumber(password);
};

export const sameWithConfirm = (password, confirm) => password === confirm;