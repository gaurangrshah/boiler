import { mapFieldsToInputs } from '@/components/hook-form/poly-input';
import { authenticateUserInputSchema } from '@/schema';
import { AuthenticateUserInput } from '@/types';
import { onPromise } from '@/utils';
import { Button, HStack, Spinner, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, SignInResponse } from 'next-auth/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UserAuthorizationConfig } from '../hook-form/field-configs';

export const CredentialsFormNew: React.FC = () => {
  const { defaultValues, fields } = UserAuthorizationConfig;

  const methods = useForm<AuthenticateUserInput>({
    resolver: zodResolver(authenticateUserInputSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<AuthenticateUserInput> = async (
    values
  ): Promise<SignInResponse | undefined> =>
    await signIn('credentials', {
      // callbackUrls: '/?success="Welcome!"',
      // redirect: true,
      ...values,
    });
  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        alignItems="flex-end"
        gap={4}
        // NOTE: onPromise helps satisfy the need for the handler to return a promise
        onSubmit={onPromise(methods.handleSubmit(onSubmit))}
      >
        {fields.map(mapFieldsToInputs)}
        <HStack w="full" justify="space-between">
          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            isLoading={methods.formState.isSubmitting}
            spinner={<Spinner />}
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </FormProvider>
  );
};
