import Image from "next/image";
import LandingHeader from "./components/landingHeader";
import Footer from "./components/footer";
import Connect from "./components/connect";
import Socials from "./components/socials";
import Link from "next/link";
import Testimonials from "./components/testimonials";
import Faq from "./components/faq";

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
        <Image
          alt=""
          width={52}
          height={52}
          src={"/assets/icons/bubbles.svg"}
        />
<div>          Reach your Target Audience, Right Where they Engage.
</div>
          <Image
          alt=""
          width={52}
          height={52}
          src={"/assets/icons/star.svg"}
        />
        </div>
        <div className="landing__hero__button-group">
          <Link href="/register" prefetch={true}>Sign Up</Link>
          <Link href="/user" prefetch={true}>Browse Networks</Link>
        </div>

        <Image
          alt=""
          width={1090}
          height={527}
          src={"/assets/hero.png"}
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
                src={"/assets/step1.png"}
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
                src={"/assets/step2.png"}
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
                src={"/assets/step3.png"}
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
            src={"/assets/user1.png"}
          />
          <Image
            alt=""
            width={595}
            height={488}
            src={"/assets/user2.png"}
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

      <Testimonials />

      <Faq />

      <Footer />
    </div>
  );
}
