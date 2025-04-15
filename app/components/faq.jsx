"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    title: "How can Pigeonhire help my business grow?",
    subtitle: "Pigeonhire connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships. Whether you're looking to increase brand awareness, drive sales, or build relationships, our platform provides the tools and access necessary to achieve your goals.",
  },
  {
    title:
      "What makes Pigeonhire different from other community engagement platforms?",
    subtitle:
      "",
  },
  {
    title:
      "Can I target specific geographic locations or industries in Pigeonhire?",
    subtitle: "",
  },
  {
    title: "How can I list my community on Pigeonhire?",
    subtitle: "",
  },
  {
    title: "Is Pigeonhire suitable for small businesses or startups?",
    subtitle: "",
  },
  {
    title: "How does Pigeonhire protect my business's data and privacy?",
    subtitle: "",
  },
  {
    title: "How does the Subscription Work?",
    subtitle: "",
  },
  {
    title: "How can Pigeonhire help my business grow?",
    subtitle: "",
  },
  {
    title: "Is it free to list my community on Pigeonhire?",
    subtitle: "",
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
        <div className="landing__faq__card">
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
