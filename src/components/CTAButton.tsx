import { Loader2 } from 'lucide-react';
import { CTAButtonProps } from '../types';

export default function CTAButton({
  text,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled = false,
  loading = false,
  href,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary:
      'bg-primary-500 text-dark-900 hover:bg-primary-400 shadow-lg shadow-primary-500/20 font-semibold',
    secondary:
      'bg-dark-500 text-white hover:bg-dark-400 border border-white/10 font-medium',
    outline:
      'bg-transparent text-primary-500 border border-primary-500/30 hover:bg-primary-500/10 font-medium',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  } ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon}
      {text}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled || loading} className={baseClasses}>
      {content}
    </button>
  );
}