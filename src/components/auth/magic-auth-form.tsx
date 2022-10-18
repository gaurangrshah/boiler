import { magicAuthInputSchema } from '@/schema';
import { MagicAuthInput } from '@/types';
import { onPromise } from '@/utils';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterLink } from './register-link';

type MagicAuthProps = {
  csrfToken: string | undefined;
  providerId: string | undefined;
};

type MagicAuthInputWithToken = {
  csrfToken: string | undefined;
} & MagicAuthInput;

export const MagicAuthForm: React.FC<MagicAuthProps> = ({
  csrfToken,
  providerId,
}) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<MagicAuthInputWithToken>({
  //   resolver: zodResolver(magicAuthInputSchema),
  //   defaultValues: {
  //     csrfToken,
  //     email: '',
  //   },
  // });

  // const onSubmit: SubmitHandler<MagicAuthInput> = async (
  //   values
  // ): Promise<void> => {
  //   await signIn(providerId, {
  //     callbackUrl: '/auth/verify-request?success=Please check your email.',
  //     email: values?.email,
  //     csrfToken,
  //   });
  // };

  return (
    <VStack
      as="form"
      alignItems="flex-end"
      gap={4}
      // onSubmit={onPromise(handleSubmit(onSubmit))}
    >
      <FormControl
        id="magic-auth"
        // isInvalid={!!errors.email?.message}
        // isRequired
      >
        <FormLabel htmlFor="email" fontSize="sm">
          Email
        </FormLabel>
        {/* <Input {...register('csrfToken')} type="hidden" isReadOnly isDisabled /> */}
        <Input
          autoComplete="off"
          // {...register('email')}
          placeholder="you@youremail.com"
        />

        {/* {errors?.email && (
          <FormErrorMessage>
            Please enter a valid email address
          </FormErrorMessage>
        )} */}
      </FormControl>
      <HStack w="full" justify="space-between">
        <RegisterLink />
        <Button
          type="submit"
          size="sm"
          // isLoading={isSubmitting}
          spinner={<Spinner />}
        >
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};
