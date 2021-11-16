import React, { useState, useEffect, useRef } from 'react';

export default function useHover() {
  const [isHovered, setIsHovered] = useState(true);
  const ref = useRef(null);
  let timerId;
  const handleMouseEnter = (e) => {
    e.stopPropagation();
    return setIsHovered(true);
  };
  const handleMouseLeave = () => {
    return setIsHovered(false);
  };

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
          clearTimeout(timerId);
        };
      }
    },
    [ref.current],
  );
  return [ref, isHovered];
}