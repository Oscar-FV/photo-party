import React from "react";
import { useField } from "formik";

const InputFile = ({
  placeholder,
  size,
  color,
  disabled = false,
  name,
  setFieldValue, // Recibe `setFieldValue` como prop
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  const colorClass = color ? `input-${color}` : "";
  const sizeClass = size ? `input-${size}` : "";

  return (
    <>
      <input
        disabled={disabled}
        type="file"
        placeholder={placeholder}
        name={name}
        className={`input input-bordered flex items-center gap-2 ${sizeClass} ${meta.touched && meta.error ? "input-error" : colorClass}`}
        onChange={(e) => {
          const file = e.target.files[0];
          setFieldValue(name, file); // Actualiza el valor en Formik
          field.onChange(e);
        }}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error -mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputFile;
