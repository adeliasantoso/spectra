import React, { useState, useEffect } from 'react';

const TrustBadges = () => {
  const badges = [
    {
      icon: '🔒',
      title: 'Secure Checkout',
      description: '256-bit SSL encryption'
    },
    {
      icon: '📦',
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Hassle-free returns'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: '1-2 business days'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="stagger-item text-center p-4 hover-bounce cursor-pointer"
        >
          <div className="text-2xl mb-2 animate-heartbeat">{badge.icon}</div>
          <h4 className="text-heading-4 text-sm font-semibold text-gray-900 mb-1">
            {badge.title}
          </h4>
          <p className="text-body-small text-xs text-gray-600">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const CustomerStats = () => {
  const [stats, setStats] = useState({
    customers: 0,
    rating: 0,
    reviews: 0,
    countries: 0
  });

  const finalStats = {
    customers: 12500,
    rating: 4.8,
    reviews: 2847,
    countries: 47
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepTime = duration / steps;

    const intervals = Object.keys(finalStats).map(key => {
      const increment = finalStats[key] / steps;
      let currentValue = 0;
      let stepCount = 0;

      return setInterval(() => {
        stepCount++;
        currentValue += increment;
        
        if (stepCount >= steps) {
          currentValue = finalStats[key];
          clearInterval(intervals.find(interval => interval === this));
        }

        setStats(prev => ({
          ...prev,
          [key]: key === 'rating' ? Number(currentValue.toFixed(1)) : Math.floor(currentValue)
        }));
      }, stepTime);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-heading-3 text-gray-900 mb-2">
          Trusted by thousands worldwide
        </h3>
        <p className="text-body text-gray-600">
          Join our growing community of satisfied customers
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center stagger-item">
          <div className="counter text-heading-2 text-accent animate-count-up">
            {stats.customers.toLocaleString()}+
          </div>
          <p className="text-caption text-gray-600">Happy Customers</p>
        </div>
        
        <div className="text-center stagger-item">
          <div className="counter text-heading-2 text-accent animate-count-up">
            {stats.rating}★
          </div>
          <p className="text-caption text-gray-600">Average Rating</p>
        </div>
        
        <div className="text-center stagger-item">
          <div className="counter text-heading-2 text-accent animate-count-up">
            {stats.reviews.toLocaleString()}+
          </div>
          <p className="text-caption text-gray-600">Reviews</p>
        </div>
        
        <div className="text-center stagger-item">
          <div className="counter text-heading-2 text-accent animate-count-up">
            {stats.countries}+
          </div>
          <p className="text-caption text-gray-600">Countries</p>
        </div>
      </div>
    </div>
  );
};

const SecurityBadges = () => {
  const securityFeatures = [
    { icon: '🛡️', label: 'SSL Secured' },
    { icon: '✅', label: 'Verified' },
    { icon: '💳', label: 'Secure Payment' },
    { icon: '🏆', label: 'Award Winner' }
  ];

  return (
    <div className="flex justify-center items-center space-x-6 py-4">
      {securityFeatures.map((feature, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors hover-bounce cursor-pointer"
        >
          <span className="text-lg">{feature.icon}</span>
          <span className="text-body-small font-medium">{feature.label}</span>
        </div>
      ))}
    </div>
  );
};

const MoneyBackGuarantee = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="text-2xl animate-heartbeat">💰</div>
        <div>
          <h4 className="text-heading-4 text-green-800 font-semibold">30-Day Money Back Guarantee</h4>
          <p className="text-body-small text-green-700">Not satisfied? Get your money back, no questions asked.</p>
        </div>
      </div>
    </div>
  );
};

const SocialProof = ({ className = "" }) => {
  const testimonialSnippets = [
    { text: "Game-changing product!", author: "Sarah K.", rating: 5 },
    { text: "Exceeded expectations", author: "David M.", rating: 5 },
    { text: "Worth every penny", author: "Lisa R.", rating: 5 },
    { text: "Revolutionary technology", author: "Mike T.", rating: 5 }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <h4 className="text-heading-4 text-gray-900 mb-2">What customers say</h4>
        <div className="flex justify-center space-x-1 text-yellow-400 text-lg">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="animate-bounce-in" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonialSnippets.map((testimonial, index) => (
          <div 
            key={index}
            className="stagger-item bg-white p-4 rounded-lg shadow-sm border hover-lift"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-1 text-yellow-400 text-sm">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span className="text-caption">Verified</span>
            </div>
            <p className="text-body-small text-gray-700 mb-2">"{testimonial.text}"</p>
            <p className="text-caption text-gray-500">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrustBadges, CustomerStats, SecurityBadges, MoneyBackGuarantee, SocialProof };
export default TrustBadges;