import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from '@apollo/client/link/schema';
import { addMocksToSchema } from "@graphql-tools/mock";
import {render, screen } from '@testing-library/react';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import  TestRenderer  from 'react-test-renderer';
import React from 'react';
import LogIn, { Hello }  from './LogIn';
import { MockedProvider } from '@apollo/client/testing';
import LOGIN_USER from '../graphql/login';
const mocks = [{
  request: {
    query: LOGIN_USER,
    variables: {
      username: 'asdasfas',
      password: 'asdsafasfgsaf',
    },
  },
  result: {
    data: {
      user: { 
        id: '12312434',
        first_name: "Vaalksda",
        last_name: "asdasfsa",
        email: "asdasfsa@gmail.com",
        username: "asdas",
        created_at: "12312451",
        token: "asdasfelgjkwi13408157ru"
      },
    },
  },
}]; 


const typeDefs = `
  type User {
    id: String!
    first_name: String!,
    last_name: String!,
    email: String!,
    username: String!,
    created_at: String!,
    token: String!
  }

  
  type Query {
    login({username: String!, password: String!}): User!
  }
`;



test('should show login form', () => { 
  const schema = makeExecutableSchema({typeDefs});
  const mockSchema = addMocksToSchema({
    schema,
    mocks: {
      Query: {
        login: () => ( {username: "new"})
      }
    }
  });
  // this client will have all the information about our GraphQL server
  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  
  const { component }= render(
      <ApolloProvider client={client}>
           <LogIn />
          </ApolloProvider>);
  // screen.getByText('Username')
  // screen.getByText('Password')
  
 
});



it('renders without error', () => {
  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Hello />
   </MockedProvider>,
  );

});