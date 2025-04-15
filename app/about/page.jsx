import Image from "next/image";
import Connect from "../components/connect";
import LandingHeader from "../components/landingHeader";
import Reach from "../components/reach";
import Footer from "../components/footer";

export default function About() {
  return (
    <div className="about">
      <LandingHeader logo={"black"} />

      <div className="about__title">About Us</div>
      <div className="about__subtitle">
        Connecting innovators with engaged communities for lasting impact.
      </div>

      <div className="about__hero">
        <div className="about__hero__cards">
          <Image alt="" width={353} height={260} src={"/assets/about1.png"} />
          <Image alt="" width={353} height={260} src={"/assets/about2.png"} />
          <Image alt="" width={353} height={260} src={"/assets/about3.png"} />
        </div>

        <div className="about__hero__title">
          Bridging Connections, Driving Growth
        </div>
        <div className="about__hero__subtitle">
          <div>
            In today’s digital world, many brands, marketers, and startups have
            great ideas but struggle to reach their audience. Pigeonhire bridges
            this gap by connecting them with engaged communities, to foster
            authentic connections for lasting growth.
          </div>
          <div>
            At Pigeonhire, we understand the power of connection and the need to
            engage audiences where they are most active. Our platform fosters
            authentic interactions, aligning businesses and personal brands with
            vibrant communities.
          </div>
        </div>
      </div>

      <div className="about__story">
        <div className="about__story__title">Our Story</div>
        <div className="about__story__subtitle">
          When I started Pigeonhire, my vision was to create a world where
          businesses and communities interact but are genuinely connected, where
          the power of human engagement drives innovation and growth. Our
          platform is built on the belief that in the heart of every community
          lies untapped potential and, in every business, a desire to make a
          real difference. I invite you to join us on this exciting journey.
          <br />
          <br />
          Together, let's build connections and a web of relationships that
          inspire change, drive progress, and celebrate the power of unity
        </div>
        <div className="about__story__user">
          <div>Temi R</div>
          <div>Co-Founder, Pigeonhire</div>
        </div>
      </div>

      <div className="about__we">
       <div className="about__we__inner">
       <Image alt="" width={733} height={512} src={"/assets/aboutwe.png"} />

<div>
  We aim to revolutionize how businesses and communities interact,
  fostering an ecosystem where genuine relationships lead to shared
  success. We are committed to offering a platform where every
  interaction is an opportunity for growth, learning, and meaningful
  exchange.
</div>
       </div>
      </div>

      <div className="about__value">

        <div className="about__value__inner">

      <div className="about__value__inner__title">
      The value we bring
        </div>
      <div className="about__value__inner__cards">
      <div className="about__value__inner__cards__card">
         <Image
                  alt=""
                  width={82}
                  height={82}
                  src={"/assets/icons/community.svg"}
                />

                <div className="about__value__inner__cards__card__title">
                Community-Centric
                </div>
                <div className="about__value__inner__cards__card__subtitle">
                We are passionate about building a platform where communities can thrive, and businesses can find their tribe.
                </div>
      </div>
      <div className="about__value__inner__cards__card">
         <Image
                  alt=""
                  width={82}
                  height={82}
                  src={"/assets/icons/growth.svg"}
                />

                <div className="about__value__inner__cards__card__title">
                Growth
                </div>
                <div className="about__value__inner__cards__card__subtitle">
                We are dedicated to developing our users, communities, and platform, ensuring that every connection made on Pigeonhire is a step toward collective success.
                </div>
      </div>
      <div className="about__value__inner__cards__card">
         <Image
                  alt=""
                  width={82}
                  height={82}
                  src={"/assets/icons/authenticity.svg"}
                />

                <div className="about__value__inner__cards__card__title">
                Authenticity
                </div>
                <div className="about__value__inner__cards__card__subtitle">
                We champion genuine interactions, believing authenticity is the cornerstone of meaningful engagement.
                </div>
      </div>
        </div>
        </div>

      </div>

      <Connect />

      <Reach />

      <Footer />
    </div>
  );
}
