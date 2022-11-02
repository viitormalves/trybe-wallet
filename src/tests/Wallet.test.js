import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página Wallet e seus componentes', () => {
  it('Testa se renderizar exite um header com parágrafo com o e-mail, o valor total e a moeda BRL', () => {
    const INITIAL_STATE_MOCK = {
      user: {
        email: 'teste2@gmail.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        error: '',
      },
    };
    renderWithRouterAndRedux(<App />, {
      initialState: INITIAL_STATE_MOCK,
      initialEntries: ['/carteira'],
    });

    const emailText = screen.getByText('teste2@gmail.com');
    expect(emailText).toBeInTheDocument();

    const totalValue = screen.getByText(0);
    expect(totalValue).toBeInTheDocument();

    const textBRL = screen.getByText('BRL');
    expect(textBRL).toBeInTheDocument();
  });
});
