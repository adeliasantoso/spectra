import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LazyImage from "../components/LazyImage";
import XRCard from "../components/XRCard";
import expandTheUniverseAndCancelTheUnwanted from "../assets/images/landing-page/expandtheuniverseandcanceltheunwanted.webp";
import unlockLifeAndLookThrough from "../assets/images/landing-page/unlocklifeandlookthrough.webp";

const Features = () => {
  const features = [
    {
      title: "Expand your universe.",
      description:
        "Through seamless integration with all platforms on your devices, Spectra builds tailored recommendations that reflect your deepest inner thoughts.\n\nWhether it's for places or foods, for entertainment or productivity, every suggestion is customized to your needs.",
      image: expandTheUniverseAndCancelTheUnwanted,
      imageAlt: "Expand your universe feature",
      layout: "left",
      bgColor: "bg-black/95",
      textColor: "text-white",
      accentColor: "text-gray-300",
      glowColor: "blue",
    },
    {
      title: "Unlock a life without barriers.",
      description:
        "Powered with our latest AI model, Spectra uses multimodal sensory information to help you break barriers.\n\nFrom geospatial spaces to every day conversations, navigate your world with our intuitive insights.",
      image: unlockLifeAndLookThrough,
      imageAlt: "Unlock life without barriers feature",
      layout: "right",
      bgColor: "bg-gray-900/95",
      textColor: "text-white",
      accentColor: "text-gray-300",
      glowColor: "purple",
    },
    {
      title: "Cancel the unwanted noise.",
      description:
        "Spectra will always show you things that are useful to you, and that includes advertisements and product suggestions.\n\nWhile using Spectra, you will only hear news from the brands you love and see products that you need. No intrusive content, forever.",
      image: expandTheUniverseAndCancelTheUnwanted,
      imageAlt: "Cancel unwanted noise feature",
      layout: "left",
      bgColor: "bg-slate-900/95",
      textColor: "text-white",
      accentColor: "text-gray-300",
      glowColor: "cyan",
    },
    {
      title: "Look through your head.",
      description:
        "Spectra anticipates your needs by finding patterns in your current activities.\n\nAs your reliable assistant, Spectra can create hyper personalized suggestions, only for you. Anything you want, apps, products, or services, are one tap away.",
      image: unlockLifeAndLookThrough,
      imageAlt: "Look through your head feature",
      layout: "right",
      bgColor: "bg-zinc-900/95",
      textColor: "text-white",
      accentColor: "text-gray-300",
      glowColor: "pink",
    },
  ];

  const { scrollY } = useScroll();

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

      <div className="space-y-0 relative z-10">
        {features.map((feature, index) => {
          const yOffset = useTransform(
            scrollY,
            [index * 800, (index + 1) * 800],
            [50, -50]
          );

          return (
            <motion.div
              key={index}
              className={`${feature.bgColor} py-16 lg:py-20 px-6 relative overflow-hidden backdrop-blur-sm`}
              style={{ y: yOffset }}
            >
              {/* XR-style background elements */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent)`,
                    `radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1), transparent)`,
                    `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent)`,
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Floating geometric shapes */}
              <motion.div
                className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-lg"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: `linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))`,
                }}
              />

              <div className="max-w-7xl mx-auto relative z-10">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    feature.layout === "right" ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* XR Image Card */}
                  <motion.div
                    className={`${
                      feature.layout === "right" ? "lg:col-start-2" : ""
                    } overflow-hidden`}
                    initial={{
                      opacity: 0,
                      x: feature.layout === "right" ? 100 : -100,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <XRCard
                      className="group"
                      glowColor={feature.glowColor}
                      hoverScale={1.03}
                    >
                      <div className="relative overflow-hidden rounded-2xl">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <LazyImage
                          src={feature.image}
                          alt={feature.imageAlt}
                          className="relative w-full transition-transform duration-700 group-hover:scale-105"
                          style={{
                            minHeight: "500px",
                            maxHeight: "800px",
                            aspectRatio: "4/3",
                          }}
                        />

                        {/* Holographic overlay */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20"
                          style={{
                            background:
                              "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                          }}
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      </div>
                    </XRCard>
                  </motion.div>

                  {/* Enhanced Text Content */}
                  <motion.div
                    className={`${
                      feature.layout === "right"
                        ? "lg:col-start-1 lg:row-start-1"
                        : ""
                    } space-y-8`}
                    initial={{
                      opacity: 0,
                      x: feature.layout === "right" ? -100 : 100,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                    <motion.div className="space-y-6">
                      <motion.h3
                        className={`text-5xl md:text-6xl lg:text-7xl font-light ${feature.textColor} mb-8 leading-tight`}
                        whileInView={{
                          backgroundImage: [
                            "linear-gradient(90deg, #ffffff, #ffffff)",
                            "linear-gradient(90deg, #60a5fa, #a855f7, #ffffff)",
                            "linear-gradient(90deg, #ffffff, #ffffff)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        style={{
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {feature.title}
                      </motion.h3>
                    </motion.div>

                    <div
                      className={`text-xl md:text-2xl ${feature.textColor} leading-relaxed space-y-6 font-light`}
                    >
                      {feature.description
                        .split("\n\n")
                        .map((paragraph, pIndex) => (
                          <motion.p
                            key={pIndex}
                            className="opacity-90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 0.9, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + pIndex * 0.1,
                              duration: 0.6,
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                    </div>

                    {/* XR-style decorative line */}
                    <motion.div
                      className="relative h-1 w-24 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: 96 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
