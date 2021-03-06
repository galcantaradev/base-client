import * as React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { History } from 'history';
import styled from 'styled-components';

import {
  Button,
  CentralizedContainer,
  FormikInputField,
  SectionTitle
} from '../../components';
import {
  UserRegisterInput,
  useRegisterMutation
} from '../../generated/graphql';
import { fieldErrorsToFormikErrors } from '../../utils';
import { validationSchema } from './validationSchema';

type Props = {
  history: History;
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Register = ({ history }: Props) => {
  const [, register] = useRegisterMutation();

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
    <CentralizedContainer>
      <Formik<UserRegisterInput>
        onSubmit={onSubmit}
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={validationSchema}
      >
        {formProps => {
          return (
            <Form>
              <SectionTitle>register</SectionTitle>
              <FormikInputField
                name="email"
                label="email"
                width={400}
                placeholder="example@email.com"
              />
              <FormikInputField
                name="name"
                label="name"
                width={400}
                placeholder="name"
              />
              <Flex>
                <FormikInputField
                  name="password"
                  label="password"
                  type="password"
                  width={190}
                  placeholder="*******"
                />
                <FormikInputField
                  name="passwordConfirmation"
                  label="password confirmation"
                  placeholder="*******"
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
    </CentralizedContainer>
  );
};

export default Register;
