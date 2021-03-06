import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../error/ErrorMessage';
import { CURRENT_USER_QUERY, RESET_MUTATION } from '../../mutations/auth';
import Form from '../styles/Form';

class Reset extends Component {
  state = {
    password: '',
    confirmPassword: ''
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = async (e, reset) => {
    e.preventDefault();
    await reset();

    this.setState({
      password: '',
      confirmPassword: ''
    });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading }) => (
          <Form method="post" onSubmit={e => this.formSubmit(e, reset)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>
              <ErrorMessage error={error} />

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="new password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="confirmPassword ">
                Confirm Your Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm your new password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Reset Your Password!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired
};

export default Reset;
