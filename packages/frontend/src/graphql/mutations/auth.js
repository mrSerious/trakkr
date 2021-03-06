import gql from 'graphql-tag';

export const USER_LOGIN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
      user{
        id
        firstName
        lastName
        userName
        email
        avatarUrl
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userName: String) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, userName: $userName) {
      user {
        id
        lastName
        firstName
        userName
        email
        avatarUrl
      }
      token
    }
  }
`;
