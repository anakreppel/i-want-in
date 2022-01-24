import React, { useContext, useState, useEffect } from 'react';

import { Grid, Link, TextField, Button, Container } from '@mui/material';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';

import LOGIN_USER from '../graphql/login';

export function Hello() {
 return (
  <h1>Welcome</h1>
 );
}

export default function LogIn ({navigate}) {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    password: '',
  };
  const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER);
  
  const [formState, setFormState] = useState(initialState);
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  // errors object to check valid user input
  const [errors, setErrors] = useState({});

  // hook for routing on submition of form
  const navidateToDashboard = () => {
    navigate(`/dashboard/${context.user.id}`, { replace: true });
  };
  // if user is not logged in, redirect to the home page
  useEffect(() => {
    context.user && navidateToDashboard();
  });

  

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables: formState });
    if (loading) return <div>"Submitting..."</div>;
    if (error){
      setErrors(
        error.graphQLErrors[0] ? error.graphQLErrors[0].extensions.errors : {}
      );
    } else if (data) {
    setFormState(initialState);
    context.login(data.login);
    navidateToDashboard();
    }
  };


  // gql mutation hook

  // extract state, onChange and onSubmit from useForm hook
  // const { handleChange, handleSubmit, formState } = useForm(loginUser, {
  //   username: '',
  //   password: '',
  // });

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
