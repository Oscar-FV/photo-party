"use client"
import React from "react";

export const Button = ({
    children,
    className,
    color = "ghost",
    size,
    variant = "",
    width = "",
    shape = "",
    disabled = false,
    type = "button",
    loading = false,
    onClick,
}) => {
    const baseClass = "btn";
    const colorClass = color ? `btn-${color}` : "";
    const sizeClass = size ? `btn-${size}` : "";
    const variantClass = variant ? `btn-${variant}` : "";
    const widthClass = width ? `btn-${width}` : "";
    const shapeClass = shape ? `btn-${shape}` : "";

    return (
        <button
            className={`${baseClass} ${colorClass} ${sizeClass} ${variantClass} ${widthClass} ${shapeClass} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {loading && <span className="loading loading-spinner"></span>}
            {children}
        </button>
    );
};

