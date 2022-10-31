// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';

export const createUser = (email) => ({
  type: USER_LOGIN,
  email,
});
