import Image from "next/image";
import LandingHeader from "../components/landingHeader";
import Footer from "../components/footer";
import PricingInner from "../components/pricingInner";

export default function Pricing() {
  return (
    <div className="pricing">
      <LandingHeader />

     <div className="pricing__inner">
     <div className="pricing__inner__title">
        We’ve got a plan a perfect plan for you
      </div>
      <PricingInner />
     </div>

     <Footer />
    </div>
  );
}
