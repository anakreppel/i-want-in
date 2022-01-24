import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      first_name
      last_name
      email
      username
      created_at
      token
    }
  }
`;
export default LOGIN_USER;