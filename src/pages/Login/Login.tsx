import { Form, Formik, FormikHelpers } from 'formik';
import { History } from 'history';
import React from 'react';
import styled from 'styled-components';

import { Button, FlexContainer, FormikInputField } from '../../components';
import { UserLoginInput, useLoginMutation } from '../../generated/graphql';
import { fieldErrorsToFormikErrors } from '../../utils';
import { loginValidationSchema } from './loginValidationSchema';

type Props = {
  history: History;
};

const LoginContainer = styled(FlexContainer)`
  align-items: center;
  justify-content: center;
`;

export const Login = ({ history }: Props) => {
  const [, login] = useLoginMutation();

  const onSubmit = async (
    options: UserLoginInput,
    actions: FormikHelpers<UserLoginInput>
  ) => {
    const { data } = await login({ options }, { pollInterval: 1 });
    const errors = data?.login.errors;

    if (errors) {
      const formikErrors = fieldErrorsToFormikErrors(errors);
      actions.setErrors(formikErrors);

      return;
    }

    history.push('/');
  };

  return (
    <LoginContainer>
      <Formik<UserLoginInput>
        onSubmit={onSubmit}
        initialValues={{ email: 'galcantaradev@gmail.com', password: '123456' }}
        validationSchema={() => loginValidationSchema}
      >
        {formProps => {
          return (
            <Form>
              <FormikInputField
                width={400}
                name="email"
                type="email"
                label="email"
                placeholder="example@email.com"
              />
              <FormikInputField
                width={400}
                name="password"
                type="password"
                label="password"
                placeholder="******"
              />
              <Button
                width={400}
                type="submit"
                loading={formProps.isSubmitting}
              >
                login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </LoginContainer>
  );
};