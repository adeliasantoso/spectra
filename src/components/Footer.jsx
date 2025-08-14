import React from 'react';

const Footer = React.memo(() => {
  return (
    <footer className="bg-gray-300 py-6 sm:py-8 md:py-16">
      <div className="max-w-full mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Side - Logo and Copyright */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">SPECTRA</h3>
            <p className="text-gray-700 text-sm md:text-base mb-4">© 2025</p>
            
            {/* Legal Links */}
            <div className="text-xs text-gray-600 space-x-2 flex flex-wrap">
              <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="/terms-of-service" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="/privacy-choices" className="hover:text-gray-900 transition-colors">Your Privacy Choices (CCPA)</a>
              <span>•</span>
              <a href="/do-not-sell" className="hover:text-gray-900 transition-colors">Do Not Sell or Share My Personal Information</a>
            </div>
          </div>

          {/* Right Side - Location and Contact */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full md:w-auto">
            {/* Location */}
            <div className="flex-1 md:flex-none">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-4">Location</h4>
              <div className="text-gray-700 text-sm md:text-base space-y-1 md:space-y-2">
                <p>48 North Fairfax</p>
                <p>New Zealand 7843</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex-1 md:flex-none">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-4">Contact</h4>
              <div className="text-gray-700 text-sm md:text-base space-y-1 md:space-y-2">
                <p>contact@spectra.com</p>
                <p>(649) 772-4804</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;