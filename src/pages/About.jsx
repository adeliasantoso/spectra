import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import OptimizedImage from "../components/OptimizedImage";
import heroAbout from "../assets/images/about-page/hero-about.png";
import buildingTech from "../assets/images/about-page/building-tech.png";
import designingFor from "../assets/images/about-page/designing-for.png";
import drivingChange from "../assets/images/about-page/diriving-change.png";

const About = () => {
  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Animation observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <CartIcon />

      {/* Hero Section - "Our vision" */}
      <section
        id="hero-vision"
        ref={(el) => (sectionRefs.current["hero-vision"] = el)}
        className="relative w-full h-[80vh] md:h-[90vh] lg:h-[100vh] overflow-hidden -mt-16 pt-16"
      >
        <OptimizedImage
          src={heroAbout}
          alt="Our Vision"
          width={1920}
          height={800}
          lazy={false}
          className={`w-full h-full object-cover object-[center_57%] transition-all duration-1000 ${
            visibleSections.has("hero-vision") ? "scale-100" : "scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
          <div className="text-center px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl text-white font-semibold leading-tight">
              <span className={`elegant-title-word ${visibleSections.has('hero-vision') ? 'animate' : ''}`}>Our</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('hero-vision') ? 'animate' : ''}`}>vision</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Building tech that understands you */}
      <section
        id="building-tech"
        ref={(el) => (sectionRefs.current["building-tech"] = el)}
        className="py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
                <span className={`elegant-title-word ${visibleSections.has('building-tech') ? 'animate' : ''}`}>Building</span>{' '}
                <span className={`elegant-title-word ${visibleSections.has('building-tech') ? 'animate' : ''}`}>tech</span>{' '}
                <span className={`elegant-title-word ${visibleSections.has('building-tech') ? 'animate' : ''}`}>that</span>
                <br />
                <span className={`elegant-title-word ${visibleSections.has('building-tech') ? 'animate' : ''}`}>understands</span>{' '}
                <span className={`elegant-title-word ${visibleSections.has('building-tech') ? 'animate' : ''}`}>you</span>
              </h2>
              <div className="space-y-6 md:space-y-8 text-base md:text-lg">
                <p className={`text-gray-700 leading-relaxed font-medium elegant-paragraph ${visibleSections.has('building-tech') ? 'animate' : ''}`}>
                  Spectra began with one question: what if technology could go
                  beyond serving us and actually understand our needs?
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('building-tech') ? 'animate' : ''}`}>
                  This led to the creation of Spectra. Founded by a small
                  collective of engineers and designers, Spectra was born from a
                  vision of a future where technology improves our lives in
                  meaningful ways. We envisioned devices that blend into your
                  routine, anticipate your needs, and deliver highly
                  personalized solutions.
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('building-tech') ? 'animate' : ''}`}>
                  Spectra introduces a new layer of experience by combining
                  ambient AI with spatial computing. Our products respond
                  intuitively to your environment and preferences, generating
                  content precisely when and how you need it.
                </p>
              </div>
            </div>
            <div className={`transform transition-all duration-1000 ease-out ${
              visibleSections.has('building-tech') ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`} style={{ transitionDelay: '1000ms' }}>
              <div className="relative">
                <img
                  src={buildingTech}
                  alt="Building technology that understands you"
                  className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover object-[65%] rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helping you without disruption */}
      <section
        id="designing-for"
        ref={(el) => (sectionRefs.current["designing-for"] = el)}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className={`order-2 lg:order-1 transform transition-all duration-1000 ease-out ${
              visibleSections.has('designing-for') ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`} style={{ transitionDelay: '900ms' }}>
              <div className="relative">
                <img
                  src={designingFor}
                  alt="Helping you without disruption"
                  className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
                <span className={`elegant-title-word ${visibleSections.has('designing-for') ? 'animate' : ''}`}>Helping</span>{' '}
                <span className={`elegant-title-word ${visibleSections.has('designing-for') ? 'animate' : ''}`}>you</span>{' '}
                <span className={`elegant-title-word ${visibleSections.has('designing-for') ? 'animate' : ''}`}>without</span>
                <br />
                <span className={`elegant-title-word ${visibleSections.has('designing-for') ? 'animate' : ''}`}>disruption</span>
              </h2>
              <div className="space-y-6 md:space-y-8 text-base md:text-lg">
                <p className={`text-gray-700 leading-relaxed font-medium elegant-paragraph ${visibleSections.has('designing-for') ? 'animate' : ''}`}>
                  As a tech company, one of our key breakthroughs has been
                  rethinking digital advertising through an innovative revenue
                  model. Our business model benefits both users and marketers.
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('designing-for') ? 'animate' : ''}`}>
                  Instead of paying for subscriptions to avoid ads, users
                  receive intelligent recommendations that align with their
                  actual needs. Spectra's AI system uses insights to deliver
                  personalized suggestions that truly resonate.
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('designing-for') ? 'animate' : ''}`}>
                  The content is automatically adapted to each user's
                  preferences, whether in the form of a video, image, or
                  text—and actually entertaining. It's advertising that feels
                  more like your beloved content on the internet than an
                  irrelevant noise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designing for safety, accessibility, and sustainability */}
      <section
        id="driving-change"
        ref={(el) => (sectionRefs.current["driving-change"] = el)}
        className="py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-12 md:mb-16 leading-tight">
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>Designing</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>for</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>Safety,</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>Accessibility,</span>
              <br />
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>and</span>{' '}
              <span className={`elegant-title-word ${visibleSections.has('driving-change') ? 'animate' : ''}`}>Sustainability</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto text-left">
              <div className="space-y-6 text-base md:text-lg">
                <p className={`text-gray-700 leading-relaxed font-medium elegant-paragraph ${visibleSections.has('driving-change') ? 'animate' : ''}`}>
                  We prioritize safety, accessibility, and sustainability in
                  everything we create. Our dedicated research and policy
                  team, with their deep expertise in law and social
                  impact, ensures that each product reflects our core values.
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('driving-change') ? 'animate' : ''}`}>
                  Through our work, we strive to improve the wellbeing of both
                  people and the planet.
                </p>
              </div>
              <div className="space-y-6 text-base md:text-lg">
                <p className={`text-gray-700 leading-relaxed elegant-paragraph ${visibleSections.has('driving-change') ? 'animate' : ''}`}>
                  We believe technology should be respectful and beautifully
                  attuned to the individual. At the heart of our vision is a
                  world of innovation that seamlessly integrates into your life.
                </p>
                <p className={`text-gray-600 leading-relaxed elegant-paragraph ${visibleSections.has('driving-change') ? 'animate' : ''}`}>
                  A world shaped with you in mind.
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-12 md:mt-16 transform transition-all duration-1000 ease-out ${
            visibleSections.has('driving-change') ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`} style={{ transitionDelay: '1200ms' }}>
            <div className="relative max-w-5xl mx-auto">
              <img
                src={drivingChange}
                alt="Designing for safety, accessibility, and sustainability"
                className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
