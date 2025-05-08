import CommunityDetails from "@/app/components/communityDetails";
import NavigationDirectory from "@/app/components/navigationDirectory";
import Image from "next/image";
import Link from "next/link";

export default function Community() {
  return (
    <div className="community">
      <Link className="community__back" href="/user" prefetch={true}>
        <Image src={"/assets/icons/backArrow.svg"} width={24} height={24} alt="" />
        Back
      </Link>

  <NavigationDirectory
        links={
            [
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Latest communities",
                }
            ]
        }
        />

      <CommunityDetails />


      
    </div>
  );
}
