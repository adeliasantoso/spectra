import React from 'react';

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* White Card Container */}
          <div className="bg-white rounded-lg shadow-lg p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8">
              About us
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
              At the forefront of modern innovation, we pave the way for a seamless integration of cutting-edge technology and straightforward design.
              <br /><br />
              Our unwavering commitment underscores a lifelong vision to building a better future, one device at a time.
            </p>
            
            <button className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;