import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  profile?: Maybe<UserResponse>;
  forgotPassword?: Maybe<Response>;
  changePassword: UserResponse;
};

export type MutationRegisterArgs = {
  options: UserRegisterInput;
};

export type MutationLoginArgs = {
  options: UserLoginInput;
};

export type MutationProfileArgs = {
  options: UserProfileInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
  token: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserProfileInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  errors?: Maybe<Array<FieldError>>;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError' } & Pick<
  FieldError,
  'field' | 'message'
>;

export type RegularUserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'email'
>;

export type RegularUserResponseFragment = { __typename?: 'UserResponse' } & {
  user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
  errors?: Maybe<Array<{ __typename?: 'FieldError' } & RegularErrorFragment>>;
};

export type ChangePasswordMutationVariables = Exact<{
  options: ChangePasswordInput;
  token: Scalars['String'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changePassword: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & {
  forgotPassword?: Maybe<
    { __typename?: 'Response' } & {
      errors?: Maybe<
        Array<{ __typename?: 'FieldError' } & RegularErrorFragment>
      >;
    }
  >;
};

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type ProfileMutationVariables = Exact<{
  options: UserProfileInput;
}>;

export type ProfileMutation = { __typename?: 'Mutation' } & {
  profile?: Maybe<
    { __typename?: 'UserResponse' } & RegularUserResponseFragment
  >;
};

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    name
    email
  }
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    user {
      ...RegularUser
    }
    errors {
      ...RegularError
    }
  }
  ${RegularUserFragmentDoc}
  ${RegularErrorFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($options: ChangePasswordInput!, $token: String!) {
    changePassword(options: $options, token: $token) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      errors {
        ...RegularError
      }
    }
  }
  ${RegularErrorFragmentDoc}
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($options: UserLoginInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const ProfileDocument = gql`
  mutation Profile($options: UserProfileInput!) {
    profile(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useProfileMutation() {
  return Urql.useMutation<ProfileMutation, ProfileMutationVariables>(
    ProfileDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UserRegisterInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
