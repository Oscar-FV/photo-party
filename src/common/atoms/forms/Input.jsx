import React from "react";
import { useField } from "formik";

const Input = ({
  type = "text",
  placeholder,
  size,
  color,
  disabled = false,
  name,
  ...props
}) => {
  const [field, meta] = useField({name, ...props});

  const colorClass = color ? `input-${color}` : "";
  const sizeClass = size ? `input-${size}` : "";

  return (
    <>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`input input-bordered flex items-center gap-2 ${sizeClass} ${meta.touched && meta.error ? "input-error" : `${colorClass}`}`}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className="text-error -mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
