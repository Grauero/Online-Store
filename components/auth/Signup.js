import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../error/ErrorMessage';
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../../mutations/auth';
import Form from '../styles/Form';

class Signup extends Component {
  state = {
    name: '',
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
      name: '',
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form method="post" onSubmit={e => this.formSubmit(e, signup)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
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

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
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

              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
