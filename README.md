# Online store
https://online-store-client.herokuapp.com/

Online store build on Next/GraphQL.
Authenticated users can create new products in store, search for required items, add items in cart and checkout orders.
User register with login/password and can request for resetting password.
Admin can change user permissions for creating, modifying, deleting items.

TEST DATA FOR CREDIT CARDS:
  - card number: 4242 4242 4242 4242
  - mm/yy: 10/20
  - cvs: 1234

Used tools:
  - Next.js on front for SSR
  - Styled Components for styling
  - Jest for testing
  - Apollo Client for:
      - GraphQL requests and mutations;
      - caching;
      - state management;
  - GraphQL Yoga on back for:
      - resolving requests and mutations;
      - sending emails;
      - auth with JWT tokens;
  - Stripe for handling credit cards 
  - Prisma for MongoDB API interfaces, defining schemas
