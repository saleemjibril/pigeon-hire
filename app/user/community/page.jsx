import CommunityDetails from "@/app/components/communityDetails";
import Image from "next/image";

export default function Community() {
  return (
    <div className="community">
      <div className="community__back">
        <Image src={"/assets/icons/backArrow.svg"} width={24} height={24} alt="" />
        Back
      </div>

      <div className="community__navigation">
        <div>Home</div>
        <Image src={"/assets/icons/navigation.svg"} width={12} height={12} alt="" />
        <div>Latest communities</div>
      </div>

      <CommunityDetails />

      
    </div>
  );
}
