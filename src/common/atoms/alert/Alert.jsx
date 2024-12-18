"use client";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useAlert } from "../../../hooks/useAlert/useAlert";

const Alert = () => {
  const { showAlert, setShowAlert } = useAlert();
  const { show, message, type } = showAlert;
  const [animationClass, setAnimationClass] = useState(
    "slide-in-top"
  );

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setAnimationClass("slide-out-top");
      }, 3000);
      const timer2 = setTimeout(() => {
        setShowAlert((preview) => ({ ...preview, show: false }));
      }, 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    } else {
      setAnimationClass("slide-in-top");
    }
  }, [show]);

  const modalContent = (
    <div
      className={`fixed top-5 shadow-lg z-10 w-full px-4 ${animationClass}`}
    >
      <div
        className={`alert grid-cols-[auto_auto] ${
          type === "error" ? "alert-error" : "alert-success"
        }`}
      >
        {type === "error" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="text-sm text-start">
          {message}
        </span>
      </div>
    </div>
  );

  return (
    <>{show ? ReactDOM.createPortal(modalContent, document.body) : null}</>
  );
};

export { Alert };