'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      grid.style.setProperty('--mouse-x', `${x}px`);
      grid.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      const rect = grid.getBoundingClientRect();
      grid.style.setProperty('--mouse-x', `${rect.width / 2}px`);
      grid.style.setProperty('--mouse-y', `${rect.height / 2}px`);
    };

    const parent = grid.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return <div ref={gridRef} className="animated-grid" />;
}

