import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint, prodEndpoint } from '../config';
import LOCAL_STATE_QUERY from '../queries/cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read cartOpen value
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // toggle cartOpen value
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);

            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
}

export default withApollo(createClient);
