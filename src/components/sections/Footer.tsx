import { content } from '@/data/content';

export const Footer = () => {
  const { footer } = content;
  return (
    <footer className="py-12 bg-white text-center border-t border-gray-100">
      <p className="text-sm text-gray-400 mb-2">{footer.expiryDate}</p>
      <p className="text-xs text-gray-300 font-medium tracking-widest uppercase">
        {footer.copyright}
      </p>
    </footer>
  );
};
