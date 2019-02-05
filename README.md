# Online store
https://online-store-client.herokuapp.com/

Online store build on Next/GraphQL.

Authenticated users can create new products in store, search for required items, add items in cart and checkout orders.

User register with login/password and can request for resetting password.

Admin can change user permissions for creating, modifying, deleting items.

## TEST DATA FOR CREDIT CARDS:
  - card number: 4242 4242 4242 4242
  - mm/yy: 10/20
  - cvs: 1234
  
## Scripts:
  1. Client:
      - ```npm run dev``` - to launch local dev-server (client)
      - ```npm run build``` - to build client part
      - ```npm run test``` - to launch test run in watch mode
  1. Server:
      - ```npm run dev``` - to launch backend server  

### Used tools:
  1. [Next.js](https://nextjs.org/) on front for SSR
  2. [Styled Components](https://www.styled-components.com/) for styling
  3. [Jest](https://jestjs.io) for testing
  4. [Apollo Client](https://www.apollographql.com/) for:
      - GraphQL requests and mutations;
      - caching;
      - state management;
  5. [GraphQL Yoga](https://github.com/prisma/graphql-yoga) on back for:
      - resolving requests and mutations;
      - sending emails;
      - auth with [JWT](https://jwt.io) tokens;
  6. [Stripe](https://stripe.com/) for handling credit cards 
  7. [Prisma](https://app.prisma.io/) for [MongoDB](https://www.mongodb.com) API interfaces, defining schemas
