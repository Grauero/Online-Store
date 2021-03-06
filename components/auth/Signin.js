import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../error/ErrorMessage';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../../mutations/auth';
import Form from '../styles/Form';

class Signin extends Component {
  state = {
    password: '',
    email: ''
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = async (e, signup) => {
    e.preventDefault();
    await signup();

    this.setState({
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form method="post" onSubmit={e => this.formSubmit(e, signup)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your Account</h2>
              <ErrorMessage error={error} />

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
