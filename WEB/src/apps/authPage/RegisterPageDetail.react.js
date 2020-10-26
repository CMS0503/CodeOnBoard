// @flow

import * as React from "react";

import {
  FormCard,
  FormTextInput,
  FormCheckboxInput,
} from "tabler-react";
import StandaloneFormPage from "./StandFormPage.react"
import defaultStrings from "./RegisterPage.strings";


/**
 * A register page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function RegisterPage1(props: Props): React.Node {
  const {
    action,
    method,
    onSubmit,
    onChange,
    onBlur,
    values,
    strings = {},
    errors,
  } = props;

  return (
    <StandaloneFormPage >
      <FormCard
        buttonText={strings.buttonText || defaultStrings.buttonText}
        title={strings.title || defaultStrings.title}
        onSubmit={onSubmit}
        action={action}
        method={method}
      >
        <FormTextInput
          name="name"
          label={strings.nameLabel || defaultStrings.nameLabel}
          placeholder={
            strings.namePlaceholder || defaultStrings.namePlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.name}
          error={errors && errors.name}
        />
        <FormTextInput
          name="email"
          label={strings.emailLabel || defaultStrings.emailLabel}
          placeholder={
            strings.emailPlaceholder || defaultStrings.emailPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.email}
          error={errors && errors.email}
        />
        <FormTextInput
          name="password"
          type="password"
          label={strings.passwordLabel || defaultStrings.passwordLabel}
          placeholder={
            strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.password}
          error={errors && errors.password}
        />

        <FormTextInput
          name="password2"
          type="password"
          label="confirm password"
          placeholder={
            strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.password}
          error={errors && errors.password}
        />
      </FormCard>
    </StandaloneFormPage>
  );
}

export default RegisterPage1;