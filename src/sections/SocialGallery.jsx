import React from "react";
import LazyImage from "../components/LazyImage";
import social1 from "../assets/images/landing-page/social1.webp";
import social2 from "../assets/images/landing-page/social2.webp";
import social3 from "../assets/images/landing-page/social3.webp";

const SocialGallery = () => {
  const socialImages = [
    {
      src: social1,
      alt: "Social media post 1",
    },
    {
      src: social2,
      alt: "Social media post 2",
    },
    {
      src: social3,
      alt: "Social media post 3",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8">
            Follow us on social
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {socialImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden">
              <LazyImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full hover:scale-105 transition-transform duration-300"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="border border-black text-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-colors duration-200">
            Social
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
