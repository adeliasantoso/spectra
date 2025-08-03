import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartIcon from '../components/CartIcon';
import OptimizedImage from '../components/OptimizedImage';
import heroAbout from '../assets/images/about-page/hero-about.png';
import buildingTech from '../assets/images/about-page/building-tech.png';
import designingFor from '../assets/images/about-page/designing-for.png';
import drivingChange from '../assets/images/about-page/diriving-change.png';

const About = () => {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <CartIcon />
      
      {/* Hero Section - "Our vision" */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden -mt-16 pt-16">
        <OptimizedImage
          src={heroAbout}
          alt="Our Vision"
          width={1920}
          height={800}
          lazy={false}
          className="w-full h-full object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-20">
          <div className="text-center px-4 md:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold">
              Our vision
            </h1>
          </div>
        </div>
      </section>

      {/* Building tech that understands you */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="space-y-4 md:space-y-6 pt-2 md:pt-4 ml-8 md:ml-12 lg:ml-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Building tech that<br />understands you
              </h2>
              <div className="space-y-6 md:space-y-7 text-sm md:text-base lg:text-lg">
                <p className="text-gray-700 leading-relaxed">
                  <em>What if technology could go beyond<br/>
                  serving us and actually understand our needs?</em>
                </p>
                <p className="text-gray-700 leading-relaxed mt-6 md:mt-8">
                  This question led us to the creation of Spectra,<br/>
                  a device that seamlessly blends into your routine<br/>
                  and deliver helpful, personalized suggestions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Founded by a small collective of engineers<br/>
                  and designers, Spectra was born from a vision<br/>
                  where technology improves our lives meaningfully.
                </p>
              </div>
            </div>
            <div>
              <img
                src={buildingTech}
                alt="Team collaboration"
                className="w-full h-[320px] md:h-[400px] lg:h-[480px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Designing for safety, accessibility, and sustainability */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="order-2 lg:order-1">
              <img
                src={designingFor}
                alt="Safety and accessibility design"
                className="w-full h-[320px] md:h-[400px] lg:h-[480px] object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-4 md:space-y-6 pt-2 md:pt-4 order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Designing for safety,<br />accessibility, and<br />sustainability
              </h2>
              <div className="space-y-6 md:space-y-7 text-sm md:text-base lg:text-lg">
                <p className="text-gray-700 leading-relaxed">
                  We prioritize safety, accessibility, and<br/>
                  sustainability in everything we create.
                </p>
                <p className="text-gray-700 leading-relaxed mt-6 md:mt-8">
                  Our dedicated research and policy team ensures<br/>
                  that each product reflects our core values and<br/>
                  commitment to responsible technology.
                </p>
                <p className="text-gray-700 leading-relaxed mt-6 md:mt-8">
                  Through our work, we strive to improve<br/>
                  the wellbeing of both people and the planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driving change for better experiences */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative">
            
            <div className="text-center mb-8 md:mb-16 pt-8 md:pt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 leading-tight">
                Driving change for better experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto text-left">
                <div className="space-y-6 md:space-y-7 text-sm md:text-base lg:text-lg">
                  <p className="text-gray-700 leading-relaxed">
                    One of our key breakthroughs has been rethinking<br/>
                    digital advertising through an innovative revenue<br/>
                    model that benefits both users and marketers.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-6 md:mt-8">
                    Instead of paying for subscriptions to avoid ads,<br/>
                    users receive intelligent recommendations that<br/>
                    align with their actual needs.
                  </p>
                </div>
                <div className="space-y-6 md:space-y-7 text-sm md:text-base lg:text-lg">
                  <p className="text-gray-700 leading-relaxed">
                    Unlike typical online advertisements, the content<br/>
                    is automatically adapted to each user's preferences,<br/>
                    whether in the form of a video, image, or text.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-6 md:mt-8">
                    It's advertising that feels more like your favorite<br/>
                    content on the internet than an irrelevant noise.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 pb-8 md:pb-12">
              <img
                src={drivingChange}
                alt="Better experiences team"
                className="w-4/5 h-[280px] md:h-[360px] lg:h-[440px] object-cover rounded-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;