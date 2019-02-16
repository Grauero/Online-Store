import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import ErrorMessage from '../error/ErrorMessage';
import Button from '../styles/Button';
import POSSIBLE_PERMISSIONS from './possiblePermissions';
import UPDATE_PERMISSIONS_MUTATION from '../../mutations/permissions';

class UserPermissions extends Component {
  state = {
    permissions: this.props.user.permissions
  };

  handlePermissionChange = (e) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }

    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const user = this.props.user;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <Fragment>
            {error && (
              <tr>
                <td colSpan="8">
                  <ErrorMessage error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {POSSIBLE_PERMISSIONS.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      type="checkbox"
                      id={`${user.id}-permission-${permission}`}
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <Button type="button" disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? 'ing' : 'e'}
                </Button>
              </td>
            </tr>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array
  }).isRequired
};

export default UserPermissions;
