import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section = ({ children, className = "", id, fullWidth = false }: SectionProps) => {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      <div className={`mx-auto px-6 ${fullWidth ? 'w-full max-w-none px-0' : 'max-w-5xl'}`}>
        {children}
      </div>
    </section>
  );
};
