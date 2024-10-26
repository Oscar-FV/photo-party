// /components/ConfettiExplosion.tsx
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiExplosion = ({ trigger }) => {
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsExploding(true);
      const timer = setTimeout(() => setIsExploding(false), 5000); // Duración de la explosión
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {isExploding && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
};

export default ConfettiExplosion;
