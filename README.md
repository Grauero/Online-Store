# Online store [![Build Status](https://travis-ci.org/Grauero/Online-Store.svg?branch=master)](https://travis-ci.org/Grauero/Online-Store)
https://online-store-client.herokuapp.com/

![landing](http://i.piccy.info/i9/dbc162cb2a231d82a6a6c7a1feed68fc/1552382807/224775/1306930/landing.jpg)

Online store built on React/GraphQL

Authenticated users can create new products in store, search for required items, add items in cart and checkout orders

User register with login/password and can request for resetting password

Admin can change user permissions for creating, modifying, deleting items

CRUD operations handled by GraphQL queries/mutations

Project tested with Jest+Enzyme

Application audit with Google Chrome audits on mobile devices with simulated fast 3G, 4x CPU Slowdown:
- /signup page: ![signup](http://i.piccy.info/i9/fd0979e4fabbfc019c74d9d1ceeffef4/1552382951/15096/1306930/signup.jpg)

- /items page: ![items](http://i.piccy.info/i9/0586ce8f63842aba3e03ea6baad3d988/1552382994/14970/1306930/items.jpg)

- /orders page: ![orders](http://i.piccy.info/i9/85743bd8382390d254b0e3697ba8ba30/1552382968/15302/1306930/orders.jpg)

## TEST DATA FOR CREDIT CARDS:
  - card number: 4242 4242 4242 4242
  - mm/yy: 10/20
  - cvc: 1234
  
## Application features:
### - users can add, search and view items in the store
  
![items](http://i.piccy.info/i9/dbc162cb2a231d82a6a6c7a1feed68fc/1552382807/224775/1306930/landing.jpg)

 
 
### - users can add items in cart and checkout orders

![cart](http://i.piccy.info/i9/84661b7d9a2df31d4a93f43f49ff8498/1552383150/171554/1306930/cart.jpg)
  
 
 
### - users can view history of past orders with detailed information about them
  
 ![orders](http://i.piccy.info/i9/74079f872bea37c7f119fd92a4d2ca0a/1552383234/154279/1306930/orders.jpg)
  
## Scripts:
  1. Client:
      - ```npm run dev``` - to launch local dev-server (client)
      - ```npm run build``` - to build client part
      - ```npm run test``` - to launch test run in watch mode
  1. Server:
      - ```npm run dev``` - to launch backend server  

### Used tools:
  1. [Next.js](https://nextjs.org/) for server side rendering
  2. [Styled Components](https://www.styled-components.com/) for styling
  3. [Jest](https://jestjs.io) for testing
  4. [Apollo Client](https://www.apollographql.com/) for:
      - GraphQL requests and mutations;
      - caching;
      - state management;
  5. [GraphQL Yoga](https://github.com/prisma/graphql-yoga) on backend for:
      - resolving requests and mutations;
      - sending emails;
      - auth with [JWT](https://jwt.io) tokens;
  6. [Stripe](https://stripe.com/) for handling credit cards 
  7. [Prisma](https://app.prisma.io/) for [MongoDB](https://www.mongodb.com) API interfaces, defining schemas
