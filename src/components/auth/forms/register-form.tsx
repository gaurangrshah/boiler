import { mapFieldsToInputs } from '@/components/hook-form';
import { createUserOutputSchema } from '@/schema';
import { UserInput } from '@/types';
import { debug, dev, isBrowser, onPromise, trpc } from '@/utils';
import { Button, Spinner, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UserRegistrationConfig } from '../../hook-form/field-configs';

export const UserRegistrationForm: React.FC = () => {
  const router = useRouter();

  const { defaultValues, fields } = UserRegistrationConfig;

  const methods = useForm<UserInput>({
    resolver: zodResolver(createUserOutputSchema),
    defaultValues,
  });
  const { mutate, isLoading } = trpc.auth.registerUser.useMutation({
    onSuccess: () => {
      if (isBrowser) {
        dev.log('auth.registerUser: success', debug);
        void router.push('/auth/signin?success=User Created Successfully');
      }
    },
    onError: (error) => {
      if (error) {
        if (isBrowser) {
          dev.error('auth.registerUser: error', error, true);
          void router.replace(`/auth/register?error=${error.message}`);
        }
      }
    },
  });

  const onSubmit: SubmitHandler<UserInput> = (values) => mutate(values);

  return (
    <>
      <FormProvider {...methods}>
        <VStack
          as="form"
          alignItems="flex-end"
          w="full"
          gap={4}
          // NOTE: onPromise helps satisfy the need for the handler to return a promise
          onSubmit={onPromise(methods.handleSubmit(onSubmit))}
        >
          {fields.map(mapFieldsToInputs)}
          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            isLoading={isLoading}
            spinner={<Spinner />}
          >
            Register
          </Button>
        </VStack>
      </FormProvider>
    </>
  );
};
