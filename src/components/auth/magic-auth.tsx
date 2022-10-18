import { magicAuthInputSchema } from '@/schema';
import { MagicAuthInput } from '@/types';
import { onPromise, trpc } from '@/utils';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomIcon } from 'chakra.ui/icons';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type MagicAuthInputWithToken = {
  csrfToken: string | undefined;
} & MagicAuthInput;

export const MagicAuthForm: React.FC = () => {
  const { data } = trpc.auth.formUtils.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MagicAuthInputWithToken>({
    resolver: zodResolver(magicAuthInputSchema),
    defaultValues: {
      csrfToken: data?.csrfToken,
      email: '',
    },
  });

  const onSubmit: SubmitHandler<MagicAuthInput> = async (
    values
  ): Promise<void> => {
    await signIn('email', {
      callbackUrl: '/auth/verify-request?success=Please check your email.',
      email: values?.email,
      csrfToken: data?.csrfToken,
    });
  };

  return (
    <VStack
      as="form"
      alignItems="flex-end"
      gap={4}
      onSubmit={onPromise(handleSubmit(onSubmit))}
    >
      <Input {...register('csrfToken')} type="hidden" isReadOnly isDisabled />

      <FormControl
        id="magic-auth"
        isInvalid={!!errors.email?.message}
        isRequired
      >
        <FormLabel htmlFor="email" fontSize="sm">
          Email
        </FormLabel>
        <InputGroup>
          <InputLeftElement>
            <CustomIcon icon="mail" size="1.25rem" color="brand.50" />
          </InputLeftElement>
          <Input
            autoComplete="off"
            placeholder="you@youremail.com"
            {...register('email')}
          />
          <InputRightElement>
            <IconButton
              aria-label="submit"
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              spinner={<Spinner />}
              icon={<CustomIcon icon="plane" size="1.5rem" color="brand.700" />}
            />
          </InputRightElement>
        </InputGroup>
        {errors?.email && (
          <FormErrorMessage>
            Please enter a valid email address
          </FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};
