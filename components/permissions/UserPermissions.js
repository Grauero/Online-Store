import React from 'react';
import PropTypes from 'prop-types';

import Button from '../styles/Button';
import POSSIBLE_PERMISSIONS from './possiblePermissions';

const UserPermissions = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    {POSSIBLE_PERMISSIONS.map(permission => (
      <td>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input type="checkbox" />
        </label>
      </td>
    ))}
    <td>
      <Button>Update</Button>
    </td>
  </tr>
);

UserPermissions.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired
};

export default UserPermissions;
