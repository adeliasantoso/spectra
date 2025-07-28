import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8 md:py-16">
      <div className="max-w-full mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Side - Logo and Copyright */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">SPECTRA</h3>
            <p className="text-gray-700 text-lg md:text-xl">© 2025</p>
          </div>

          {/* Right Side - Location and Contact */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-24 w-full md:w-auto">
            {/* Location */}
            <div className="flex-1 md:flex-none">
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-4">Location</h4>
              <div className="text-gray-700 text-base md:text-lg space-y-1 md:space-y-2">
                <p>48 North Fairfax</p>
                <p>New Zealand 7843</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex-1 md:flex-none">
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-4">Contact</h4>
              <div className="text-gray-700 text-base md:text-lg space-y-1 md:space-y-2">
                <p>contact@spectra.com</p>
                <p>(649) 772-4804</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;