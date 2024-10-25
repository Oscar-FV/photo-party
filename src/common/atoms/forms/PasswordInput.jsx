import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useField } from "formik";

const PasswordInput = ({
  placeholder,
  size,
  color,
  disabled = false,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  const [showPassword, setShowPassword] = useState(false);
  const colorClass = color ? `input-${color}` : "";
  const sizeClass = size ? `input-${size}` : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label
        className={`input input-bordered flex items-center gap-2 ${sizeClass} ${meta.touched && meta.error ? "input-error" : `${colorClass}`}`}
      >
        <input
          type={showPassword ? "text" : "password"}
          className="grow"
          placeholder={placeholder}
          disabled={disabled}
          {...field}
        />
        <Icon
          icon={showPassword ? "mage:eye" : "mage:eye-off"}
          width="24"
          height="24"
          onClick={togglePasswordVisibility}
          className="cursor-pointer"
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-error -mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};

export default PasswordInput;
