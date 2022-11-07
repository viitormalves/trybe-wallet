import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testar página de Login', () => {
  it('Testar se ao renderizar existe os campos de e-mail e senha, além do o pathname da rota atual ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();

    const senhaInput = screen.getByPlaceholderText('Senha');
    expect(senhaInput).toBeInTheDocument();

    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testar se os campos de e-mail e senha seguem o formato válido para ativar o botão de "Entrar"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText('E-mail');
    userEvent.type(emailInput, 'teste@gmail.com');
    expect(emailInput).toHaveValue('teste@gmail.com');

    const senhaInput = screen.getByPlaceholderText('Senha');
    userEvent.type(senhaInput, '12345');
    expect(senhaInput).toHaveValue('12345');

    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).toBeDisabled();

    userEvent.type(senhaInput, '6');
    expect(senhaInput).toHaveValue('123456');
    expect(entrarButton).toBeEnabled();

    userEvent.click(entrarButton);
  });
});
