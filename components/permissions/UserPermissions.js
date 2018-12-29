import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../styles/Button';
import POSSIBLE_PERMISSIONS from './possiblePermissions';

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
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {POSSIBLE_PERMISSIONS.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type="checkbox"
                checked={this.state.permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <Button>Update</Button>
        </td>
      </tr>
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
