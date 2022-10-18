import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { HFBasicField } from './types';

export function mapFieldsToInputs(field: HFBasicField) {
  return <NestedPolyInput key={field.fieldName} {...field} />;
}

export const NestedPolyInput: React.FC<HFBasicField> = ({
  fieldName,
  element = 'input',
  label,
  props,
  registerProps,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      id={fieldName}
      key={fieldName}
      isInvalid={!!errors[fieldName]?.message}
      isRequired={props.isRequired}
    >
      <FormLabel htmlFor={fieldName} fontSize="sm">
        {label}
      </FormLabel>
      {element === 'input' ? (
        <Input
          autoComplete="off"
          {...register(fieldName, { ...registerProps })}
          {...props}
        />
      ) : null}
      {element === 'textarea' ? (
        <Textarea {...register(fieldName, { ...registerProps })} {...props} />
      ) : null}
      <FormErrorMessage>
        <>{errors[fieldName] && errors[fieldName]?.message}</>
      </FormErrorMessage>
    </FormControl>
  );
};
