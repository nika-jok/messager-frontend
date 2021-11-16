import React, { useEffect, useRef, useState } from 'react';

export default () => {
  const [started, setStarted] = useState(false);
  const [ms, setMs] = useState(0);
  
  const intervalRef = useRef();
  
  useEffect(() => {
    if (started) {
      const startTime = Date.now() - ms;
      const id = setInterval(() => {
        setMs(Date.now() - startTime);
      }, 16);
      intervalRef.current = id;
    }
    return () => clearInterval(intervalRef.current);
  });
  return {
    ms: Math.round(ms/100)/10,
    running: started,
    start: () => setStarted(true),
    pause: () => setStarted(false),
    stop: () => {
      setMs(0);
      setStarted(false);
    }
  };
};