import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Grid, Link, TextField, Button, Container } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

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

export default function LogIn() {
  const context = useContext(AuthContext);

  // errors object to check valid user input
  const [errors, setErrors] = useState({});

  // hook for routing on submition of form
  const navigate = useNavigate();
  const navidateToDashboard = () => {
    navigate(`/dashboard/${context.user.id}`, { replace: true });
  };
  // if user is not logged in, redirect to the home page
  useEffect(() => {
    context.user && navidateToDashboard();
  });

  // gql mutation hook
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // we deconstruct the "result" object to get "login" from the "data" property, and pass an alias ("userData") to it for better readibility
    update(_, { data: { login: userData } }) {
      context.login(userData);
      console.log(userData);
      navidateToDashboard();
    },
    onError(err) {
      // set the errors from gql to the errors object
      if (err) {
        setErrors(
          err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {}
        );
      }
    },
  });

  // extract state, onChange and onSubmit from useForm hook
  const { handleChange, handleSubmit, formState } = useForm(loginUser, {
    username: '',
    password: '',
  });

  // array of input fields used to generate TextFields modularly
  const inputFields = [
    { label: 'Username', name: 'username' },
    { label: 'Password', name: 'password' },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Log In</h1>
      <Container maxWidth='xs'>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete='off'
          className={loading ? 'loading' : ''}>
          <div className='form-group'>
            {inputFields.map((field) => (
              <TextField
                sx={{ padding: '3px', margin: '0,2rem' }}
                fullWidth
                key={`field-${field.name}`}
                onChange={handleChange}
                label={field.label}
                placeholder={field.label}
                variant='filled'
                name={field.name}
                value={formState[field.name]}
                error={errors[field.name] ? true : false}
                type={field.name.includes('password') ? 'password' : ''}
                helperText={
                  errors[field.name]
                    ? errors[field.name]
                    : errors.general
                    ? 'Wrong credentials'
                    : ''
                }
              />
            ))}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 1,
                mb: 2,
                borderRadius: '0px',
                backgroundColor: '#6D8A96',
              }}>
              Submit
            </Button>
          </div>
        </form>
        <Grid container>
          <Grid item>
            <Link href='/register' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
