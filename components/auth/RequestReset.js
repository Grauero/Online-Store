import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../error/ErrorMessage';
import Form from '../styles/Form';
import { REQUEST_RESET_MUTATION } from '../../mutations/auth';

class RequestReset extends Component {
  state = {
    email: ''
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
      email: ''
    });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form method="post" data-test="form" onSubmit={e => this.formSubmit(e, reset)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <ErrorMessage error={error} />
              {!error && !loading && called && <p>Success! Check your email for a reset link.</p>}

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

              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
