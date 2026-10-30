import FooterBrand, { FooterOffices, FooterSocial } from './FooterBrand';
import MetrioLogo from '../MetrioLogo';

const Footer = () => {
  const yr = new Date().getFullYear();
  return (
<footer id="contact" className="relative bg-forest-dark text-white overflow-hidden">
      {/* Main Footer */}
      <div className="relative z-10 container-metrio pt-12 pb-16 md:pt-16 md:pb-20">
        {/* Logo + Social */}
        <div className="flex items-center justify-between gap-6 pb-8 mb-10 border-b border-white/10">
          <MetrioLogo variant="light" size="xl" />
          <FooterSocial />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          <FooterBrand />
          <FooterOffices />
        </div>
      </div>
      {/* Bottom Bar */} 
      <div className="relative border-t border-white/20">
        <div className="container-metrio py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/80">
            © {yr} Metrio Development Sdn Bhd (200201027951 / 595614-T). All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-white/90 hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/90 hover:text-gold transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
