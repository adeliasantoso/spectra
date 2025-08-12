import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartIcon from '../components/CartIcon';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Animation observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      // Show success message
      success('Message sent');
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        newsletter: false
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <Navigation />
      <CartIcon />
      
      {/* Contact Section */}
      <section 
        id="contact-hero"
        ref={(el) => sectionRefs.current['contact-hero'] = el}
        className="flex-1 pt-40 md:pt-48 pb-12 md:pb-20 bg-gradient-radial from-blue-50 via-gray-50 to-gray-100"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-8 md:mb-12 leading-tight">
              <span className={`elegant-title-word ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>Connect</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>with</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>us</span>
            </h1>
            <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
              <p className={`text-base md:text-lg text-gray-700 leading-relaxed elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                Connect with our team to explore how Spectra's innovations can support tailored solutions for you or your organization. We also welcome inquiries about potential collaborations or career opportunities.
              </p>
              <p className={`text-base md:text-lg text-gray-700 leading-relaxed elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                For general inquiries, our <span onClick={() => { navigate('/'); setTimeout(() => { const faqSection = document.getElementById('faq'); if (faqSection) faqSection.scrollIntoView({ behavior: 'smooth' }); }, 500); }} className="text-blue-600 hover:text-blue-800 underline cursor-pointer">FAQ section</span> offers detailed answers to the most common questions and is a good place to begin.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`max-w-3xl mx-auto elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Name Section */}
              <div className={`elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                <div className="mb-2 md:mb-3">
                  <span className="text-base md:text-lg font-semibold text-gray-900">Name</span>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm md:text-base text-gray-600 mb-1 md:mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-400 rounded-full bg-white focus:outline-none focus:border-gray-600 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm md:text-base text-gray-600 mb-1 md:mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-400 rounded-full bg-white focus:outline-none focus:border-gray-600 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={`elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                <div className="mb-2 md:mb-3">
                  <span className="text-base md:text-lg font-semibold text-gray-900">Email</span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-400 rounded-full bg-white focus:outline-none focus:border-gray-600 transition-colors text-sm md:text-base"
                  required
                />
              </div>

              {/* Message */}
              <div className={`elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                <div className="mb-2 md:mb-3">
                  <span className="text-base md:text-lg font-semibold text-gray-900">Message</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-400 rounded-2xl bg-white focus:outline-none focus:border-gray-600 transition-colors resize-none text-sm md:text-base"
                  required
                />
              </div>

              {/* Send Button */}
              <div className={`pt-2 md:pt-4 text-center elegant-paragraph ${visibleSections.has('contact-hero') ? 'animate' : ''}`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-200 text-xs md:text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </span>
                  ) : (
                    'SEND'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;