import React from 'react';
import type { SectionProps } from '@/types';

const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  id,
  darkBg = true,
}) => {
  return (
    <section
      id={id}
      className={`py-20 ${darkBg ? 'bg-surface' : 'bg-canvas'} ${className}`}
    >
      <div className="container mx-auto px-8 lg:px-16">
        {title && (
          <div className="mb-14">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-mono mb-3">{title}</p>
            <div className="w-12 h-px bg-accent opacity-60" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
