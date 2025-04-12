import Image from "next/image";
import LandingHeader from "./components/landingHeader";
import Footer from "./components/footer";
import Connect from "./components/connect";
import Socials from "./components/socials";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Home",
    description:
      "Project Management, Engineering Construction & Design, Supply of Integrated Services, Supervision, Environmental Consultancy",
  };
}

export default function Home() {
  return (
    <div className="landing">
      <LandingHeader />
      <div className="landing__hero">
        <div className="landing__hero__title">
          Reach your Target Audience, Right Where they Engage.
        </div>
        <div className="landing__hero__button-group">
          <Link href="/register" prefetch={true}>Sign Up</Link>
          <Link href="/user" prefetch={true}>Browse Networks</Link>
        </div>

        <Image
          alt=""
          width={1090}
          height={527}
          src={"/assets/hero.jpg"}
        />
      </div>

     <Socials />

      <div className="landing__steps">
        <div className="landing__steps__title">Get started in 3 steps</div>
        <div className="landing__steps__cards">
          <div className="landing__steps__cards__card">
            <div className="landing__steps__cards__card__image">
              <Image
                alt=""
                width={240}
                height={235}
                src={"/assets/Frame 2087325596.png"}
                style={{marginBottom: "-95px"}}
              />
            </div>
            <div className="landing__steps__cards__card__title">
              Browse & Discover
            </div>
            <div className="landing__steps__cards__card__subtitle">
              Use our platform to explore a wide range of connections, including
              communities, real stores, connectors, service providers, event
              organizers, and more, all aligned with your personal or business
              goals
            </div>
          </div>
          <div className="landing__steps__cards__card">
            <div className="landing__steps__cards__card__image">
              <Image
                alt=""
                width={240}
                height={240}
                src={"/assets/Frame 2087325591.png"}
                style={{marginBottom: "-96px"}}
              />
            </div>
            <div className="landing__steps__cards__card__title">
              Sign up & Subscribe
            </div>
            <div className="landing__steps__cards__card__subtitle">
              With a single subscription, unlock access to diverse communities
              and key individuals like influencers, educational, leaders,
              startup managers, and local business association heads.
            </div>
          </div>
          <div className="landing__steps__cards__card">
            <div className="landing__steps__cards__card__image">
              <Image
                alt=""
                width={240}
                height={250}
                src={"/assets/Frame 2087325591 (1).png"}
                style={{marginBottom: "-100px"}}
              />
            </div>
            <div className="landing__steps__cards__card__title">
              Engage, Network & Collaborate
            </div>
            <div className="landing__steps__cards__card__subtitle">
              Connect with your target audience, brand ambassadors, referral
              partners or marketing collaborators to start meaningful
              collaborations expand your each and achieve your goals.
            </div>
          </div>
        </div>
      </div>

      <div className="landing__users">
        <div className="landing__users__title-group">
          <div>What our users look like</div>
          <div>
            Our platform helps users discover diverse opportunities for
            collaborations and partnerships, connecting them to key contacts and
            enabling impactful engagements outside the platform.
          </div>
        </div>

        <div className="landing__users__image-group">
          <Image
            alt=""
            width={693}
            height={444}
            src={"/assets/user1.jpg"}
          />
          <Image
            alt=""
            width={595}
            height={488}
            src={"/assets/user2.jpg"}
          />
        </div>
      </div>

      <div className="landing__stats">
        <div className="landing__stats__inner">
          <div className="landing__stats__inner__items">
            <div className="landing__stats__inner__items__title">10k+</div>
            <div className="landing__stats__inner__items__subtitle">
              Micro Communities
            </div>
          </div>
          <div className="landing__stats__inner__items">
            <div className="landing__stats__inner__items__title">20+</div>
            <div className="landing__stats__inner__items__subtitle">
              Countries
            </div>
          </div>
          <div className="landing__stats__inner__items">
            <div className="landing__stats__inner__items__title">100+</div>
            <div className="landing__stats__inner__items__subtitle">
              Successful Campaigns
            </div>
          </div>
        </div>
      </div>

      <div className="landing__why">
        <div className="landing__why__title">
          Why Pigeonhire is the right choice
        </div>
       
        <div className="landing__why__cards">
          <div className="landing__why__cards__card">
            <Image
              alt=""
              width={42}
              height={42}
              src={"/assets/icons/globe.svg"}
            />
            <div className="landing__why__cards__card__title">
              Expanded Reach
            </div>
            <div className="landing__why__cards__card__subtitle">
              Gain access to niche local groups and vast global communities.
              Connect with the right people, expand your impact, and grow your
              network effortlessly.
            </div>

            <Image
              alt=""
              width={540}
              height={384}
              src={"/assets/why1.png"}
            />
          </div>
          <div className="landing__why__cards__card">
            <Image
              alt=""
              width={42}
              height={42}
              src={"/assets/icons/target.svg"}

              className="landing__why__cards__card__title-img"
            />
            <div className="landing__why__cards__card__title">
              Smart Targeting & Engagement
            </div>
            <div className="landing__why__cards__card__subtitle">
              Leverage advanced targeting to reach your ideal audience while
              fostering real community engagement. Receive feedback, build
              relationships, and make meaningful connections.
            </div>

            <Image
              alt=""
              width={540}
              height={354}
              src={"/assets/why2.png"}
            />
          </div>
          
        </div>

        <div className="landing__why__cards-mini">
        <div className="landing__why__cards-mini__card">
            <div>
              <Image
                alt=""
                width={42}
                height={42}
                src={"/assets/icons/justice.svg"}
              />
              <div className="landing__why__cards-mini__card__title">
                Flexible & Scalable Solutions
              </div>
              <div className="landing__why__cards-mini__card__subtitle">
                Unlock unlimited opportunities with a single subscription.
                Connect seamlessly with communities and key individuals tailored
                to fit your goals and budget.
              </div>
            </div>

            <Image
              alt=""
              width={380}
              height={283}
              src={"/assets/why3.png"}
            />
          </div>
          <div className="landing__why__cards-mini__card">
            <Image
              alt=""
              width={42}
              height={42}
              src={"/assets/icons/connect.svg"}
            />
            <div className="landing__why__cards-mini__card__title">
              Broad Connections & Smart Search
            </div>
            <div className="landing__why__cards-mini__card__subtitle">
              Connect with a diverse user base across industries while
              leveraging advanced search tools to find the perfect match
              efficiently.
            </div>

            <Image
              alt=""
              width={363}
              height={196.65}
              src={"/assets/why4.png"}
            />
          </div>
          </div>
      </div>

     <Connect />

      <div className="landing__testimonials">
        <div className="landing__testimonials__title">User’s Stories</div>
        <div className="landing__testimonials__inner">
        <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/arrowLeft.svg"}
          />
          <div className="landing__testimonials__inner__cards">
            <div className="landing__testimonials__inner__cards__card">
              <div className="landing__testimonials__inner__cards__card__title">
                <div>Gwala</div>

                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={"/assets/icons/quote.svg"}
                />
              </div>

              <div className="landing__testimonials__inner__cards__card__subtitle">
                Our partnership with Pigeonhire during our campus ambassador
                program was a game-changer. The access to a range of communities
                and connectors resulted in unprecedented engagement and sales.
              </div>
            </div>
            <div className="landing__testimonials__inner__cards__card">
              <div className="landing__testimonials__inner__cards__card__title">
                <div>Alex Klaxic</div>

                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={"/assets/icons/quote.svg"}
                />
              </div>

              <div className="landing__testimonials__inner__cards__card__subtitle">
                As a community leader, the visibility model has been
                transformative. We've partnered with businesses that truly
                resonate with our audience, enhancing both our community's value
                and our collaboration
              </div>
            </div>
            <div className="landing__testimonials__inner__cards__card">
              <div className="landing__testimonials__inner__cards__card__title">
                <div>Gwala</div>

                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={"/assets/icons/quote.svg"}
                />
              </div>

              <div className="landing__testimonials__inner__cards__card__subtitle">
                Our partnership with Pigeonhire during our campus ambassador
                program was a game-changer. The access to a range of communities
                and connectors resulted in unprecedented engagement and sales.
              </div>
            </div>
            <div className="landing__testimonials__inner__cards__card">
              <div className="landing__testimonials__inner__cards__card__title">
                <div>Alex Klaxic</div>

                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={"/assets/icons/quote.svg"}
                />
              </div>

              <div className="landing__testimonials__inner__cards__card__subtitle">
                As a community leader, the visibility model has been
                transformative. We've partnered with businesses that truly
                resonate with our audience, enhancing both our community's value
                and our collaboration
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing__faq">
        <div className="landing__faq__title">
          Frequently asked questions (FAQ)
        </div>
        <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>How can Pigeonhire help my business grow?</div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>What makes Pigeonhire different from other community engagement platforms?</div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>Can I target specific geographic locations or industries in Pigeonhire?
            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>How can I list my community on Pigeonhire?
            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>Is Pigeonhire suitable for small businesses or startups?

            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>How does Pigeonhire protect my business's data and privacy?
            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>How does the Subscription Work?
            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>How can Pigeonhire help my business grow?
            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
   <div className="landing__faq__card">
          <div className="landing__faq__card__title">
            <div>Is it free to list my community on Pigeonhire?

            </div>
          <Image
            alt=""
            width={32}
            height={32}
            src={"/assets/icons/darkPlus.svg"}
          />
          </div>

          <div className="landing__faq__card__subtitle">

          </div>

        </div>     
      </div>

      <Footer />
    </div>
  );
}
