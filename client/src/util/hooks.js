import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback({ variables: formState });
    setFormState(initialState);
  };

  return {
    handleChange,
    handleSubmit,
    formState,
  };
};
