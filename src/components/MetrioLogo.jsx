import metrioLogo from '../assets/logos/metrio-logo.png';

const MetrioLogo = ({ variant = 'dark', size = 'md' }) => {
  const sizes = {
    sm: 48,
    md: 64,
    lg: 80,
    xl: 112,
  };

  const h = sizes[size] || sizes.md;

  return (
    <img
      src={metrioLogo}
      alt="Metrio Group Logo"
      style={{
        height: `${h}px`,
        width: 'auto',
        filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
      }}
      className="object-contain"
    />
  );
};

export default MetrioLogo;
