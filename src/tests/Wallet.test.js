import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      },
    };
    renderWithRouterAndRedux(<App />, {
      initialState: INITIAL_STATE_MOCK,
      initialEntries: ['/carteira'],
    });

    const allValueExpenses = screen.getByText('Total de despesas:');
    expect(allValueExpenses).toBeInTheDocument();

    const emailText = screen.getByText('teste2@gmail.com');
    expect(emailText).toBeInTheDocument();

    const totalValue = screen.getByText('0.00');
    expect(totalValue).toBeInTheDocument();

    const textBRL = screen.getByText('BRL');
    expect(textBRL).toBeInTheDocument();
  });
  it('Testa se adiciona uma despesa ao preencher os campos e clicar em adicionar', async () => {
    const INITIAL_STATE_MOCK = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [],
      },
    };
    renderWithRouterAndRedux(<App />, {
      initialState: INITIAL_STATE_MOCK,
      initialEntries: ['/carteira'],
    });

    const descriptionTestId = screen.getByTestId('description-input');
    userEvent.type(descriptionTestId, 'Açaí');
    expect(descriptionTestId).toHaveValue('Açaí');

    const valueTestId = screen.getByTestId('value-input');
    userEvent.type(valueTestId, '20');
    expect(valueTestId).toHaveValue(20);

    const methodTestId = screen.getByTestId('method-input');
    userEvent.selectOptions(methodTestId, ['Cartão de débito']);
    expect(methodTestId).toHaveValue('Cartão de débito');

    const tagTestId = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagTestId, ['Trabalho']);
    expect(tagTestId).toHaveValue('Trabalho');

    const currencyTestId = screen.getByTestId('currency-input');
    userEvent.selectOptions(currencyTestId, ['EUR']);
    expect(currencyTestId).toHaveValue('EUR');

    const buttonAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(buttonAdd);

    // const acaiDescription = await screen.findByText('Açaí');
  });
  it('Testa se as despesas adicionadas são excluídas e editadas quando clicados nos respectivos botões', () => {
    const INITIAL_STATE_MOCK = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '20',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Batata',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.117',
                low: '5.0198',
                varBid: '-0.0547',
                pctChange: '-1.07',
                bid: '5.0577',
                ask: '5.0604',
                timestamp: '1667595595',
                create_date: '2022-11-04 17:59:55',
              },
            },
          }],
        editor: false,
        idToEdit: 0,
        error: '',
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialState: INITIAL_STATE_MOCK,
      initialEntries: ['/carteira'],
    });

    const buttonEdit = screen.getByRole('button', { name: 'Editar' });
    expect(buttonEdit).toBeInTheDocument();
    userEvent.click(buttonEdit);

    const descriptionTestId = screen.getByTestId('description-input');
    userEvent.type(descriptionTestId, '-Doce');

    const buttonEditExpense = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(buttonEditExpense);

    const descriptionText = screen.getByText('Batata-Doce');
    const descriptionQueryText = screen.queryByText('Batata-Doce');
    expect(descriptionText).toBeInTheDocument();

    const buttonDelete = screen.getByRole('button', { name: 'Excluir' });
    expect(buttonDelete).toBeInTheDocument();

    userEvent.click(buttonDelete);
    expect(descriptionQueryText).not.toBeInTheDocument();
  });
  it('Testa se adicionar novas despesas o valor total no header é alterado', () => {
    const INITIAL_STATE_MOCK = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'EUR',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '20',
            currency: 'EUR',
            method: 'Dinheiro',
            tag: 'Transporte',
            description: 'Uber',
            exchangeRates: {
              EUR: {
                code: 'EUR',
                codein: 'BRL',
                name: 'Euro/Real Brasileiro',
                high: '5.0962',
                low: '5.0111',
                varBid: '0.0263',
                pctChange: '0.52',
                bid: '5.0608',
                ask: '5.0629',
                timestamp: '1667827780',
                create_date: '2022-11-07 10:29:40',
              },
            },
          },
          {
            id: 1,
            value: '5',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Trabalho',
            description: 'Fone de ouvido',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.1089',
                low: '5.0518',
                varBid: '0.0134',
                pctChange: '0.26',
                bid: '5.0685',
                ask: '5.0696',
                create_date: '2022-11-07 10:29:39',
              },
            },
          }],
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialState: INITIAL_STATE_MOCK,
      initialEntries: ['/carteira'],
    });

    const buttonEdit = screen.getAllByRole('button', { name: 'Editar' });
    expect(buttonEdit.length).toBe(2);

    userEvent.click(buttonEdit[1]);

    const methodTestId = screen.getByTestId('method-input');
    userEvent.selectOptions(methodTestId, ['Cartão de crédito']);

    const valueExpenseTestId = screen.getByTestId('value-input');
    userEvent.clear(valueExpenseTestId);
    userEvent.type(valueExpenseTestId, '6');

    const buttonEditExpense = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(buttonEditExpense);

    const methodExpense = screen.getAllByText('Cartão de crédito');
    expect(methodExpense.length).toBe(2);
    expect(methodExpense[1]).toBeInTheDocument();

    expect(valueExpenseTestId).toHaveValue(6);

    const valueAsk = screen.getByText('30.42');
    expect(valueAsk).toBeInTheDocument();

    const buttonDelete = screen.queryAllByRole('button', { name: 'Excluir' });

    userEvent.click(buttonDelete[0]);
    userEvent.click(buttonDelete[1]);

    expect(buttonDelete).not.toBeInTheDocument();
  });
});
