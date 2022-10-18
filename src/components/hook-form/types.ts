export type DefaultBasicFormValues = {
  [f: string]: string | '';
};

type HFInputProps = {
  placeholder?: string;
  isRequired?: boolean;
  type?: string;
};

type HFRegisterProps = {
  required?: boolean;
  minLength: {
    value: number;
    message: string;
  };
  pattern: {
    value: RegExp;
    message: string;
  };
  validate: (value: string) => boolean;
};

export type HFBasicField = {
  fieldName: string;
  element: 'input' | 'textarea';
  label: string;
  props: HFInputProps;
  registerProps?: HFRegisterProps;
};

export type BasicConfig<T> = {
  defaultValues: T;
  fields: HFBasicField[];
};

export type RegisterUser = {
  name: string;
  email: string;
};
