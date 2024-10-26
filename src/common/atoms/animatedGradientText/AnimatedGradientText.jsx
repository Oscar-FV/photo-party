import React from "react";
const AnimatedGradientText = ({ text, className, animate = true }) => {

  const animation = animate ? "animate-gradient" : ""

  return (
    <h1 className={`font-semibold bg-gradient-text bg-300 ${animation} text-transparent bg-clip-text ${className}`}>
      {text}
    </h1>
  );
}
export default AnimatedGradientText