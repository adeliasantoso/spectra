import React, { useState } from 'react';

const FAQ = React.memo(() => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Spectra Vision?",
      answer: "Spectra Vision is lightweight, wearable device designed to support your everyday life. Powered by our advanced AI model, it anticipates your needs by delivering the most relevant solutions directly within your view. Spectra learns from your environment and preferences to provide personalized insights. Its sleek, minimal display enhances your experience while offering hyper-relevant content. Spectra Vision is your intelligent companion, built to move with your rhythm."
    },
    {
      question: "What can I do with my Spectra Vision?",
      answer: "There are many wonderful things you can do with your Spectra Vision. The device uses ambient cues to bring relevant suggestions, allowing you to make informed decisions in real time. It boosts your productivity by providing the most useful resources to help you get things done quickly and efficiently. It provides access to practical tools and resources to help you complete tasks efficiently. When you are ready to unwind, Spectra offers tailored recommendations, including original content that align with your current mood and interests."
    },
    {
      question: "How do I custom recommendations shown to me?",
      answer: "You don't need to manually configure your preferences. Spectra does the work for you. It learns from your offline and online patterns: what you see, where you go, and how you interact. Using contextual awareness and structured memory, Spectra generates dynamic suggestions that reflect your latest preferences. If a particular recommendation doesn't feel useful, simply tap the \"Dislike\" button and similar content will appear less frequently."
    },
    {
      question: "How do I connect my Spectra Vision to my other devices?",
      answer: "Spectra Vision pairs easily with your smartphone and other devices via Bluetooth or Wi-Fi. Once connected, the companion app allows you to sync notifications, adjust preferences, and manage how Spectra interacts with your other devices. Granting Spectra access to commonly used apps helps it deliver more precise, personalized recommendations. The whole setup process is quick and straightforward."
    },
    {
      question: "How does Spectra Vision manage my personal data?",
      answer: "Data privacy is built into every part of Spectra. Information stays on your device whenever possible, and all insights are processed through secure, encrypted channels. You maintain full control through customizable settings for data collection, sharing, and retention."
    },
    {
      question: "How much does it cost to use Spectra Vision's AI model?",
      answer: "The device includes full access to its core features with no recurring fees. Optional add-ons or subscriptions may become available in the future for enhanced experiences, such as extended AI insights or specialized integrations. However, the essential functionality is covered in your purchase."
    },
    {
      question: "How does Spectra display personalized ads?",
      answer: "Spectra's ambient AI builds a gradual understanding of your preferences to deliver suggestions that feel relevant. Product recommendations are tailored to reflect your evolving needs, often before you are aware of them. Designed to blend naturally into your routine, these suggestions appear as subtle cues. They appear when they're most useful, in the content formats you prefer. You can manage or adjust the setting at any time through your privacy controls."
    },
    {
      question: "Why do the product suggestions I see through Spectra Vision sometimes change?",
      answer: "Brands and advertisers typically provide a base version of their content to our team. Spectra Vision's built-in AI automatically personalizes this content to better suit your preferences. It may alter the ad format—from static image to video, or from live action to animation—depending on what resonates most with you. The message, creative elements, and even duration may also shift to reflect your interests. Over time, the AI may update the ad dynamically to align with changes in your lifestyle. If there's a product you like but aren't ready to purchase, you can mark it as a Favorite for future reference."
    },
    {
      question: "Does Spectra Vision share my personal data with advertisers to create personalized ads?",
      answer: "While product suggestions in Spectra Vision may feel highly personalized, your personal data is not shared with advertisers without a specific, explicit purpose. The ad creation process is linear: advertisers provide a base version, and Spectra's AI personalizes it using on-device insights before displaying it to you. All ad personalization occurs within the Spectra ecosystem and is stored locally on your device. For more details, we encourage you to review our privacy policy or contact our support team."
    },
    {
      question: "How can I shop for products or services from Spectra's recommendations?",
      answer: "Spectra Vision offers intuitive interaction with selected products and services. It responds to physical cues, including eye movement, hand gestures, or voice commands. A \"Blitz\" buy button appears when you engage with certain products, allowing you to complete purchases in a single tap. All transactions are securely verified through retina scan, preventing purchases from unauthorized users."
    },
    {
      question: "What does shopping experience through Spectra Vision look like?",
      answer: "Shopping with Spectra Vision is fast and convenient. Through Spectra's recommendations, you can explore product details, compare options, and complete purchases directly from your glasses or other connected devices. The whole experience runs smoothly without interrupting what you're doing."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-gray-200 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-150/30 via-transparent to-gray-300/40"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200/90 to-transparent"></div>
      <div className="relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            <span className="font-bold">Frequently Asked Questions</span>
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <div key={index} className="py-6 md:py-8">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left flex justify-between items-center group"
              >
                <span className="text-lg md:text-xl lg:text-2xl font-medium text-black pr-4 group-hover:text-gray-700 transition-colors duration-200">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openItem === index && (
                <div className="mt-4 animate-fadeIn">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;