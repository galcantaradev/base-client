import { Form, Formik, FormikHelpers } from 'formik';
import { History } from 'history';
import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { Button, FlexContainer, FormikInputField } from '../../components';
import {
  UserRegisterInput,
  useMeQuery,
  useRegisterMutation
} from '../../generated/graphql';
import { fieldErrorsToFormikErrors } from '../../utils';
import { registerValidationSchema } from './registerValidationSchema';

type Props = {
  history: History;
};

const RegisterContainer = styled(FlexContainer)`
  align-items: center;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Register = ({ history }: Props) => {
  const [{ data }] = useMeQuery();
  const [, register] = useRegisterMutation();

  if (data?.me) {
    return <Redirect to="logged-in" />;
  }

  const onSubmit = async (
    options: UserRegisterInput,
    actions: FormikHelpers<UserRegisterInput>
  ) => {
    const { data } = await register({ options });
    const errors = data?.register.errors;

    if (errors) {
      const formikErrors = fieldErrorsToFormikErrors(errors);
      actions.setErrors(formikErrors);

      return;
    }

    history.push('/');
  };

  return (
    <RegisterContainer>
      <Formik<UserRegisterInput>
        onSubmit={onSubmit}
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={() => registerValidationSchema}
      >
        {formProps => {
          return (
            <Form>
              <FormikInputField
                name="name"
                label="name"
                width={400}
                placeholder="name"
              />
              <FormikInputField
                name="email"
                label="email"
                width={400}
                placeholder="example@email.com"
              />
              <Flex>
                <FormikInputField
                  name="password"
                  label="password"
                  type="password"
                  width={190}
                  placeholder="******"
                />
                <FormikInputField
                  name="passwordConfirmation"
                  label="password confirmation"
                  placeholder="******"
                  type="password"
                  width={190}
                />
              </Flex>
              <Button
                width={400}
                type="submit"
                loading={formProps.isSubmitting}
              >
                register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </RegisterContainer>
  );
};
