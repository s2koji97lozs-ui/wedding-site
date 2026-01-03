import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  isExternal?: boolean;
  variant?: 'primary' | 'blur';
}

export const Button = ({ href, label, isExternal, variant = 'primary' }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20",
    blur: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  const props = {
    className: `${baseStyles} ${variants[variant]}`,
    href,
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  return <Link {...props}>{label}</Link>;
};
