import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  disableChange = () => {
    const { password, email } = this.state;
    const minPassword = 6;
    const passwordBoolean = password.length < minPassword;
    const emailBoolean1 = email.includes('@');
    const emailBoolean2 = email.includes('.com');
    return (
      passwordBoolean
      || !emailBoolean1
      || !emailBoolean2
    );
  };

  onClickSaveLogin = () => {
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;
    dispatch(createUser(email));
    push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            name="email"
            value={ email }
            type="email"
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="button"
            disabled={ this.disableChange() }
            onClick={ this.onClickSaveLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  push: PropTypes.func,
}.isRequired;

export default connect()(Login);
