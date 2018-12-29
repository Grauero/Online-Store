import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import UserPermissions from './UserPermissions';
import ErrorMessage from '../error/ErrorMessage';
import Table from '../styles/Table';
import POSSIBLE_PERMISSIONS from './possiblePermissions';

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <ErrorMessage error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {POSSIBLE_PERMISSIONS.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>Update Permission</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserPermissions key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

export default Permissions;
