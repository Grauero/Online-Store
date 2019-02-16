import gql from 'graphql-tag';

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

export default ALL_USERS_QUERY;
