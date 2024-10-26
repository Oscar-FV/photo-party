import React from "react";
import { Formik, Form, validateYupSchema } from "formik";
import { useAlert } from "../../../../hooks/useAlert/useAlert";

const FormWrapper = ({
  initialValues,
  validationSchema,
  onSubmit,
  className,
  children,
  ...rest
}) => {
  const { setShowAlert } = useAlert();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, validateForm }) => {
        const errors = await validateForm();

        if (Object.keys(errors).length > 0) {
          setShowAlert({
            show: true,
            message: "Hay errores en el formulario. Revisa los campos.",
            type: "error",
          });
        } else {
          setShowAlert({ show: false, message: "", type: "" });
          onSubmit(values, { setSubmitting });
        }
        setSubmitting(false);
      }}
      validateOnMount={true}
      validateOnBlur={true}
      validateOnChange={true}
      {...rest}
    >
      {({ isValid, isSubmitting }) => (
        <Form className={`${className}`}>{children({isValid, isSubmitting})}</Form>
      )}
    </Formik>
  );
};

export default FormWrapper;
