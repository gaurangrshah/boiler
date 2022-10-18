import { BasicConfig } from './types';
import { CreateUserInput, AuthenticateUserInput } from '@/types';

export const UserRegistrationConfig: BasicConfig<CreateUserInput> = {
  defaultValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  fields: [
    {
      fieldName: 'name',
      element: 'input',
      label: 'Name',
      props: {
        placeholder: 'Please provide your name',
        isRequired: true,
      },
    },
    {
      fieldName: 'email',
      element: 'input',
      label: 'Email',
      props: {
        placeholder: 'you@youremail.com',
        isRequired: true,
      },
    },
    {
      fieldName: 'password',
      element: 'input',
      label: 'Password',
      props: {
        type: 'password',
        placeholder: '**************',
        isRequired: true,
      },
    },
    {
      fieldName: 'passwordConfirm',
      element: 'input',
      label: 'Confirm Password',
      props: {
        type: 'password',
        placeholder: '**************',
        isRequired: true,
      },
    },
  ],
};

export const UserAuthorizationConfig: BasicConfig<AuthenticateUserInput> = {
  defaultValues: {
    email: '',
    password: '',
  },
  fields: [
    {
      fieldName: 'email',
      element: 'input',
      label: 'Email',
      props: {
        placeholder: 'you@youremail.com',
        isRequired: true,
      },
    },
    {
      fieldName: 'password',
      element: 'input',
      label: 'Password',
      props: {
        type: 'password',
        placeholder: '**************',
        isRequired: true,
      },
    },
  ],
};
