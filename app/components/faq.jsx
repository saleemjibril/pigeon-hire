"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    title: "How can Pigeonhire help my business grow?",
    subtitle:
      "Pigeonhire connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships. Whether you're looking to increase brand awareness, drive sales, or build relationships, our platform provides the tools and access necessary to achieve your goals.",
  },
  {
    title: "What makes Pigeonhire different from other community engagement platforms?",
    subtitle:
      "Unlike other platforms, Pigeonhire offers a unique combination of local and global community access, precise targeting capabilities, and flexible pricing options. Our focus on creating meaningful connections and providing detailed analytics sets us apart, ensuring that your engagement efforts are effective and measurable.",
  },
  {
    title: "Can I target specific geographic locations or industries in Pigeonhire?",
    subtitle:
      "Yes, Pigeonhire allows you to target specific geographic locations and industries, enabling you to tailor your engagement strategies to reach the most relevant audiences. Whether you're focusing on a particular city or sector, our platform provides the tools to connect with communities that matter most to your business.",
  },
  {
    title: "How can I list my community on Pigeonhire?",
    subtitle:
      "Listing your community on PigeonHire is simple! Sign up for an account, provide key details about your community, such as its focus, audience, and engagement goals, and submit your listing for approval. Once approved, your community will be discoverable by users looking for connections aligned with their interests or business needs.",
  },
  {
    title: "How quickly can I expect to see results from using Pigeonhire?",
    subtitle:
      "The timeframe for seeing results can vary based on your engagement strategy and goals. However, many users observe increased interaction and visibility within weeks of using our platform. Continuous engagement and strategic use of our targeting and analytics tools can accelerate and enhance your outcomes.",
  },
  {
    title: "Is Pigeonhire suitable for small businesses or startups?",
    subtitle:
      "Absolutely! Pigeonhire is designed to support businesses of all sizes, including small businesses and startups. Our platform offers scalable solutions and flexible pricing options to accommodate varying needs and resources, ensuring businesses can leverage our community engagement tools at any stage.",
  },
  {
    title: "How does Pigeonhire protect my business's data and privacy?",
    subtitle:
      "We take data security and privacy seriously, implementing robust protocols and encryption measures to protect your information. Pigeonhire adheres to strict privacy policies and industry standards to ensure that your business's data is secure and your interactions on the platform are confidential.",
  },
  {
    title: "How does the Subscription Work?",
    subtitle:
      "Our subscription plan provides unlimited access to all platform features, communities, and connections. This option is ideal for businesses and individuals seeking continuous engagement, broad reach, and long-term opportunities to connect with communities and key individuals, ensuring you effectively engage with the most relevant audiences to achieve your goals.",
  },
  {
    title: "Do you offer personalized support?",
    subtitle:
      "Yes, we offer personalized support tailored to your needs. For an additional fee, our dedicated team can help you develop effective engagement strategies, maximize the use of our platform's features, and analyze data to refine your approach and achieve better results. To learn more, email us at hello@pigeonhire.com.",
  },
  {
    title: "Is it free to list my community on Pigeonhire?",
    subtitle:
      "Yes, listing your community on PigeonHire is completely free! Simply sign up, provide the necessary details about your community, and submit your listing for approval. Once approved, your community will be accessible to users seeking relevant connections.",
  },
];


export default function Faq() {
  const [selectedFaq, setSelectedFaq] = useState(null);
  return (
    <div className="landing__faq">
      <div className="landing__faq__title">
        Frequently asked questions (FAQ)
      </div>
      {faqs?.map((faq, index) => (
        <div className="landing__faq__card" key={index}>
          <div
            className="landing__faq__card__title"
            onClick={() => selectedFaq === index ? setSelectedFaq(null) : setSelectedFaq(index)}
          >
            <div>{faq?.title}</div>
            <Image
              alt=""
              width={32}
              height={32}
              src={
                selectedFaq === index
                  ? "/assets/icons/darkMinus.svg"
                  : "/assets/icons/darkPlus.svg"
              }
            />
          </div>

          {selectedFaq === index && <div className="landing__faq__card__subtitle">{faq?.subtitle}</div>}
        </div>
      ))}
    </div>
  );
}
